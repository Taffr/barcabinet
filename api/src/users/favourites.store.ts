import { Injectable } from '@nestjs/common';
import { pluck } from 'ramda';
import { Favourite } from '@prisma/client';
import { Maybe } from '../util/Maybe';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavouritesStore {
  constructor(readonly prisma: PrismaService) {}

  async getFavouritesForUser(ownerId: number): Promise<number[]> {
    const favourites = await this.prisma.favourite.findMany({
      select: {
        recipeId: true,
      },
      where: {
        userId: ownerId,
      },
    });
    return pluck('recipeId', favourites);
  }

  async addToUserFavourites(
    userId: number,
    recipeId: number,
  ): Promise<Maybe<Favourite>> {
    try {
      const ret = await this.prisma.favourite.create({
        data: {
          recipeId,
          userId,
        },
      });
      return Maybe.of(ret);
    } catch {
      return Maybe.nothing();
    }
  }

  async removeFromUserFavourites(
    userId: number,
    recipeId: number,
  ): Promise<Maybe<Favourite>> {
    const ret = await this.prisma.favourite.delete({
      where: {
        userId_recipeId: {
          recipeId,
          userId,
        },
      },
    });
    return Maybe.of(ret);
  }
}
