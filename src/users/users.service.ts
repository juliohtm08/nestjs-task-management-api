import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(NewUser: UserDto) {
    const userAlreadyRegister = await this.findByUserName(NewUser.username);

    if (userAlreadyRegister) {
      throw new ConflictException(`User ${NewUser.username} already register.`);
    }

    const dbUser = new UserEntity();
    dbUser.username = NewUser.username;
    dbUser.passwordHash = bcryptHashSync(NewUser.password, 10);

    const { id, username } = await this.userRepository.save(dbUser);

    return { id, username };
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: { username },
    });

    if (!userFound) return null;

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.passwordHash,
    };
  }
}
