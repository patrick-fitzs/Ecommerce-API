import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma/prisma.service";


//logic for working with carts
@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) {}

    //get cart for a given userid
    // if cart exists for this userid, return it, if not create an empty cart
    // include all cart items, and their product details

    async getCartForUser(userId: string) {
        let cart = await this.prisma.cart.findUnique({
            where: {userId},
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: {userId},
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
        }
        return cart;
    }
}
