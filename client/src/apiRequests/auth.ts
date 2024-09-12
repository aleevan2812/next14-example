import http from '@/lib/http';
import { LoginBodyType, LoginResType } from '@/schemaValidations/auth.schema';

const authApiRequest = {
  // to backend
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
  sLogout: (body: { accessToken: string }) =>
    http.post<any>(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }
    ),

  // nextjs server
  login: (body: LoginBodyType) =>
    http.post<LoginResType>('api/auth/login', body, { baseUrl: '' }),
  logout: () => http.post('/api/auth/logout', null, { baseUrl: '' }),
  
};

export default authApiRequest;
