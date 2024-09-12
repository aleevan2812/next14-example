import http from '@/lib/http';
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType,
} from '@/schemaValidations/product.schema';

export const productApiRequest = {
  getProducts: () =>
    http.get<ProductListResType>('/products', {
      cache: 'no-store',
    }),

  getProductById: (id: string) => http.get<ProductResType>(`/products/${id}`),

  update: (id: number, body: UpdateProductBodyType) =>
    http.put<ProductResType>(`/products/${id}`, body),

  delete: (id: number) => http.delete<ProductResType>(`/products/${id}`),

  add: (body: CreateProductBodyType) =>
    http.post<ProductResType>(`/products`, body),
};
