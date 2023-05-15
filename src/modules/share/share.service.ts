import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, FindOptionsWhere } from 'typeorm';
import { Share } from './models/share.entity';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(Share) private ShareRepository: Repository<Share>,
  ) {}
  // 新增一个文件
  async create(entity: DeepPartial<Share>): Promise<boolean> {
    const res = await this.ShareRepository.insert(entity);
    if (res && res.raw.affectedRows > 0) {
      return true;
    }
  }
  async del(id: string): Promise<boolean> {
    const res = await this.ShareRepository.delete(id);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }
  async findShares({
    start,
    length,
    where
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<Share>;
  }): Promise<[Share[], number]> {
    return this.ShareRepository.findAndCount({
      take: length,
      skip: start,
      where
    });
  }
}
