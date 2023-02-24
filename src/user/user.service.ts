import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user) {
    return this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
      },
    });
  }
}
