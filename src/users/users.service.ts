import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async onModuleInit() {
    const productCount = await this.userModel.countDocuments();

    if (productCount === 0) {
      const dataToInsert: any[] = [];
      for (let i = 0; i < 150_000; i++) {
        dataToInsert.push({
          name: faker.person.fullName(),
          age: Math.floor(Math.random() * 100) + 1,
          gender: faker.person.gender(),
        });
      }

      await this.userModel.insertMany(dataToInsert);
      console.log('Seeding complete.');
    }
  }

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

    return this.userModel.find(filter).skip(0).limit(30);
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
