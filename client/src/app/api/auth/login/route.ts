import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import authApiRequest from '@/apiRequests/auth';
import { LoginBodyType } from '@/schemaValidations/auth.schema';

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType;
  const cookieStore = cookies();
  try {
    const { payload } = await authApiRequest.sLogin(body);
    const accessToken = payload.data.token;
    const user = payload.data.account;
    console.log(user);
    const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
    cookieStore.set('accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedAccessToken.exp * 1000,
    });

    cookieStore.set('isLoggedIn', 'true', {
      path: '/',
      sameSite: 'lax',
      secure: true,
      expires: decodedAccessToken.exp * 1000,
    });

    return Response.json(payload);
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: 'Có lỗi xảy ra',
      },
      {
        status: 500,
      }
    );
  }
}
