import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'; // generated db from schema.prisma

@Injectable()
export class PrismaService extends PrismaClient{}
