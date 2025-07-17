import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [UsersModule, PrismaModule],
})
export class UsersAppModule {}
