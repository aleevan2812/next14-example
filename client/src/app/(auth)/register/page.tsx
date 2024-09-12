import { RegisterForm } from '@/app/(auth)/register/register-form';
import React from 'react';

export default function page() {
  return (
    <div>
      <h1>Đăng ký</h1>
      <div>
        <RegisterForm />
      </div>
    </div>
  );
}
