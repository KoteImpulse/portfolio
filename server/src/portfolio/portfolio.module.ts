import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioWork } from './entities/portfolio.entity';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioWork])],
  controllers: [PortfolioController],
  providers: [PortfolioService, FileService],
})
export class PortfolioModule {}
