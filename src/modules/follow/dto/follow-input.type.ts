import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FollowInput {
  @Field({ description: '用户' })
  user?: string;
  @Field({ description: '关注用户' })
  follow?: string;
}
