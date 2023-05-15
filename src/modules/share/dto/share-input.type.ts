import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ShareInput {
  @Field({ description: '原用户' })
  fromuser?: string;
  @Field({ description: '传递用户' })
  touser?: string;
  @Field({ description: '文件名' })
  filename: string;
  @Field({ description: '文件类型' })
  filetype: string;
  @Field({ description: '文件大小' })
  filesize: number;
}
