import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddBookmarkDto } from './dto/add-bookmark.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './users.schema';
import * as mongoose from 'mongoose';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersModel.find();
  }

  async findOne(id: string) {
    const user: User = await this.usersModel.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findOneByUsername(name: string) {
    const user: User = await this.usersModel.findOne({ name });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.usersModel(createUserDto);
    createUser.role = 'USER';
    return await createUser.save();
  }

  async addBookMark(id: string, addBookmarkDto: AddBookmarkDto) {
    const { article } = addBookmarkDto;
    const { bookmarks } = await this.usersModel.findById(id);
    if (!bookmarks) {
      throw new NotFoundException();
    }
    bookmarks.push(article);
    return await this.usersModel.updateOne({ _id: id }, { bookmarks });
  }

  async delete(id: string): Promise<User> {
    const user: User = await this.usersModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
