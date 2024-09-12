'use client';

import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Product } from '../../public/types';
import Link from 'next/link';
import { productApiRequest } from '@/apiRequests/product';
import { useToast } from '@/hooks/use-toast';

type Props = {
  products: Product[];
};

export default function ProductsTable({ products }: Props) {
  const { toast } = useToast();
  const deleteProduct = async (id: number): Promise<void> => {
    const res = await productApiRequest.delete(id);
    toast({
      title: res.status.toString(),
      description: res.payload.message,
    });
  };

  console.log(products);

  return (
    <Table>
      <TableCaption>A list of your recent products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Image</TableHead>
          <TableHead className='text-right'>Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className='font-medium'>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell className='text-right'>
              <Image
                src={product.image}
                alt={product.name}
                width={90}
                height={90}
                className='w-16 h-16 object-cover'
              />
            </TableCell>
            <TableCell className='text-right'>
              <Link href={`/products/edit/${product.id}`}>
                <Button variant={'outline'}>Edit</Button>
              </Link>

              <Button
                variant='destructive'
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
