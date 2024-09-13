'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import {
  RegisterBodyType,
  RegisterBody,
} from '@/schemaValidations/auth.schema';
import envConfig from '@/config';
import { useToast } from '@/hooks/use-toast';

export function RegisterForm() {
  const { toast } = useToast();

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: RegisterBodyType) {
    console.log(values);
    const res = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
      {
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );
  }

  return (
    <div className='mx-auto  space-y-6 max-w-[600px]'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Register</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-2 max-w-[1000px] flex-shrink-0 w-full'
          noValidate
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='!mt-8 w-full'>
            Đăng ký
          </Button>
        </form>
      </Form>
    </div>
  );
}
