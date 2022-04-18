import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

export const categoryArray = [
  'all',
  'design',
  'website',
  'brand',
  'ecommerce',
  'maintenance',
];

@Entity('portfoliowork')
export class PortfolioWork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: false })
  tagline: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  maincategory: string;

  @Column('text', { array: true, default: [] })
  category: string[];

  @Column({ nullable: false })
  link: string;

  @Column({ nullable: false })
  task: string;

  @Column({ nullable: false })
  result: string;

  @Column({ nullable: true })
  devYear?: number;

  @Column({ nullable: false })
  collagePic: string;

  @Column({ nullable: false })
  cardPic: string;

  @ManyToOne(() => User, { eager: false, nullable: false })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedat: Date;
}
