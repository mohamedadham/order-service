import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class OrderProductInput {
  @Field()
  productId: number;

  @Field()
  quantity: number;
}

@InputType()
export class CreateOrderInput {
  @Field()
  userId: number;

  @Field(() => [OrderProductInput])
  orderProducts: OrderProductInput[];
}

@ObjectType()
export class OrderProduct {
  @Field()
  orderId: number;

  @Field()
  quantity: number;

  @Field()
  productId: number;
}

@ObjectType()
export class Product {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;
}

@ObjectType()
export class Order {
  @Field()
  id: number;

  @Field()
  totalPrice: number;

  @Field()
  createdAt: Date;

  @Field()
  userId: number;

  @Field(() => [Product])
  products?: Product[];
}
