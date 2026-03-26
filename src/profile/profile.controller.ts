import {
  Controller,
  Get,
  Put,
  Patch,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileGuard } from './common/guards/profile.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from './decorator/current-user.decorator';

@ApiTags('Profile')
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Berilgan ID li foydalanuvchi profilini olish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi profili' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @UseGuards(ProfileGuard)
  @Patch(':id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.service.updateById(id, dto);
  }

  @Put('me')
  @ApiOperation({ summary: 'Foydalanuvchi profilini yangilash' })
  @ApiResponse({ status: 200, description: 'Profil muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 401, description: "Avtorizatsiyadan o'tmagan" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  updateMe(@CurrentUser() user, @Body() dto: UpdateProfileDto) {
    return this.service.updateMe(user.id, dto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish (Admin)' })
  @ApiResponse({ status: 200, description: "Barcha foydalanuvchilar ro'yxati" })
  @ApiResponse({ status: 401, description: "Avtorizatsiyadan o'tmagan" })
  @ApiResponse({ status: 403, description: 'Ruxsat berilmagan' })
  getAllUsers() {
    return this.service.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Berilgan ID li foydalanuvchi profilini olish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi profili' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
  getUserById(@Param('id') id: number) {
    return this.service.getUserById(id);
  }
}
