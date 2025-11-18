import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }
  async findProductByCategory(id:number) {
    const category = await this.prisma.category.findUnique({
      where: {id},
    });
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
      const product = await this.prisma.product.findMany({
        where: { categoryId: id},
        orderBy: {id: 'asc'}
      });
    return{category, product};
  }
}
