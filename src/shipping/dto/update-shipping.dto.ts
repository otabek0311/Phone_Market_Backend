import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ShippingStatus } from '../entities/shipping.entity';

export class UpdateShippingDto {
  @ApiPropertyOptional({ example: 'DHL' })
  @IsOptional()
  @IsString()
  carrier?: string;

  @ApiPropertyOptional({ example: 'TRACK123' })
  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @ApiPropertyOptional({ enum: ShippingStatus })
  @IsOptional()
  @IsEnum(ShippingStatus)
  status?: ShippingStatus;
}
