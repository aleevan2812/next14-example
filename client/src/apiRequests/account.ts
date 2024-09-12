import http from '@/lib/http';
import {
  AccountResType,
  UpdateMeBodyType,
} from '@/schemaValidations/account.schema';

export const accountApiRequest = {
  sMe: () => http.get<AccountResType>('account/me'),
  sUpdateMe: ({ body }: { body: UpdateMeBodyType }) =>
    http.put<AccountResType>('account/me', body, {}),
};
