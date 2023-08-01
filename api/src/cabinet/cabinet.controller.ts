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
import { CabinetStore } from './cabinetstore.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateCabinetDTO } from './dtos/update-cabinet.dto';

@Controller('cabinet')
export class CabinetController {
  constructor(private readonly cabinetStore: CabinetStore) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCabinetForOwner(@Request() req): Promise<Cabinet> {
    const { id } = req.user;
    const maybeCabinet = await this.cabinetStore.getForOwner(id);
    return maybeCabinet.match(identity, () => {
      throw new NotFoundException();
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateCabinet(
    @Request() req,
    @Body() updateCabinetDTO: UpdateCabinetDTO,
  ): Promise<Cabinet> {
    console.log(updateCabinetDTO);
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
