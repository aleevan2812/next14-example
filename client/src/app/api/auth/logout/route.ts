import authApiRequest from '@/apiRequests/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  cookieStore.delete('accessToken');
  cookieStore.set('isLoggedIn', 'false');

  if (!accessToken) {
    return Response.json(
      {
        message: 'Không nhận được access token hoặc refresh token',
      },
      {
        status: 200,
      }
    );
  }

  const result = await authApiRequest.sLogout({ accessToken });
  return Response.json(result.payload);
}
