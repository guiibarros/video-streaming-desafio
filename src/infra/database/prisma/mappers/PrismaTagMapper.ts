import { Tag as RawTag } from '@prisma/client';

import { Tag } from '@core/modules/tags/entities/Tag';

export class PrismaTagMapper {
  private constructor() {}

  public static toPrisma(tag: Tag): RawTag {
    return {
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
    };
  }

  public static toDomain(tag: RawTag): Tag {
    return new Tag(
      {
        name: tag.name,
        createdAt: tag.createdAt,
      },
      tag.id,
    );
  }
}
