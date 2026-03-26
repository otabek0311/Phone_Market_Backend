import { Module } from '@nestjs/common';
import { AdressService } from './adress.service';
import { AddressController } from './adress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';
import { AdressGuard } from './common/guards/adress.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Adress])],
  controllers: [AddressController],
  providers: [AdressService, AdressGuard],
})
export class AdressModule {}
