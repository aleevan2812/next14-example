'use client';

import authApiRequest from '@/apiRequests/auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ButtonLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await authApiRequest.logout();
    router.push('/login');
  };

  // Return the button element from the component itself
  return (
    <Button size={'sm'} onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
}
