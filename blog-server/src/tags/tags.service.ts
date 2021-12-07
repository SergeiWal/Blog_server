import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(name: string) {
    const createTag = new this.tagsModel({ name });
    return await createTag.save();
  }

  async delete(id: string) {
    const tag = this.tagsModel.findByIdAndDelete(id);
    if (!tag) {
      throw new NotFoundException();
    }
    return tag;
  }
}
