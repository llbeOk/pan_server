import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({ description: '昵称' })
  name?: string;
  @Field({ description: '密码' })
  password?: string;
  @Field({ description: '手机号' })
  tel: string;
}
