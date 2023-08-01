import { Module } from '@nestjs/common';
import { CabinetController } from './cabinet.controller';
import { CabinetStore } from './cabinetstore.service';

@Module({
  controllers: [CabinetController],
  providers: [CabinetStore],
  exports: [CabinetStore],
})
export class CabinetModule {}
