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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comment')
@Controller()
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add comment to product' })
  @Post('products/:id/comments')
  create(
    @Req() req,
    @Param('id', ParseIntPipe) productId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.service.create(req.user, productId, dto.content);
  }

  @ApiOperation({ summary: 'Get comments of product' })
  @Get('products/:id/comments')
  getByProduct(@Param('id', ParseIntPipe) productId: number) {
    return this.service.getByProduct(productId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete my comment' })
  @Delete('comments/:id')
  remove(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.remove(req.user, id);
  }
}
