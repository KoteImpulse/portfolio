import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  COLLAGEPIC = 'collagePic',
  CARDPIC = 'cardPic',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(name: string) {
    try {
      const dirPath = path.resolve(__dirname, '..', 'static', name);
      if (fs.existsSync(dirPath)) {
        fs.unlinkSync(dirPath);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
