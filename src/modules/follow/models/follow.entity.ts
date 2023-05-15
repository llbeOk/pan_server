import { IsNotEmpty } from 'class-validator';
import {  Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 组件
 */
@Entity('follow')
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    comment: '用户',
    default: '',
  })
  @IsNotEmpty()
  user: string;
  @Column({
    comment: '关注用户',
    default: '',
  })
  @IsNotEmpty()
  follow: string;
}
