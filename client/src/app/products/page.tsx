import React, { useEffect, useState } from 'react';

import { productApiRequest } from '@/apiRequests/product';
import ProductsTable from '@/components/ProductsTable';
import { Product } from '../../../public/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ProductsList() {
  const { payload } = await productApiRequest.getProducts();
  const products = payload.data as Product[];

  return (
    <div>
      <h1>Products</h1>
      <div className='flex justify-center mt-4'>
        <Link href={'products/add'}>
          <Button variant='outline'>Add new product</Button>
        </Link>
      </div>
      {products ? (
        <ProductsTable products={products} />
      ) : (
        <p>Loading products...</p>
      )}
      {/* Centering the Button */}
    </div>
  );
}
