import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShareType {
  @Field()
  id?: string;
  @Field({ description: '原用户' })
  fromuser?: string;
  @Field({ description: '用户名' })
  touser?: string;
  @Field({ description: '文件名' })
  filename: string;
  @Field({ description: '文件类型' })
  filetype: string;
  @Field({ description: '文件大小' })
  filesize: number;
  @Field()
  createdAt: Date;
}
