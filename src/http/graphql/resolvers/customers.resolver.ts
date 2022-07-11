import { UseGuards } from "@nestjs/common";
// import { PrismaService } from "../../../database/prisma/prisma.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import { Customer } from "../models/customer";
import { CustomersService } from "../../../services/customers.service";
import { AuthUser, CurrentUser } from "../../auth/current-user";
import { PurchasesService } from "../../../services/purchases.service";
import { Purchase } from "../models/purchase";


@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) { }

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField(() => Purchase)
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }

}
