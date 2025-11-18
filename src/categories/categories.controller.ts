import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  // class above and this method mean GET /categories. Will add @Get(':id') below this
  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }
  //route for specific category products
  @Get(':id/products')
  async findProducts(
      @Param('id', ParseIntPipe) id: number,
  ){
    return this.categoriesService.findProductByCategory(id)
  }
}
