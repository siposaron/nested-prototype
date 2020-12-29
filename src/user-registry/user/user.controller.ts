import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor
} from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role, UserInfo } from "../auth/constants/user-info";
import { Public } from "../auth/decorators/public.decorator";
import { AuthUserInfo } from "../auth/decorators/user-info.decorator";

@Controller("api/users")
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ description: "User registration" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: "Forbidden. Token is invalid." })
  @Roles(Role.Admin)
  @Get()
  async findAll(@AuthUserInfo() userInfo) {
    return await this.userService.findAll();
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: "Forbidden. Token is invalid." })
  @Roles(Role.Admin, Role.Manager)
  @Get(":id")
  async findOne(@AuthUserInfo() userInfo: UserInfo, @Param("id") id: string) {
    if (userInfo.hasRole(Role.Admin) || id === userInfo.userId) {
      return this.userService.findOne(id);
    }
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: "Forbidden. Token is invalid." })
  @ApiBadRequestResponse({ description: "Bad request" })
  @Roles(Role.Admin, Role.Manager)
  @Put(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: "Forbidden. Token is invalid." })
  @Roles(Role.Admin)
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
