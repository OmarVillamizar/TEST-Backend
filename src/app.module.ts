import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, 
  TypeOrmModule.forRoot({
  type: 'oracle',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '1521', 10),
  username: process.env.DB_USER ?? 'testapp',
  password: process.env.DB_PASSWORD ?? 'testapp_local',
  serviceName: process.env.DB_SERVICE_NAME ?? 'FREEPDB1',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
})
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
