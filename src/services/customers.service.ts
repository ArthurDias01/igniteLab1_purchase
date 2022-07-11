import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface CreateCustomerParams {
  authUserId: string;
  name: string;
  email: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) { }

  getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }

  createCustomer({ authUserId, name, email }: CreateCustomerParams) {
    return this.prisma.customer.create({
      data: {
        authUserId,
        name: name,
        email: email,
      },
    });
  }

}
