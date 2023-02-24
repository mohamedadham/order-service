import { Resolver } from '@nestjs/graphql';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'user_created',
    queue: 'user_queue',
  })
  public async createUserHandler(user) {
    if (user.pattern !== 'user_created') return;
    this.userService.createUser(user.data);

    return new Nack();
  }
}
