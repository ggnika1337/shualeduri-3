import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { QueryParamsDto } from './dto/queryParams.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async onModuleInit() {
    const userCount = await this.userModel.countDocuments();

    if (userCount === 0) {
      const dataToInsert: CreateUserDto[] = [];

      for (let i = 0; i < 150_000; i++) {
        dataToInsert.push({
          name: faker.person.fullName(),
          age: Math.floor(Math.random() * 100) + 1,
          gender: faker.person.sex(),
        });
      }

      await this.userModel.insertMany(dataToInsert);
      console.log('150k users added to db');
    }
  }

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll({
    page = 1,
    take = 10,
    ageFrom,
    ageTo,
    age,
    gender,
    name,
  }: QueryParamsDto) {
    const filter: any = {};

    if (age) {
      filter.age = Number(age);
    } else if (ageFrom || ageTo) {
      filter.age = {};

      if (ageFrom) filter.age.$gte = Number(ageFrom);
      if (ageTo) filter.age.$lte = Number(ageTo);
    }

    if (gender) {
      filter.gender = gender;
    }

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    return this.userModel
      .find(filter)
      .skip((page - 1) * take)
      .limit(Number(take));
  }
  async getTotalUsers() {
    return this.userModel.countDocuments();
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
