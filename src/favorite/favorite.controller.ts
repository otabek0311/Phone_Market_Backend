import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@ApiTags('Favorite')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}

  @ApiOperation({ summary: 'Add product to favorites' })
  @Post()
  add(@Req() req, @Body() dto: CreateFavoriteDto) {
    return this.service.add(req.user, dto.productId);
  }

  @ApiOperation({ summary: 'Get my favorites' })
  @Get()
  getMy(@Req() req) {
    return this.service.getMyFavorites(req.user);
  }

  @ApiOperation({ summary: 'Remove from favorites' })
  @Delete(':id')
  remove(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.remove(req.user, id);
  }
}
