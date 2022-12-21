import { randomUUID } from 'node:crypto';

import { Replace } from '@utils/Replace';

export interface IUserProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export class User {
  private readonly _id: string;
  private readonly props: IUserProps;

  public constructor(
    props: Replace<IUserProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
