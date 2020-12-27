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
import { LocationService } from "./location.service";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { Roles } from "src/user-registry/auth/decorators/roles.decorator";
import { Role } from "src/user-registry/auth/constants/user-info";
import { AuthUserInfo } from "src/user-registry/auth/decorators/user-info.decorator";

@Controller("api/locations")
@UseInterceptors(ClassSerializerInterceptor)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Roles(Role.Admin, Role.Manager)
  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return await this.locationService.create(createLocationDto);
  }

  @Roles(Role.Admin, Role.Manager)
  @Get()
  async findAll(@AuthUserInfo() userInfo) {
    if (userInfo.hasRole(Role.Admin)) {
      return await this.locationService.findAll();
    } else {
      return await this.locationService.findForOwner(userInfo);
    }
  }

  @Roles(Role.Admin, Role.Manager)
  @Get(":id")
  async findOne(@AuthUserInfo() userInfo, @Param("id") id: string) {
    if (userInfo.hasRole(Role.Admin)) {
      return await this.locationService.findOne(id);
    } else {
      return await this.locationService.findOneForOwner(id, userInfo);
    }
  }

  @Roles(Role.Admin, Role.Manager)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return await this.locationService.update(id, updateLocationDto);
  }

  @Roles(Role.Admin)
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.locationService.remove(id);
  }
}
