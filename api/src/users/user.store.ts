import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getSafeFirst } from '../util/funcs';
import { Maybe } from '../util/Maybe';

@Injectable()
export class UserStore {
  constructor(readonly prisma: PrismaService) {}

  async add(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async findByName(nameToFind: string): Promise<Maybe<User>> {
    const users = await this.prisma.user.findMany({
      where: { name: nameToFind },
    });
    return getSafeFirst(users);
  }
}
