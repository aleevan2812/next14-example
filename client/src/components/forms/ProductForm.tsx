'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateProductBodyType,
  UpdateProductBody,
  UpdateProductBodyType,
} from '@/schemaValidations/product.schema';
import Link from 'next/link';
import { Product } from '../../../public/types';
import { useForm } from 'react-hook-form';
import { productApiRequest } from '@/apiRequests/product';
import { log } from 'console';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { mediaApiRequest } from '@/apiRequests/media';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  product: Product | null;
  isEdit: boolean;
};

export default function ProductForm({ product, isEdit }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  // const [editMode, setEditMode] = useState<boolean>(isEdit);
  const form = useForm<UpdateProductBodyType>({
    resolver: zodResolver(UpdateProductBody),
    defaultValues: {
      name: product?.name ?? '',
      price: product?.price ?? 0,
      description: product?.description ?? '',
      image: product?.image ?? '',
    },
  });
  const image = form.watch('image');

  const onSubmit = async (values: any) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file as Blob);
      const uploadImageResult = await mediaApiRequest.uploadImage(formData);
      const imageUrl = uploadImageResult.payload.data;
      console.log('---> url image: ', imageUrl);

      values = {
        ...values,
        image: imageUrl,
      };
    }

    let res;
    if (isEdit)
      res = await productApiRequest.update(
        product?.id ?? 0,
        values as UpdateProductBodyType
      );
    else res = await productApiRequest.add(values as CreateProductBodyType);

    toast({
      title: res.status.toString(),
      description: res.payload.message,
    });

    console.log('res: ', res);
    router.push('/products');
    router.refresh();
  };
  return (
    <>
      <br />
      <div className='mx-auto  space-y-6 max-w-[600px]'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Edit product</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='shadcn'
                      type='number'
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)} // Convert string to number
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desciption</FormLabel>
                  <FormControl>
                    <Textarea
                      id='description'
                      className='min-h-32 bg-card'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-4'>
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hình ảnh</FormLabel>
                    <FormControl>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFile(file);
                            field.onChange(
                              'http://localhost:3000/' + file.name
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {(file || image) && (
                <>
                  <Image
                    src={file ? URL.createObjectURL(file) : image}
                    width={100}
                    height={100}
                    className='rounded-md object-cover'
                    style={{ aspectRatio: '100/100', objectFit: 'cover' }}
                    alt='preview'
                  />

                  <Button
                    variant={'destructive'}
                    type='button'
                    size={'sm'}
                    onClick={(e: any) => {
                      setFile(null);
                      form.setValue('image', '');
                      e.target.value = null;
                    }}
                  >
                    <span>Delete Image</span>
                  </Button>
                </>
              )}
            </div>

            <div className='flex justify-center gap-2 px-6 py-4 '>
              <Button variant='destructive' type='submit'>
                {isEdit ? 'Edit' : 'Create'}
              </Button>
              <Link href={'/products'}>
                <Button type='reset'>Cancel</Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
