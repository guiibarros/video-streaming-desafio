export abstract class IAuthProvider {
  public abstract login(id: string): string;
}
