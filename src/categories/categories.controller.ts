import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  // class above and this method mean GET /categories. Will add @Get(':id') below this
  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }
}
