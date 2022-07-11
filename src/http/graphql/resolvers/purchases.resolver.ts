import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { Purchase } from "../models/purchase";

import { PurchasesService } from "../../../services/purchases.service";
import { ProductsService } from "../../../services/products.service";
import { CustomersService } from "../../../services/customers.service";
import { Product } from "../models/product";
import { CreatePurchaseInput } from "../inputs/create-purchase-input";
import { AuthUser, CurrentUser } from "../../auth/current-user";


@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) { }

  @Query(() => [Purchase])
  // @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @CurrentUser() user: AuthUser,
    @Args('data') data: CreatePurchaseInput
  ) {
    let customer = await this.customersService.getCustomerByAuthUserId(user.sub);

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
        name: user.name,
        email: user.email,
      })
    };

    // console.log('CUSTOMER: ', customer);
    return this.purchasesService.createPurchase({
      productId: data.productId,
      customerId: customer.id,
    });
  }

}
