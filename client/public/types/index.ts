import { AccountResType } from '@/schemaValidations/account.schema';

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Profile = AccountResType['data'];
