import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Adress } from 'src/adress/entities/adress.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdressGuard implements CanActivate {
  constructor(
    @InjectRepository(Adress)
    private readonly adressRepository: Repository<Adress>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const adressId = Number(request.params.id);

    const adress = await this.adressRepository.findOne({
      where: { id: adressId },
      relations: ['user'],
    });

    if (!adress || adress.user.id !== userId) {
      throw new ForbiddenException('You do not own this adress');
    }
    return true;
  }
}
