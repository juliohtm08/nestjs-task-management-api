import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // Configuração assíncrona do TypeORM usando valores do ConfigService
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres', // Define o tipo do banco como PostgreSQL
        host: configService.get<string>('DB_HOST'), // Host do banco de dados
        port: +configService.get<number>('DB_PORT')!, // Porta do banco (força a conversão para número)
        username: configService.get<string>('DB_USERNAME'), // Usuário do banco
        password: configService.get<string>('DB_PASSWORD'), // Senha do banco
        database: configService.get<string>('DB_NAME'), // Nome do banco de dados
        entities: [__dirname + '/entities/**'], // Caminho para as entidades
        migrations: [__dirname + '/migrations/*.ts'], // Caminho para os arquivos de migração
        synchronize: false, // Desativa sincronização automática (ideal para produção)
      }),
      inject: [ConfigService], // Injeta o ConfigService para uso na factory
    }),
  ],
})
export class DbModule {} // Exporta o módulo de banco de dados
