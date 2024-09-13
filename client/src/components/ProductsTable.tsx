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

  return (
    <div className='bg-background text-card-foreground'>
      <div className='px-6 py-8'>
        <div className='grid gap-6'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-muted'>
                <th className='px-4 py-2 text-left'>Name</th>
                <th className='px-4 py-2 text-left'>Price</th>
                <th className='px-4 py-2 text-left'>Description</th>
                <th className='px-4 py-2 text-left'>Image</th>
                <th className='px-4 py-2 text-left'>Options</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr className='border-b' key={product.id}>
                  <td className='px-4 py-2'>{product.name}</td>
                  <td className='px-4 py-2'>${product.price}</td>
                  <td className='px-4 py-2'>{product.description}</td>
                  <td className='px-4 py-2'>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                      className='rounded-md object-cover'
                      style={{ aspectRatio: '100/100', objectFit: 'cover' }}
                    />
                  </td>
                  <td className='px-4 py-2 flex gap-2'>
                    <Link href={`/products/edit/${product.id}`}>
                      <Button
                        variant='outline'
                        size='default'
                        className='text-card-foreground'
                      >
                        <FilePenIcon className='h-5 w-5' />
                        <span className='sr-only'>Edit</span>
                      </Button>
                    </Link>
                    <Button
                      variant={'destructive'}
                      size='icon'
                      className='text-card-foreground'
                      onClick={() => deleteProduct(product.id)}
                    >
                      <TrashIcon className='h-5 w-5' />
                      <span className='sr-only'>Delete</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FilePenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10' />
      <path d='M14 2v4a2 2 0 0 0 2 2h4' />
      <path d='M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z' />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 6h18' />
      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
    </svg>
  );
}
