import { randomUUID } from 'node:crypto';

import { Replace } from '@utils/Replace';

export interface ITagProps {
  name: string;
  createdAt: Date;
}

export class Tag {
  private readonly _id: string;
  private readonly props: ITagProps;

  public constructor(
    props: Replace<ITagProps, { createdAt?: Date }>,
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

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
