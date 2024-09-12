import http from '@/lib/http';

export const mediaApiRequest = {
  uploadImage: (body: FormData) => http.post<any>('/media/upload', body),
};
