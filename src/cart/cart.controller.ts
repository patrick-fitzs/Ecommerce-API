import { Controller, BadRequestException, Get, Param } from '@nestjs/common';
import {CartService} from "./cart.service";


// routes that start with /cart
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
    //get cart/:userId

    @Get(':userId')
    async getCartForUser(@Param('userId') userId: string) {
        if (!userId || userId.trim().length === 0) {
            throw new BadRequestException('UserId must be provided.');
        }
        return this.cartService.getCartForUser(userId.trim());
    }
}
