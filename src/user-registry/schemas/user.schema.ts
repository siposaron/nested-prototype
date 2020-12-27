import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiHideProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Document } from "mongoose";
import { Exclude, Expose, Transform } from "class-transformer";
import { IsOptional } from "class-validator";
import { Role } from "../auth/constants/user-info";

class BaseDocument {
  @ApiProperty({ name: "id" })
  @Expose({ name: "id" })
  @Transform((value) => value && value.toString())
  @IsOptional()
  @Prop()
  _id: string;

  @ApiHideProperty()
  @Exclude()
  @Prop()
  __v: number;
}

@Schema()
export class User extends BaseDocument {
  constructor(partial: Partial<User> = {}) {
    super();
    Object.assign(this, partial);
  }

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    type: Role,
    enum: [Role.Admin, Role.Manager]
  })
  roles: string[];

  @ApiHideProperty()
  @Exclude()
  @Prop(Date)
  createdOn: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;

export const UserFeature = {
  name: User.name,
  useFactory: () => {
    const schema = UserSchema;
    schema.pre<UserDocument>("save", function () {
      if (this.isNew) {
        this.createdOn = new Date();
      }
      // TODO: bcrypt password
    });
    return schema;
  }
};
