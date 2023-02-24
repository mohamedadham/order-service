import { PrismaService } from './../prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_CONNECTION',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'user_queue',
        },
      },
    ]),
  ],
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
