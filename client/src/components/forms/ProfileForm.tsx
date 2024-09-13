'use client';

import { accountApiRequest } from '@/apiRequests/account';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType,
} from '@/schemaValidations/account.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Profile } from '../../../public/types';

type Props = {
  profile?: Profile;
};

const ProfileForm = ({ profile }: Props) => {
  const router = useRouter();
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile?.name,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: UpdateMeBodyType) {
    const result = await accountApiRequest.sUpdateMe({
      body: values,
    });
    console.log(result);

    router.refresh();
  }
  return (
    <div className='mx-auto  space-y-6 max-w-[600px]'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Profile</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-2 max-w-[600 px] flex-shrink-0 w-full'
          noValidate
        >
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder='shadcn'
              type='email'
              value={profile?.email}
              readOnly
            />
          </FormControl>
          <FormMessage />

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder='Tên' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='!mt-8 w-full'>
            Cập nhật
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
