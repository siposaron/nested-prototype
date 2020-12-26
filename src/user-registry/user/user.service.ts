import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "../schemas/user.schema";
import { UserInfo } from "../auth/constants/user-info";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    const createdUser = await user.save();
    if (createdUser) {
      return new User(createdUser.toJSON());
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    if (users) {
      return users.map((user) => new User(user.toJSON()));
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (user) {
      return new User(user.toJSON());
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (user) {
      return new User(user.toJSON());
    }
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async findByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User> {
    const user = await this.userModel.findOne({ username, password }).exec();
    if (user) {
      return new User(user.toJSON());
    }
  }
}
