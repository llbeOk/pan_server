import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FollowType {
  @Field()
  id?: string;
  @Field({ description: '用户' })
  user?: string;
  @Field({ description: '关注用户' })
  follow?: string;
}