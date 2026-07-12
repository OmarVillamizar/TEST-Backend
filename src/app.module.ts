import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, 
  TypeOrmModule.forRoot({
  type: 'oracle',
  host: 'localhost',
  port: 1521,
  username: 'testapp',
  password: 'testapp_local',
  serviceName: 'FREEPDB1',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
})
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
