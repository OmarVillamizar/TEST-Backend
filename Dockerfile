# syntax=docker/dockerfile:1

##############################
# Base: Node 22 + pnpm       #
##############################
# slim (Debian/glibc) en vez de alpine/musl: más seguro para el driver oracledb.
FROM node:22-slim AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
# corepack trae pnpm sin instalarlo global manualmente.
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
WORKDIR /app

##############################
# Deps de producción         #
##############################
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
# Solo dependencies (sin devDependencies) -> node_modules ligero para runtime.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile

##############################
# Build (compila TS -> JS)   #
##############################
FROM base AS build
COPY package.json pnpm-lock.yaml ./
# Deps completas (incluye Nest CLI + TypeScript) para poder compilar.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src
RUN pnpm run build

##############################
# Runner (imagen final)      #
##############################
FROM node:22-slim AS runner
ENV NODE_ENV=production
WORKDIR /app

# Usuario no-root (node ya existe en la imagen oficial).
COPY --chown=node:node package.json ./
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist

USER node
EXPOSE 4000
# start:prod = node dist/main
CMD ["node", "dist/main"]
