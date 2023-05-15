import { IsNotEmpty } from 'class-validator';
import {  Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 组件
 */
@Entity('share')
export class Share {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    comment: '原用户',
    default: '',
  })
  @IsNotEmpty()
  fromuser: string;
  @Column({
    comment: '传递用户',
    default: '',
  })
  @IsNotEmpty()
  touser: string;
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
