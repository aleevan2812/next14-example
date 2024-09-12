'use server';

import { cookies } from 'next/headers';

export async function getAccesstoken() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  return accessToken;
}
