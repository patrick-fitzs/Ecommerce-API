import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma/prisma.service"; // straight up to Prisma schema (client)

// logic for products feature
@Injectable()
export class ProductsService {
    //constructor
    constructor(private readonly prisma: PrismaService) {}

    // get paginated list, page = current page number, limit = how many items per page
    // method to get all products (non deleted), sorted by name, includes the category
    async findAll(page:number, limit:number) {
        //avoid negatives and create minimums
        const safePage = page < 1 ? 1 : page; // safePage = if the page is less than one, choose 1, or the page number
        const safeLimit = limit < 1 ? 10 : limit; // if limit less than one, choose 10 or limit number

        // page -1 so we start at the given index e.g. 1 is index 0, (want page 2, limit 10,so skip 10, take next 10)
        const skip = (safePage - 1) * safeLimit;

        // run $multi query, return array of items and total number(count)
        const [items, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                where: {deletedAt:null},
                orderBy: {name: 'asc'},
                skip,
                take: safeLimit,
                include: {
                    category: true,
                },
            }),
            this.prisma.product.count({
                where: {deletedAt:null},
            }),
        ]);
        const totalPages = Math.ceil(total/safeLimit);

        //return data and pagination data
        return {
            data: items,
            meta: {
                page: safePage,
                limit: safeLimit,
                total,
                totalPages,
            }
        }
        // return this.prisma.product.findMany({
        //     where: { deletedAt: null }, // ignore deleted products
        //     orderBy: { name: 'asc'},
        //     include: {
        //         category: true, // to join the Category row so the prisma client gets profuct plus the ategory together
        //     },
        // });
    }

    // findOne, to return a single product by its id.
    async findOne(id: number) {
        const product = await this.prisma.product.findUnique({
            where: { id , deletedAt: null ,},
            include: {category: true },
        });

        // exception
        if (!product) {
            throw new NotFoundException(`Product not found: ${id}`);
        }

        return product;
    }
}
