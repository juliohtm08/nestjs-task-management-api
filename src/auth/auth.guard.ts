import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string; // Armazena a chave secreta usada para verificar o token

  constructor(
    private readonly jwtService: JwtService, // Serviço JWT para verificar tokens
    private readonly configService: ConfigService, // Serviço para acessar variáveis do .env
  ) {
    // Pega o valor da variável de ambiente JWT_SECRET
    // O uso de `!` assume que o valor nunca será undefined
    this.jwtSecret = this.configService.get<string>('JWT_SECRET')!;
  }

  // Método obrigatório para qualquer "guard" - decide se a requisição pode continuar
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // Pega a requisição atual
    const token = this.extractTokenFromHeader(request); // Extrai o token do header Authorization

    if (!token) throw new UnauthorizedException(); // Se não houver token, bloqueia o acesso

    try {
      // Verifica se o token é válido usando a chave secreta
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });

      request['user'] = payload; // Adiciona os dados do usuário à requisição
    } catch {
      throw new UnauthorizedException(); // Se o token for inválido ou expirado
    }

    return true; // Libera o acesso
  }

  // Método auxiliar para extrair o token do cabeçalho Authorization
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    // Retorna o token somente se o tipo for 'Bearer'
    return type === 'Bearer' ? token : undefined;
  }
}
