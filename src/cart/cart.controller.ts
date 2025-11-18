import { Controller, BadRequestException, Get, Param, Body, Delete, Post } from '@nestjs/common';
import {CartService} from "./cart.service";


// routes that start with /cart
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    //get cart/:userId - returns cart for a user
    @Get(':userId')
    async getCart(@Param('userId') userId: string) {
        const cleanedUserId = userId.trim();
        if (!cleanedUserId) {
            throw new BadRequestException('UserId must be provided.');
        }
        return this.cartService.getCartForUser(cleanedUserId);
    }

    // POST , add or update item can repladce quantity for that product in the cart with the new given value

    @Post(':userId/items')
    async addOrUpdateItem(
        @Param('userId') userId: string,
        @Body('productId') productIdRaw: any,
        @Body('quantity') quantityRaw: any
    ){
        const cleanedUserId = userId.trim();
        if (!cleanedUserId) {
            throw new BadRequestException('UserId must be provided.');
        }

        const productId = Number(productIdRaw);
        const quantity = Number(quantityRaw);

        if (
            Number.isNaN(productId) || productId < 1 || quantity <1
        ){
        throw new BadRequestException('Product Id and quantity must be positive numbers.');
        }
        return this.cartService.addOrUpdateItem(cleanedUserId, productId, quantity);
    }
    //delete item from cart
    @Delete(':userId/items/:productId')
    async removeItem(@Param('userId') userId: string, @Param('productId') productIdParam: string)
    {
        const cleanedUserId = userId.trim();
        if (!cleanedUserId) {
            throw new BadRequestException('UserId must be provided.');
        }
        const productId = Number(productIdParam);
        if (Number.isNaN(productId) || productId < 1) {
            throw new BadRequestException('Product Id must be a positive number.');
        }
        return this.cartService.removeItem(cleanedUserId, productId);

    }
    // delete all items from users cart
    @Delete(':userId')
    async clearCart(@Param('userId') userId: string) {
        const cleanedUserId = userId.trim();
        if (!cleanedUserId) {
            throw new BadRequestException('UserId must be provided.');
        }
        return this.cartService.clearCart(cleanedUserId);
    }
}
