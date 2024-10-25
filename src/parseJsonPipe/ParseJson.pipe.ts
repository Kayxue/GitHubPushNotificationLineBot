import { BadRequestException,ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseJsonPipe implements PipeTransform {
  public transform(value: any, metadata: ArgumentMetadata) {
    try{
      return JSON.parse(value);
    }catch(e){
      throw new BadRequestException("The body is not a valid json")
    }
  }
}
