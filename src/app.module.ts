import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    OrderModule,
    UserModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'amq.direct',
          type: 'direct',
        },
      ],
      uri: 'amqp://rabbitmq:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
