import ProductForm from '@/components/forms/ProductForm';
import React from 'react';

export default function ProductAdd() {
  return (
    <div>
      <ProductForm product={null} isEdit={false} />
    </div>
  );
}
