import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { Product } from '../product/entities/product.entity';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async add(user: Profile, productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const exists = await this.favoriteRepository.findOne({
      where: {
        user: { id: user.id },
        product: { id: product.id },
      },
    });

    if (exists) {
      return exists; // duplicate qo‘shilmaydi
    }

    const favorite = this.favoriteRepository.create({
      user,
      product,
    });

    return this.favoriteRepository.save(favorite);
  }

  async getMyFavorites(user: Profile) {
    const items = await this.favoriteRepository.find({
      where: { user: { id: user.id } },
      relations: ['product'],
      order: { createdAt: 'DESC' },
    });

    return items.map((item) => ({
      id: item.id,
      productId: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      slug: item.product.slug,
    }));
  }

  async remove(user: Profile, id: number): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        id,
        user: { id: user.id },
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.favoriteRepository.remove(favorite);
  }
}
