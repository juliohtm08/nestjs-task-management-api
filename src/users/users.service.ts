import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(NewUser: UserDto) {
    NewUser.id = uuid();
    NewUser.password = bcryptHashSync(NewUser.password, 10);
    this.users.push(NewUser);
    console.log(this.users);
  }
}
