'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

import React from 'react';

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    // await authApiRequest.logout();
    // router.push('/login');
    // localStorage.clear();
    await logout();
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
