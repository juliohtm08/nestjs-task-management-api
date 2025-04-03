import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number; // Armazena o tempo de expiração do token JWT

  constructor(
    private readonly userService: UsersService, // Serviço para buscar usuários
    private readonly jwtService: JwtService, // Serviço para gerar tokens JWT
    private readonly configService: ConfigService, // Serviço para acessar variáveis de ambiente
  ) {
    this.jwtExpirationTimeInSeconds = +(
      this.configService.get<number>('JWT_EXPIRATION_TIME') ?? 3600
    ); // Define o tempo de expiração do JWT, com fallback de 3600 segundos
  }

  signIn(username: string, password: string): AuthResponseDto {
    const foundUser = this.userService.findByUserName(username); // Busca o usuário pelo nome

    if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
      throw new UnauthorizedException(); // Lança uma exceção se o usuário não existir ou a senha estiver incorreta
    }

    const payload = { sub: foundUser.id, username: foundUser.username }; // Define os dados do token

    const token = this.jwtService.sign(payload); // Gera o token JWT

    return { token, expiresIn: this.jwtExpirationTimeInSeconds }; // Retorna o token e o tempo de expiração
  }
}
