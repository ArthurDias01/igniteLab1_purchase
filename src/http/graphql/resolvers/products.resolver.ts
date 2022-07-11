import { Controller, Get, UseGuards } from "@nestjs/common";
// import { PrismaService } from "../../../database/prisma/prisma.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Product } from "../models/product";
import { ProductsService } from "../../../services/products.service";
import { CreateProductInput } from "../inputs/create-product-input";


@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) { }

  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.productsService.listAllProducts();
  }

  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }

}
