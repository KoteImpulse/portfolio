import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService, FileType } from 'src/file/file.service';
import { User } from 'src/user/entities/user.entity';
import Roles from 'src/user/Roles';
import Permissions from 'src/user/permissions';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { categoryArray, PortfolioWork } from './entities/portfolio.entity';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioWork)
    private portfolioWorkRepository: Repository<PortfolioWork>,
    private fileService: FileService,
  ) {}

  async createWork(
    createPortfolioDto: CreatePortfolioDto,
    collagePic,
    cardPic,
    user: Omit<User, 'password' | 'email'>,
  ): Promise<PortfolioWork> {
    try {
      const collagePicPath = this.fileService.createFile(
        FileType.COLLAGEPIC,
        collagePic,
      );
      const cardPicturePath = this.fileService.createFile(
        FileType.CARDPIC,
        cardPic,
      );
      await this.validateDTO(createPortfolioDto);

      const portfolioWork = await this.portfolioWorkRepository.create({
        brand: createPortfolioDto.brand.trim(),
        tagline: createPortfolioDto.tagline.trim(),
        description: createPortfolioDto.description.trim(),
        maincategory: createPortfolioDto.maincategory.trim().toLowerCase(),
        category: createPortfolioDto.category.map((item) =>
          item.trim().toLowerCase(),
        ),
        link: createPortfolioDto.link.trim(),
        task: createPortfolioDto.task.trim(),
        result: createPortfolioDto.result.trim(),
        collagePic: collagePicPath,
        cardPic: cardPicturePath,
        user: { id: user.id },
      });
      await this.portfolioWorkRepository.save(portfolioWork);
      return portfolioWork;
    } catch (e) {
      console.log(e);
    }
  }

  async findAllWorks(
    sortBy?: 'ASC' | 'DESC',
    take?: number,
    workId?: number,
    category?: string[],
    workPageId?: number,
  ): Promise<{ works: PortfolioWork[]; left: number }> {
    if (category && !categoryArray.includes(category[0])) {
      throw new NotFoundException('Такой категории не существует');
    }
    try {
      const qb = this.portfolioWorkRepository.createQueryBuilder('workstable');
      if (workId) {
        qb.where('workstable.id < :workId', { workId });
      }
      if (workPageId) {
        qb.andWhere('workstable.id != :workPageId', { workPageId });
      }
      if (category && !category.includes('all')) {
        qb.andWhere('workstable.category @> :category', { category });
      }

      qb.orderBy('workstable.createdat', sortBy || 'DESC');
      qb.select(['workstable']);
      if (take) {
        qb.take(take);
      }
      const [works, left] = await qb.getManyAndCount();
      return { works, left };
    } catch (e) {
      throw new NotFoundException(
        'Работ по такой тематике пока нет, попробуйте написать менеджеру',
      );
    }
  }

  async findOneWork(workId: number): Promise<PortfolioWork> {
    try {
      const qb = this.portfolioWorkRepository.createQueryBuilder('workstable');
      if (workId) {
        qb.where('workstable.id = :workId', { workId });
      }
      qb.select(['workstable']);
      const work = await qb.getOne();
      if (!work) {
        throw new NotFoundException(
          'Робот по такой тематике пока нет, попробуйте написать менеджеру',
        );
      }
      return work;
    } catch (e) {
      throw new NotFoundException(
        'Робот по такой тематике пока нет, попробуйте написать менеджеру',
      );
    }
  }

  async removeByAdmin(
    id: number,
    user: Omit<User, 'password' | 'email'>,
  ): Promise<DeleteResult> {
    try {
      const work = await this.findOneWork(id);
      if (!work) {
        throw new HttpException(
          'Мы еще не успели ничего написать по этой тематике',
          HttpStatus.NOT_FOUND,
        );
      }
      if (
        user.roles.includes(Roles.ADMIN || Roles.MODERATOR) &&
        user.permissions.includes(Permissions.DELETEWORK)
      ) {
        this.fileService.removeFile(work.cardPic);
        this.fileService.removeFile(work.collagePic);
        const deleteResult = await this.portfolioWorkRepository.delete(id);
        return deleteResult;
      }
      throw new ForbiddenException(
        'Хм... возможно недостаточно прав. Попробуйте написать менеджеру',
      );
    } catch (e) {
      console.log(e);
    }
  }

  async updateByAdmin(
    id: number,
    user: Omit<User, 'password' | 'email'>,
    updatePortfolioDto: UpdatePortfolioDto,
    collagePic?,
    cardPic?,
  ): Promise<DeleteResult> {
    try {
      const work = await this.findOneWork(id);
      if (!work) {
        throw new HttpException(
          'Мы еще не успели ничего написать по этой тематике',
          HttpStatus.NOT_FOUND,
        );
      }

      let collagePicPath: string;
      let cardPicturePath: string;

      if (collagePic) {
        this.fileService.removeFile(work.collagePic);
        collagePicPath = this.fileService.createFile(
          FileType.COLLAGEPIC,
          collagePic,
        );
      }
      if (cardPic) {
        this.fileService.removeFile(work.cardPic);
        cardPicturePath = this.fileService.createFile(
          FileType.CARDPIC,
          cardPic,
        );
      }

      await this.validateUpdateDTO(updatePortfolioDto);

      const updatedWork = await this.portfolioWorkRepository.update(id, {
        ...updatePortfolioDto,
        collagePic: collagePicPath || work.collagePic,
        cardPic: cardPicturePath || work.cardPic,
      });
      return updatedWork;
    } catch (e) {
      throw new ForbiddenException(
        'Хм... возможно недостаточно прав. Попробуйте написать менеджеру',
      );
    }
  }

  async validateDTO(createPortfolioDto: CreatePortfolioDto) {
    if (
      !('brand' in createPortfolioDto) ||
      !('tagline' in createPortfolioDto) ||
      !('description' in createPortfolioDto) ||
      !('maincategory' in createPortfolioDto) ||
      !('category' in createPortfolioDto) ||
      !('link' in createPortfolioDto) ||
      !('task' in createPortfolioDto) ||
      !('result' in createPortfolioDto)
    ) {
      throw new ForbiddenException('Заполните поле');
    }
    if (createPortfolioDto.brand.trim().length === 0) {
      throw new ForbiddenException('Заполните поле');
    }
    if (createPortfolioDto.tagline.trim().length === 0) {
      throw new ForbiddenException('Заполните поле');
    }
    if (createPortfolioDto.description.trim().length === 0) {
      throw new ForbiddenException('Заполните поле');
    }
    if (
      createPortfolioDto.maincategory.trim().indexOf(' ') > 0 ||
      !categoryArray.includes(
        createPortfolioDto.maincategory.trim().toLowerCase(),
      )
    ) {
      throw new ForbiddenException('уберите все пробелы из maincategory');
    }
    if (
      createPortfolioDto.category.length === 0 ||
      createPortfolioDto.category.forEach((item) => {
        if (
          item.trim().length === 0 ||
          item.trim().indexOf(' ') > 0 ||
          !categoryArray.includes(item.trim().toLowerCase())
        ) {
          throw new ForbiddenException('уберите все пробелы из maincategory');
        }
      })
    ) {
      throw new ForbiddenException('уберите все пробелы из maincategory');
    }
    if (
      createPortfolioDto.link.trim().length === 0 ||
      createPortfolioDto.link.trim().indexOf(' ') > 0
    ) {
      throw new ForbiddenException('уберите все пробелы из link');
    }
    if (createPortfolioDto.task.trim().length === 0) {
      throw new ForbiddenException('заполните task');
    }
    if (createPortfolioDto.result.trim().length === 0) {
      throw new ForbiddenException('заполните result');
    }
  }

  async validateUpdateDTO(dto: UpdatePortfolioDto) {
    if (dto.brand) {
      if (dto.brand.trim().length === 0) {
        throw new ForbiddenException('заполните');
      }
    }
    if (dto.tagline) {
      if (dto.tagline.trim().length === 0) {
        throw new ForbiddenException('заполните');
      }
    }
    if (dto.description) {
      if (dto.description.trim().length === 0) {
        throw new ForbiddenException('заполните');
      }
    }
    if (dto.maincategory) {
      if (
        dto.maincategory.trim().indexOf(' ') > 0 ||
        !categoryArray.includes(dto.maincategory.trim().toLowerCase())
      ) {
        throw new ForbiddenException('уберите все пробелы из maincategory');
      }
    }
    if (dto.category) {
      if (
        dto.category.length === 0 ||
        dto.category.forEach((item) => {
          if (
            item.trim().length === 0 ||
            item.trim().indexOf(' ') > 0 ||
            !categoryArray.includes(item.trim().toLowerCase())
          ) {
            throw new ForbiddenException('уберите все пробелы из category');
          }
        })
      ) {
        throw new ForbiddenException('уберите все пробелы из category');
      }
    }
    if (dto.link) {
      if (dto.link.trim().length === 0 || dto.link.trim().indexOf(' ') > 0) {
        throw new ForbiddenException('уберите все пробелы из link');
      }
    }
    if (dto.task) {
      if (dto.task.trim().length === 0) {
        throw new ForbiddenException('заполните task');
      }
    }
    if (dto.result) {
      if (dto.result.trim().length === 0) {
        throw new ForbiddenException('заполните result');
      }
    }
  }
}
