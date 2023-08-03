import {
  Controller,
  Get,
  Put,
  Body,
  Request,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { always, identity } from 'ramda';
import { Cabinet } from './documents/cabinet.document';
import { ResolvedCabinet } from './interfaces/ResolvedCabinet.interface';
import { CabinetStore } from './cabinetstore.service';
import { RecipeStore } from '../recipes/recipestore.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateCabinetDTO } from './dtos/update-cabinet.dto';
import { resolveCabinet } from './resolve-cabinet';

@Controller('cabinet')
export class CabinetController {
  constructor(
    private readonly cabinetStore: CabinetStore,
    private readonly recipeStore: RecipeStore,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCabinetForOwner(@Request() req): Promise<ResolvedCabinet> {
    const { id } = req.user;
    const maybeCabinet = await this.cabinetStore.getForOwner(id);
    return (
      await maybeCabinet.mapAsync(async (cabinet) => {
        const favRecipes = await this.recipeStore.getByIds(cabinet.favourites);
        const recipesContainingIngredients =
          await this.recipeStore.getContainingIngredientIds(
            cabinet.ingredients,
          );
        return resolveCabinet(
          cabinet,
          favRecipes,
          recipesContainingIngredients,
        );
      })
    ).match(identity, () => {
      throw new NotFoundException();
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateCabinet(
    @Request() req,
    @Body() updateCabinetDTO: UpdateCabinetDTO,
  ): Promise<Cabinet> {
    const { id } = req.user;
    const maybeCabinet = await this.cabinetStore.updateForOwner(
      id,
      updateCabinetDTO,
    );
    return maybeCabinet.matchAsync(always(id), () => {
      throw new NotFoundException();
    });
  }
}
