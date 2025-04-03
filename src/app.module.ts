import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';

@Module({
  // Importa módulos que serão utilizados dentro do AppModule
  imports: [TaskModule, UsersModule],

  // Define os controladores que lidam com as requisições HTTP
  controllers: [AppController],

  // Define os serviços que podem ser injetados e utilizados pelos controladores e outros serviços
  providers: [AppService],
})
export class AppModule {}
