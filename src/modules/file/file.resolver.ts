import { FindOptionsWhere, Like } from 'typeorm';
import { SUCCESS, UPDATE_ERROR } from './../../common/constants/code';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {  ContextType, Res, UseGuards } from '@nestjs/common';
import { FileInput } from './dto/file-input.type';
import { FileType } from './dto/file.type';
import { FileService } from './file.service';
import { Result } from '@/common/dto/result.type';
import { FileResults } from './dto/result-file.output';
import { PageInput } from '@/common/dto/page.input';
import { File } from './models/file.entity';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { createReadStream, existsSync } from 'fs';
import { Response } from 'express';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}
  @Query(() => FileResults)
  async getFiles(@Args('page') page: PageInput,
  @Args('user') user: string,
  @Args('name', { nullable: true }) name?: string,
  @Args('type', { nullable: true }) type?: string
  ): Promise<FileResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<File> = { username: user };
    if(name){
    where.filename= Like(`%${name}%`)
    }
    if(type){
      where.filetype=type
    }
    const [results, total] = await this.fileService.findFiles({
      start: pageNum === 1 ? 0 : (pageNum - 1) * pageSize + 1,
      length: pageSize,
      where
    });
    return {
      code: SUCCESS,
      data: results,
      page: {
        pageNum,
        pageSize,
        total,
      },
      message: '获取成功',
    };
  }
  @Mutation(() => Boolean, { description: '新增文件' })
  async createFile(@Args('params') params: FileInput): Promise<boolean> {
    return await this.fileService.create(params);
  }
  @Mutation(() => Boolean, { description: '删除一个文件' })
  async delFile(@Args('id') id: string): Promise<boolean> {
    return await this.fileService.del(id);
  }
}


