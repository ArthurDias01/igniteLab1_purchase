import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { ProductsResolver } from '../http/graphql/resolvers/products.resolver';
import { ProductsService } from '../services/products.service';
import { GraphQLModule } from '@nestjs/graphql';
import path from "node:path";
import { ApolloDriver } from '@nestjs/apollo';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { PurchasesService } from '../services/purchases.service';
import { CustomersService } from '../services/customers.service';
@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule,
  GraphQLModule.forRoot({
    driver: ApolloDriver,
    autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
  })
  ],
  providers: [ProductsResolver, ProductsService, PurchasesResolver, PurchasesService, CustomersService, CustomersResolver],
})
export class HttpModule { }
