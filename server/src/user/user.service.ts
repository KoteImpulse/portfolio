import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        email: createUserDto.email,
        password: createUserDto.password,
        nickName: createUserDto.nickName,
      });
      const userForSave = await this.userRepository.save(user);
      return userForSave;
    } catch (e) {
      console.log(e);
    }
  }

  async findCandidate(email: string): Promise<User> {
    try {
      const qb = this.userRepository.createQueryBuilder('user');
      qb.where(`user.email = :email`, { email });
      qb.select(['user.id', 'user.nickName']);
      const user = await qb.getOne();
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async findForValidation(email: string): Promise<User> {
    try {
      const qb = this.userRepository.createQueryBuilder('user');
      qb.where(`user.email = :email`, { email });
      qb.select(['user']);
      const user = await qb.getOne();
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async findForValidationAccessToken(id: number): Promise<User> {
    try {
      const qb = await this.userRepository.createQueryBuilder('user');
      qb.whereInIds(id);
      qb.select(['user']);
      const user = await qb.getOne();
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async findForValidationRefreshToken(id: number): Promise<User> {
    try {
      const qb = await this.userRepository.createQueryBuilder('user');
      qb.whereInIds(id);
      qb.select(['user']);
      const user = await qb.getOne();
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}
