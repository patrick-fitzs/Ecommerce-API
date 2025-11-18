import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaModule } from "../prisma/prisma.module";

// cart moduile groups all related to shopping cart feature
@Module({
  imports: [PrismaModule], // cart can inject PrismaService through this
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
