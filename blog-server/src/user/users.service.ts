import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { time } from 'console';
import { Model, ObjectId } from 'mongoose';
import { threadId } from 'worker_threads';
import { AddBookmarkDto } from './dto/add-bookmark.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersModel.find().exec();
  }

  async findOne(id: ObjectId): Promise<User> {
    return await this.usersModel.findById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.usersModel(createUserDto);
    return await createUser.save();
  }

  async addBookMark(id: ObjectId, addBookmarkDto: AddBookmarkDto) {
    const entityPromise = await this.usersModel.findById(id);
    const { bookmarks } = await entityPromise;
    bookmarks.push(addBookmarkDto.article);
    return await this.usersModel.updateOne({ _id: id }, { bookmarks });
  }

  async delete(id: ObjectId) {
    return await this.usersModel.deleteOne({ _id: id }).exec();
  }
}
