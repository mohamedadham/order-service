import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';

@Module({
  providers: [OrderService, OrderResolver, PrismaService],
})
export class OrderModule {}
