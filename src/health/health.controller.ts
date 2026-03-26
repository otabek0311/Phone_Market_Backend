import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @ApiOperation({ summary: 'Health check' })
  @Get()
  check() {
    return this.service.check();
  }
}
