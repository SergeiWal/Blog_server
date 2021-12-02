import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag, TagDocument } from './tags.schema';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagsModel: Model<TagDocument>) {}

  async findAll(): Promise<Tag[]> {
    return await this.tagsModel.find();
  }

  async create(tagDto: CreateTagDto) {
    const createTag = new this.tagsModel(tagDto);
    return await createTag.save();
  }
}
