import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(NewUser: UserDto) {
    NewUser.id = uuid();
    NewUser.password = bcryptHashSync(NewUser.password, 10); // Hasheia a senha antes de armazená-la

    this.users.push(NewUser);
  }

  findByUserName(username: string): UserDto | null {
    return this.users.find((user) => user.username === username) || null;
  }
}
