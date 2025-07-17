import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicUserDto } from './dto/user.dto';
import { PrismaService } from '@app/prisma';
import { User } from '@prisma/client';
import { handlePrismaError } from '@app/errors/prisma-error.util';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    try {
      const { email, name } = createUserDto;
      return await this.prisma.user.create({
        data: {
          email,
          name,
        },
      });
    } catch (err: unknown) {
      handlePrismaError(err);
    }
  }

  async findAll(): Promise<PublicUserDto[]> {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
    } catch (err) {
      handlePrismaError(err);
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (err) {
      handlePrismaError(err);
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          email: updateUserDto.email,
          name: updateUserDto.name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (err) {
      handlePrismaError(err);
    }
  }

  async remove(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.delete({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (err) {
      handlePrismaError(err);
    }
  }
}
