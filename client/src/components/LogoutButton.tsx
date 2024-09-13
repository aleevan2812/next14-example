'use client';

import authApiRequest from '@/apiRequests/auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authApiRequest.logout();
    router.push('/login');
  };

  // Return the button element from the component itself
  return (
    <>
      <div className='h-4 w-4' />
      <Button className='flex items-center gap-2 w-full' onClick={handleLogout}>
        Đăng xuất
      </Button>
    </>
  );
}
