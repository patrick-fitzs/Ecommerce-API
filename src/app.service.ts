import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!/ cruel world where folders are like matryoshka dolls';
  }
}
