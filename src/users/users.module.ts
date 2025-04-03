import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
@Module({
  controllers: [UsersController], // Define o controlador responsável por gerenciar as requisições relacionadas aos usuários
  exports: [UsersService], // Exporta o serviço de usuários para que outros módulos possam utilizá-lo
  providers: [UsersService], // Declara o serviço de usuários como um provider disponível dentro do módulo
})
export class UsersModule {}
