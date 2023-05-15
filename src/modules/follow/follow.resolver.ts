import { FindOptionsWhere} from 'typeorm';
import { SUCCESS} from '../../common/constants/code';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { FollowInput } from './dto/follow-input.type';
import { FollowResults } from './dto/result-follow.output';
import { PageInput } from '@/common/dto/page.input';
import { Follow } from './models/follow.entity';

@Resolver()
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}
  @Mutation(() => Boolean, { description: '新增分享' })
  async createFollow(@Args('params') params: FollowInput): Promise<boolean> {
    return await this.followService.create(params);
  }
  @Mutation(() => Boolean, { description: '删除一个分享' })
  async delFollow(@Args('id') id: string): Promise<boolean> {
    return await this.followService.del(id);
  }
  @Query(() => FollowResults)
  async getFollowsFrom(@Args('page') page: PageInput,
  @Args('user') user: string,
  ): Promise<FollowResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Follow> = { user: user };
    const [results, total] = await this.followService.findFollows({
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
