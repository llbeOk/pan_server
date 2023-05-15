import { Follow } from './models/follow.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, FindOptionsWhere } from 'typeorm';
@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private FollowRepository: Repository<Follow>,
  ) {}
  // 新增一个关注
  async create(entity: DeepPartial<Follow>): Promise<boolean> {
    const res = await this.FollowRepository.insert(entity);
    if (res && res.raw.affectedRows > 0) {
      return true;
    }
  }
  async del(id: string): Promise<boolean> {
    const res = await this.FollowRepository.delete(id);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }
  async findFollows({
    start,
    length,
    where
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<Follow>;
  }): Promise<[Follow[], number]> {
    return this.FollowRepository.findAndCount({
      take: length,
      skip: start,
      where
    });
  }
}