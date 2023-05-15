import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileType {
  @Field()
  id?: string;
  @Field({ description: '文件路径' })
  filepath?: string;
  @Field({ description: '用户名' })
  username?: string;
  @Field({ description: '文件名' })
  filename: string;
  @Field({ description: '文件类型' })
  filetype: string;
  @Field({ description: '文件大小' })
  filesize: number;
  @Field()
  createdAt: Date;
}
