import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // Injeta o serviço de autenticação para lidar com a lógica de login

  @HttpCode(HttpStatus.OK) // Define o status de resposta como 200 OK
  @Post('login')
  signIn(
    @Body('username') username: string, // Obtém o nome de usuário do corpo da requisição
    @Body('password') password: string, // Obtém a senha do corpo da requisição
  ): AuthResponseDto {
    return this.authService.signIn(username, password); // Chama o serviço de autenticação para validar as credenciais
  }
}
