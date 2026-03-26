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
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findById(id: number): Promise<ProfileResponseDto> {
    const profile = await this.profileRepository.findOne({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const result = { ...profile } as ProfileResponseDto & { password?: string };
    delete result.password;
    return result;
  }

  async updateById(
    id: number,
    dto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    const profile = await this.profileRepository.findOne({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    Object.assign(profile, dto);

    const updatedProfile = await this.profileRepository.save(profile);

    const result = { ...updatedProfile } as ProfileResponseDto & {
      password?: string;
    };
    delete result.password;
    return result;
  }

  async updateMe(
    id: number,
    dto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    return this.updateById(id, dto);
  }

  async getAllUsers(): Promise<ProfileResponseDto[]> {
    const profiles = await this.profileRepository.find();

    return profiles.map((profile) => {
      const result = { ...profile } as ProfileResponseDto & {
        password?: string;
      };
      delete result.password;
      return result;
    });
  }

  async getUserById(id: number): Promise<ProfileResponseDto> {
    return this.findById(id);
  }
}
