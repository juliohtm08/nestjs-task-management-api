import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Define a entidade 'user' que será usada para mapear a tabela 'user' no banco de dados
@Entity({ name: 'user' })
export class UserEntity {
  // Define a coluna 'id' como chave primária, gerada automaticamente no formato UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Define a coluna 'username' do tipo varchar
  @Column({ type: 'varchar' })
  username: string;

  // Define a coluna 'password_hash' do tipo varchar
  // O nome da coluna no banco será 'password_hash', diferente do nome da propriedade
  @Column({ type: 'varchar', name: 'password_hash' })
  passwordHash: string;
}
