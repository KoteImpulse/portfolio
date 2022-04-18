import { PortfolioWork } from 'src/portfolio/entities/portfolio.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Permissions from '../permissions';
import Roles from '../Roles';

@Entity('userstable')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  nickName: string;

  @Column({
    type: 'enum',
    enum: Roles,
    array: true,
    default: [Roles.GHOST],
  })
  roles: Roles[];

  @Column({
    type: 'enum',
    enum: Permissions,
    array: true,
    default: [],
  })
  permissions: Permissions[];

  @OneToMany(() => PortfolioWork, (portfolioWork) => portfolioWork.user)
  work: PortfolioWork[];

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedat: Date;
}
