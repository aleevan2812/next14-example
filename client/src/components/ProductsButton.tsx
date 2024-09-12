import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function ProductsButton() {
  return (
    <Link href={'/products'}>
      <Button size={'sm'}>Danh sách sản phẩm</Button>
    </Link>
  );
}
