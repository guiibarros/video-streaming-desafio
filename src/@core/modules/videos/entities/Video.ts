import { randomUUID } from 'node:crypto';

import { Replace } from '@utils/Replace';

export interface IVideoProps {
  title: string;
  description: string;
  userId: string;
  createdAt: Date;
  videoUrl: string;
}

export class Video {
  private readonly _id: string;
  private readonly props: IVideoProps;

  public constructor(
    props: Replace<IVideoProps, { createdAt?: Date }>,
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

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get videoUrl(): string {
    return this.props.videoUrl;
  }

  public set videoUrl(videoUrl: string) {
    this.props.videoUrl = videoUrl;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
