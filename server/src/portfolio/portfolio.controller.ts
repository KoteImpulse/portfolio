import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Query,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtRefreshTokenGuard } from 'src/auth/guards/jwtRefresh.guard';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwtAccess.guard';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';
import Permissions from 'src/user/permissions';
import PermissionGuard from 'src/auth/guards/permission.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import Roles from 'src/user/Roles';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolioWork')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @UseGuards(PermissionGuard(Permissions.CREATEWORK))
  @UseGuards(RoleGuard(Roles.ADMIN))
  @UseGuards(JwtAccessTokenGuard)
  @UseGuards(JwtRefreshTokenGuard)
  @Post('createWork')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'collagePic', maxCount: 1 },
      { name: 'cardPic', maxCount: 1 },
    ]),
  )
  createWork(
    @UploadedFiles()
    files: {
      collagePic?: Express.Multer.File[];
      cardPic?: Express.Multer.File[];
    },
    @Body() createPortfolioDto: CreatePortfolioDto,
    @UserDecorator() user: Omit<User, 'password' | 'email'>,
  ) {
    const { collagePic, cardPic } = files;
    return this.portfolioService.createWork(
      createPortfolioDto,
      collagePic[0],
      cardPic[0],
      user,
    );
  }

  @Get('works')
  findAllWorks(
    @Query()
    query: {
      sortBy?: 'ASC' | 'DESC';
      take?: number;
      workId?: number;
      category?: string[];
      workPageId?: number;
    },
  ) {
    return this.portfolioService.findAllWorks(
      query.sortBy,
      query.take,
      query.workId,
      query.category,
      query.workPageId
    );
  }

  @Get('works/:id')
  findOneWork(@Param('id') id: number) {
    return this.portfolioService.findOneWork(id);
  }

  @UseGuards(PermissionGuard(Permissions.UPDATEWORK))
  @UseGuards(RoleGuard(Roles.ADMIN))
  @UseGuards(JwtAccessTokenGuard)
  @UseGuards(JwtRefreshTokenGuard)
  @Patch('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'collagePic', maxCount: 1 },
      { name: 'cardPic', maxCount: 1 },
    ]),
  )
  updateByAdmin(
    @UploadedFiles()
    files: {
      collagePic?: Express.Multer.File[];
      cardPic?: Express.Multer.File[];
    },
    @UserDecorator() user: Omit<User, 'password' | 'email'>,
    @Param('id') id: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    const { collagePic, cardPic } = files;
    return this.portfolioService.updateByAdmin(
      id,
      user,
      updatePortfolioDto,
      collagePic && collagePic[0],
      cardPic && cardPic[0],
    );
  }

  @UseGuards(PermissionGuard(Permissions.DELETEWORK))
  @UseGuards(RoleGuard(Roles.ADMIN))
  @UseGuards(JwtAccessTokenGuard)
  @UseGuards(JwtRefreshTokenGuard)
  @Delete('delete/:id')
  removeByAdmin(
    @UserDecorator() user: Omit<User, 'password' | 'email'>,
    @Param('id') id: number,
  ) {
    return this.portfolioService.removeByAdmin(id, user);
  }
}
