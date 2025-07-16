import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    {
      id: 1,
      email: 'user1@gmail.com',
      password: 'user1pass',
      name: 'user1',
    },
    {
      id: 2,
      email: 'user2@gmail.com',
      password: 'user2pass',
      name: 'user2',
    },
  ];

  create(createUserDto: CreateUserDto): UserDto {
    const newUser: UserDto = {
      ...createUserDto,
      id: this.users.length + 1,
    };

    this.users.push(newUser);

    return newUser;
  }

  findAll(): UserDto[] {
    return this.users;
  }

  findOne(id: number): UserDto | undefined {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): UserDto | undefined {
    const oldUser = this.findOne(id);
    if (!oldUser) {
      return undefined;
    }

    const updatedUser: UserDto = {
      ...oldUser,
      ...updateUserDto,
    };

    this.users.splice(
      this.users.findIndex((oldUser) => oldUser.id === id),
      1,
      updatedUser,
    );

    return updatedUser;
  }

  remove(id: number): UserDto | undefined {
    const user = this.findOne(id);
    if (!user) return undefined;
    return this.users.splice(
      this.users.findIndex((user) => user.id === id),
      1,
    )[0];
  }
}
