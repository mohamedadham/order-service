import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(
    userId: number,
    orderProducts: { productId: number; quantity: number }[],
  ) {
    const totalPrice = orderProducts.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);

    const result = await this.prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        totalPrice,
        products: {
          create: orderProducts.map((orderProduct) => ({
            product: { connect: { id: orderProduct.productId } },
            quantity: orderProduct.quantity,
          })),
        },
      },
      include: {
        products: { include: { product: true } },
      },
    });

    return result;
  }

  async getOrders() {
    return await this.prisma.order.findMany({
      include: { user: true, products: { include: { product: true } } },
    });
  }

  async getOrder(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { user: true, products: { include: { product: true } } },
    });
  }
}
