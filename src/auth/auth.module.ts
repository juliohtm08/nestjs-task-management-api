import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true, // Define o módulo JWT como global, tornando-o acessível em toda a aplicação
      imports: [], // Lista de módulos adicionais a serem importados (atualmente vazio)
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Obtém a chave secreta do JWT das variáveis de ambiente
        signOptions: {
          expiresIn: +(
            (configService.get<number>('JWT_EXPIRATION_TIME') ?? 3600) // Define o tempo de expiração do token JWT, com fallback de 3600s
          ),
        },
      }),
      inject: [ConfigService], // Injeta o ConfigService para acessar as variáveis de ambiente
    }),
    UsersModule, // Importa o módulo de usuários para lidar com autenticação e usuários
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
