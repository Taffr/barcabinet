import { Injectable } from '@nestjs/common';
import { pluck } from 'ramda';
import { SavedIngredient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Maybe } from '../util/Maybe';

@Injectable()
export class CabinetStore {
  constructor(private readonly prisma: PrismaService) {}

  async getCabinetForUser(userId: number): Promise<number[]> {
    const cabinet = await this.prisma.savedIngredient.findMany({
      select: {
        ingredientId: true,
      },
      where: {
        userId,
      },
    });
    return pluck('ingredientId', cabinet);
  }

  async addToUserCabinet(
    userId: number,
    ingredientId: number,
  ): Promise<Maybe<SavedIngredient>> {
    try {
      return Maybe.of(
        await this.prisma.savedIngredient.create({
          data: { userId, ingredientId },
        }),
      );
    } catch {
      return Maybe.nothing();
    }
  }

  async removeFromUserCabinet(
    userId: number,
    ingredientId: number,
  ): Promise<Maybe<SavedIngredient>> {
    try {
      return Maybe.of(
        await this.prisma.savedIngredient.delete({
          where: { userId_ingredientId: { userId, ingredientId } },
        }),
      );
    } catch {
      return Maybe.nothing();
    }
  }
}
