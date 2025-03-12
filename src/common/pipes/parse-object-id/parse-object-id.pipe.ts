import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(value: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`Invalid MongoDB ObjectId: ${value}`);
    }
    return new Types.ObjectId(value);
  }
}
