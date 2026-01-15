import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { AdressService } from './adress.service';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { CurrentUser } from './common/decorators/adress.decorator';
import { AdressGuard } from './common/guards/adress.guard';

@ApiTags('Address')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly adressService: AdressService) {}

  @ApiOperation({ summary: 'Create address' })
  @ApiResponse({ status: 201 })
  @Post()
  create(@CurrentUser() user, @Body() createAdressDto: CreateAdressDto) {
    return this.adressService.create(user.id, createAdressDto);
  }

  @ApiOperation({ summary: 'Get my addresses' })
  @Get('me')
  findMy(@CurrentUser() user) {
    return this.adressService.findMy(user.id);
  }

  @ApiOperation({ summary: 'Update address' })
  @UseGuards(AdressGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAdressDto) {
    return this.adressService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete address' })
  @UseGuards(AdressGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adressService.remove(id);
  }
}
