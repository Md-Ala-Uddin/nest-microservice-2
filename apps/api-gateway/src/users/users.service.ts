import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_CLIENT') private readonly usersClient: ClientProxy,
  ) {}

  create(createUserDto: CreateUserDto) {
    try {
      return this.usersClient.send('users.create', createUserDto);
    } catch (err: unknown) {
      if (
        err instanceof RpcException ||
        (err as { message?: string })?.message
      ) {
        throw new Error(
          `User service error: ${(err as { message?: string }).message}`,
        );
      }
      throw new Error('Unknown gateway error.');
    }
  }

  findAll() {
    try {
      return this.usersClient.send('users.findAll', {});
    } catch (err: unknown) {
      if (
        err instanceof RpcException ||
        (err as { message?: string })?.message
      ) {
        throw new Error(
          `User service error: ${(err as { message?: string }).message}`,
        );
      }
      throw new Error('Unknown gateway error.');
    }
  }

  findOne(id: number) {
    try {
      return this.usersClient.send('users.findOne', id);
    } catch (err: unknown) {
      if (
        err instanceof RpcException ||
        (err as { message?: string })?.message
      ) {
        throw new Error(
          `User service error: ${(err as { message?: string }).message}`,
        );
      }
      throw new Error('Unknown gateway error.');
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.usersClient.send('users.update', { id, ...updateUserDto });
    } catch (err: unknown) {
      if (
        err instanceof RpcException ||
        (err as { message?: string })?.message
      ) {
        throw new Error(
          `User service error: ${(err as { message?: string }).message}`,
        );
      }
      throw new Error('Unknown gateway error.');
    }
  }

  remove(id: number) {
    try {
      return this.usersClient.send('users.remove', id);
    } catch (err: unknown) {
      if (
        err instanceof RpcException ||
        (err as { message?: string })?.message
      ) {
        throw new Error(
          `User service error: ${(err as { message?: string }).message}`,
        );
      }
      throw new Error('Unknown gateway error.');
    }
  }
}
