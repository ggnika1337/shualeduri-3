import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll(query: any, ageFrom?: string, ageTo?: string) {
    const filter = { ...query };

    delete filter.ageFrom;
    delete filter.ageTo;

    if (ageFrom || ageTo) {
      filter.age = {};

      if (ageFrom) filter.age.$gte = Number(ageFrom);
      if (ageTo) filter.age.$lte = Number(ageTo);
    }

    return this.userModel.find(filter);
  }

  async getTotalUsers() {
    const users = await this.userModel.find();
    return 'total users amount: ' + users.length;
  }

  findOne(id: number) {
    return this.userModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id);
  }
}
