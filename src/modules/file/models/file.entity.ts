import { IsNotEmpty } from 'class-validator';
import {  Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 组件
 */
@Entity('file')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '文件路径',
    default: '',
  })
  @IsNotEmpty()
  filepath: string;

  @Column({
    comment: '用户名称',
    default: '',
  })
  @IsNotEmpty()
  username: string;
  @Column({
    comment: '文件类型',
    default: '',
  })
  filetype: string;
  @Column({
    comment: '文件名称',
    default: '',
  })
  filename: string;
  @Column({
    comment: '文件大小',
    default: 0,
  })
  filesize: number;
  @Column({
    comment: '创建时间',
    type:'timestamp',
    default:null
  })
  createdAt: Date;
}
