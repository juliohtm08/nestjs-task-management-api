import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Habilita o uso de variáveis de ambiente em toda a aplicação
    TaskModule, // Módulo responsável pelo gerenciamento de tarefas
    UsersModule, // Módulo responsável pelo gerenciamento de usuários
    AuthModule, // Módulo responsável pela autenticação
    DbModule,
  ],

  // Define os controladores que lidam com as requisições HTTP
  controllers: [AppController],

  // Define os serviços que podem ser injetados e utilizados pelos controladores e outros serviços
  providers: [AppService],
})
export class AppModule {}
