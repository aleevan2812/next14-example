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
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema';

import authApiRequest from '@/apiRequests/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';


export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginBodyType) => {
    const res = await login(values);
    toast({
      title: res.status.toString(),
      description: res.payload.message,
    });
  };

  return (
    <div className='mx-auto max-w-sm space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Login</h1>
        <p className='text-muted-foreground'>
          Enter your email and password to access your account.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='abc@domain.com' {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Đăng nhập</Button>
        </form>
      </Form>
    </div>
  );
}
