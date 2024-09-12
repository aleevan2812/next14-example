'use client';

import ButtonLogout from '@/components/ButtonLogout';
import { ModeToggle } from '@/components/ModeToggle';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link href={'/login'}>Đăng nhập</Link>
        </li>

        <li>
          <Link href={'/register'}>Đăng ký</Link>
        </li>
        <li>
          <ButtonLogout />
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
}
