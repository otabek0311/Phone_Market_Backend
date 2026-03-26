import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';
import { Repository } from 'typeorm';
import { AdressResponseDto } from './dto/adress-response.dto';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(Adress)
    private readonly adressRepository: Repository<Adress>,
  ) {}

  async create(
    userId: number,
    dto: CreateAdressDto,
  ): Promise<AdressResponseDto> {
    const adress = this.adressRepository.create({
      ...dto,
      user: { id: userId },
    });

    const saved = await this.adressRepository.save(adress);
    return this.toResponse(saved);
  }

  async findMy(userId: number): Promise<AdressResponseDto[]> {
    const adresses = await this.adressRepository.find({
      where: { user: { id: userId } },
    });
    return adresses.map((adress) => this.toResponse(adress));
  }

  async update(id: number, dto: UpdateAdressDto): Promise<AdressResponseDto> {
    const adress = await this.adressRepository.findOne({ where: { id } });

    if (!adress) {
      throw new NotFoundException('Adress not found');
    }

    Object.assign(adress, dto);
    const updated = await this.adressRepository.save(adress);
    return this.toResponse(updated);
  }

  async remove(id: number): Promise<void> {
    const adress = await this.adressRepository.findOne({ where: { id } });

    if (!adress) {
      throw new NotFoundException('Adress not found');
    }
    await this.adressRepository.remove(adress);
  }

  private toResponse(adress: Adress): AdressResponseDto {
    const { id, country, city, street, phone } = adress;
    return { id, country, city, street, phone };
  }
}
