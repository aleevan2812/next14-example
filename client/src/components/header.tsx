'use client';

import ButtonLogout from '@/components/LogoutButton';
import { ModeToggle } from '@/components/ModeToggle';
import ProductsButton from '@/components/ProductsButton';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Header() {
  return (
    <div className='flex justify-between items-center p-4 shadow-md'>
      <ul className='flex space-x-4'>
        <li>
          <Link href='/login'>Đăng nhập</Link>
        </li>

        <li>
          <Link href='/register'>Đăng ký</Link>
        </li>

        <li>
          <ButtonLogout />
        </li>

        <li>
          <ProductsButton />
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
}
