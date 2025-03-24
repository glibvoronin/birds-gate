import { User } from '@birds-gate/data-access';

export interface AuthenticatedRequest extends Request {
  user: Omit<User, 'password'>;
}
