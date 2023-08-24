import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Recipe, User } from '@prisma/client';
import { prop } from 'ramda';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateFavouritesDTO } from './dtos/update-favourites.dto';
import { UserStore } from '../users/user.store';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly userStore: UserStore) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getFavouritesForUser(@Request() req: { user: User }): Promise<Recipe[]> {
    const { id } = req.user;
    return this.userStore.getFavouritesForUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateFavourites(
    @Request() req: { user: User },
    @Body() updateFavouritesDTO: UpdateFavouritesDTO,
  ): Promise<number[]> {
    const { user } = req;
    const { id, action } = updateFavouritesDTO;

    return (
      action === 'add'
        ? await this.userStore.addToUserFavourites(user.id, id)
        : await this.userStore.removeFromUserFavourites(user.id, id)
    ).match(prop('favourites'), () => {
      throw new NotFoundException();
    });
  }
}
