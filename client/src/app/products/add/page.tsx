import ProductForm from '@/app/products/product-form'
import React from 'react'

export default function ProductAdd() {
  return (
    <div>
      <ProductForm product={null} isEdit={false}/>
    </div>
  )
}
