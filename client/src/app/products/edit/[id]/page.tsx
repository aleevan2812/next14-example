import React from 'react';

import { productApiRequest } from '@/apiRequests/product';
import { Product } from '../../../../../public/types';
import ProductForm from '@/app/products/product-form';

type Props = {
  params: { id: string };
};

export default async function ProductEdit({ params }: Props) {
  const isEdit = true as boolean;
  const { payload } = await productApiRequest.getProductById(params.id);
  const product = payload.data as Product | null;

  return (
    <div>
      <ProductForm product={product} isEdit={isEdit} />
    </div>
  );
}
