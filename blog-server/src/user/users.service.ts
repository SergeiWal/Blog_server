import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  findAll() {
    return this.usersModel.find().populate('bookmarks');
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

  async findOneByUsernameWithPassword(name: string) {
    const user: User = await this.usersModel
      .findOne({ name })
      .select(['name', 'password']);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.usersModel(createUserDto);
    const salt = await bcrypt.genSalt();
    createUser.password = await bcrypt.hash(createUserDto.password, salt);
    createUser.roles.push(Role.USER);
    createUser.activate = true;
    return await createUser.save();
  }

  setAdminRole(id: string) {
    return this.usersModel.updateOne({ _id: id }, { role: [Role.ADMIN] });
  }

  async setUnsetActivate(id: string) {
    const user = await this.usersModel.findById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return await this.usersModel.updateOne(
      { _id: id },
      { activate: !user.activate },
    );
  }

  async delete(id: string): Promise<User> {
    const user: User = await this.usersModel.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
