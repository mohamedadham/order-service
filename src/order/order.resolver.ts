import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { CreateOrderInput, Order } from './graphql/types.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => Order)
  async order(@Args('id') id: number): Promise<Order | null> {
    const result = await this.orderService.getOrder(id);
    if (!result) return;

    return {
      id: result.id,
      totalPrice: result.totalPrice,
      createdAt: result.createdAt,
      userId: result.userId,
      products: result.products.map(({ product }) => product),
    };
  }

  @Query(() => [Order])
  async orders(): Promise<Order[]> {
    const results = await this.orderService.getOrders();

    return results.map((result) => ({
      id: result.id,
      totalPrice: result.totalPrice,
      createdAt: result.createdAt,
      userId: result.userId,
      products: result.products.map(({ product }) => product),
    }));
  }

  @Mutation(() => Order)
  async createOrUpdateOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    const { userId, orderProducts } = createOrderInput;
    const result = await this.orderService.createOrder(userId, orderProducts);

    return {
      id: result.id,
      totalPrice: result.totalPrice,
      createdAt: result.createdAt,
      products: result.products.map(({ product }) => product),
      userId: result.userId,
    };
  }
}
