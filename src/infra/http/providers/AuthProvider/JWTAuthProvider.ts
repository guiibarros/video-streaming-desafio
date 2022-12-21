import { sign } from 'jsonwebtoken';

import auth from '@core/config/auth';
import { IAuthProvider } from '@core/modules/account/providers/IAuthProvider';

export class JWTAuthProvider implements IAuthProvider {
  public login(id: string): string {
    const { secret, expiresIn } = auth;

    const accessToken = sign({}, secret, {
      subject: id,
      expiresIn,
    });

    return accessToken;
  }
}
