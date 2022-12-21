import { User } from '../entities/User';

export abstract class IUsersRepository {
  public abstract create(user: User): Promise<void>;
  public abstract findById(id: string): Promise<User | null>;
  public abstract findByEmail(email: string): Promise<User | null>;
}
