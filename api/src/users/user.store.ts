import { Injectable } from '@nestjs/common';
import { User, Recipe, Ingredient, Prisma } from '@prisma/client';
import { pluck, prop } from 'ramda';
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

  async getFavouritesForUser(ownerId: number): Promise<Recipe[]> {
    const userFavourites = await this.prisma.user.findUnique({
      select: {
        favourites: true,
      },
      where: {
        id: ownerId,
      },
    });
    return userFavourites.favourites;
  }

  async addToUserFavourites(
    userId: number,
    recipeId: number,
  ): Promise<Maybe<number[]>> {
    try {
      const ret = await this.prisma.user.update({
        data: {
          favourites: {
            connect: {
              id: recipeId,
            },
          },
        },
        where: {
          id: userId,
        },
      });
      return Maybe.of(ret);
    } catch (e) {
      return Maybe.nothing();
    }
  }

  async removeFromUserFavourites(
    userId: number,
    recipeId: number,
  ): Promise<Maybe<number[]>> {
    try {
      const ret = await this.prisma.user.update({
        data: {
          favourites: {
            disconnect: {
              id: recipeId,
            },
          },
        },
        where: {
          id: userId,
        },
        select: {
          cabinet: {
            select: {
              id: true,
            },
          },
        },
      });
      return Maybe.of(ret);
    } catch {
      return Maybe.nothing();
    }
  }

  async getCabinetForUser(userId: number): Promise<Ingredient[]> {
    const cabinet = await this.prisma.user.findUnique({
      select: {
        cabinet: true,
      },
      where: {
        id: userId,
      },
    });
    return prop('cabinet', cabinet);
  }

  async addToUserCabinet(
    userId: number,
    ingredientId: number,
  ): Promise<Maybe<number[]>> {
    try {
      const ret = await this.prisma.user.update({
        data: {
          cabinet: {
            connect: {
              id: ingredientId,
            },
          },
        },
        where: { id: userId },
        select: {
          cabinet: {
            select: {
              id: true,
            },
          },
        },
      });
      const cabinet = prop('cabinet', ret);
      const ingredientIds: number[] = pluck('id', cabinet);
      return Maybe.of(ingredientIds);
    } catch {
      return Maybe.nothing();
    }
  }

  async removeFromUserCabinet(
    userId: number,
    ingredientId: number,
  ): Promise<Maybe<number[]>> {
    try {
      const ret = await this.prisma.user.update({
        data: {
          cabinet: {
            disconnect: {
              id: ingredientId,
            },
          },
        },
        where: { id: userId },
      });
      return Maybe.of(ret);
    } catch {
      return Maybe.nothing();
    }
  }
}
