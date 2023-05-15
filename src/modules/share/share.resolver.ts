import { FindOptionsWhere} from 'typeorm';
import { SUCCESS} from '../../common/constants/code';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {  ShareInput } from './dto/share-input.type';
import { ShareType } from './dto/share.type';
import {  ShareService } from './share.service';
import { Result } from '@/common/dto/result.type';
import { ShareResults } from './dto/result-share.output';
import { PageInput } from '@/common/dto/page.input';
import {Share  } from './models/share.entity';


@Resolver()
export class ShareResolver {
  constructor(private readonly shareService: ShareService) {}
  @Mutation(() => Boolean, { description: '新增分享' })
  async createShare(@Args('params') params: ShareInput): Promise<boolean> {
    return await this.shareService.create(params);
  }
  @Mutation(() => Boolean, { description: '删除一个分享' })
  async delShare(@Args('id') id: string): Promise<boolean> {
    return await this.shareService.del(id);
  }
  @Query(() => ShareResults)
  async getSharesFrom(@Args('page') page: PageInput,
  @Args('user') user: string,
  ): Promise<ShareResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Share> = { fromuser: user };
    const [results, total] = await this.shareService.findShares({
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
  @Query(() => ShareResults)
  async getSharesTo(@Args('page') page: PageInput,
  @Args('user') user: string,
  ): Promise<ShareResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Share> = { touser: user };
    const [results, total] = await this.shareService.findShares({
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
}


