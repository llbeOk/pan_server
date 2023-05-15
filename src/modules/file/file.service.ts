import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, FindOptionsWhere } from 'typeorm';
import { File } from './models/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private FileRepository: Repository<File>,
  ) {}
  // 新增一个文件
  async create(entity: DeepPartial<File>): Promise<boolean> {
    const res = await this.FileRepository.insert(entity);
    if (res && res.raw.affectedRows > 0) {
      return true;
    }
  }
  async del(id: string): Promise<boolean> {
    const res = await this.FileRepository.delete(id);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }
  async findFiles({
    start,
    length,
    where
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<File>;
  }): Promise<[File[], number]> {
    return this.FileRepository.findAndCount({
      take: length,
      skip: start,
      where
    });
  }
}
