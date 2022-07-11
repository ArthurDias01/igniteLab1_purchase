import { ObjectType, ID, Field, registerEnumType } from '@nestjs/graphql';
import { Product } from './product';

enum PurchaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}
registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Available purchase statuses',
});


@ObjectType()
export class Purchase {

  @Field(() => ID)
  id: string;

  // @Field()
  // customer: string;

  // @Field()
  // customerId: string;

  @Field(() => PurchaseStatus)
  status: PurchaseStatus;

  // @Field()
  // product: string;

  // @Field()
  // productId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Product)
  product: Product;

  productId: string;
}
