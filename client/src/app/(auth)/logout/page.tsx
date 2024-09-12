import authApiRequest from '@/apiRequests/auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

function Logout() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  useEffect(() => {}, [accessToken, router, pathname]);
  return <div>page</div>;
}
