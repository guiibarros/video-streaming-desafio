import { sign } from 'jsonwebtoken';

import auth from '@config/auth';
import { IAuthProvider } from '@modules/account/providers/IAuthProvider';

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
