import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Define a entidade 'task' que será usada para mapear a tabela 'task' no banco de dados
@Entity({ name: 'task' })
export class TaskEntity {
  // Define a coluna 'id' como chave primária, gerada automaticamente no formato UUID
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  // Define a coluna 'title' do tipo varchar
  @Column({ type: 'varchar' })
  title: string;

  // Define a coluna 'description' do tipo varchar
  @Column({ type: 'varchar' })
  description: string;

  // Define a coluna 'status' do tipo varchar
  @Column({ type: 'varchar' })
  status: string;

  // Define a coluna 'expiration_date' do tipo timestamptz (timestamp com fuso horário)
  // O nome da coluna no banco será 'expiration_date', diferente do nome da propriedade
  @Column({ type: 'timestamptz', name: 'expiration_date' })
  expirationDate: string;
}
