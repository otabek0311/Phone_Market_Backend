import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly repo: Repository<Profile>,
  ) {}

  async findById(id: number): Promise<ProfileResponseDto> {
    const profile = await this.repo.findOne({ where: { id } });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const { password, ...result } = profile;
    return result;
  }

  async updateById(id: number, dto: UpdateProfileDto): Promise<ProfileResponseDto> {
    const profile = await this.repo.findOne({ where: { id } });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    Object.assign(profile, dto);
    const saved = await this.repo.save(profile);

    const { password, ...result } = saved;
    return result;
  }
}
