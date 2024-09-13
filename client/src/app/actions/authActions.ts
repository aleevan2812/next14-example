'use server';

import { cookies } from 'next/headers';

export async function getAccesstoken(): Promise<string> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value ?? '';

  return accessToken;
}
