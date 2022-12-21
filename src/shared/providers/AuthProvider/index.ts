import { container } from 'tsyringe';

import { IAuthProvider } from '@core/modules/account/providers/IAuthProvider';

import { JWTAuthProvider } from './JWTAuthProvider';

container.registerSingleton<IAuthProvider>('AuthProvider', JWTAuthProvider);
