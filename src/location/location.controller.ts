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
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse } from "@nestjs/swagger";
import { LocationService } from "./location.service";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { Roles } from "src/user-registry/auth/decorators/roles.decorator";
import { Role } from "src/user-registry/auth/constants/user-info";
import { AuthUserInfo } from "src/user-registry/auth/decorators/user-info.decorator";

@Controller("api/locations")
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiForbiddenResponse({ description: "Forbidden. Token is invalid." })
  @ApiBadRequestResponse({ description: "Bad request" })
  @Roles(Role.Admin, Role.Manager)
  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return await this.locationService.create(createLocationDto);
  }

  @ApiForbiddenResponse({ description: "Forbidden. Token is invalid." })
  @Roles(Role.Admin, Role.Manager)
  @Get()
  async findAll(@AuthUserInfo() userInfo) {
    if (userInfo.hasRole(Role.Admin)) {
      return await this.locationService.findAll();
    } else {
      return await this.locationService.findForOwner(userInfo);
    }
  }

  @ApiForbiddenResponse({ description: "Forbidden. Token is invalid." })
  @Roles(Role.Admin, Role.Manager)
  @Get(":id")
  async findOne(@AuthUserInfo() userInfo, @Param("id") id: string) {
    if (userInfo.hasRole(Role.Admin)) {
      return await this.locationService.findOne(id);
    } else {
      return await this.locationService.findOneForOwner(id, userInfo);
    }
  }

  @ApiForbiddenResponse({ description: "Forbidden. Token is invalid." })
  @ApiBadRequestResponse({ description: "Bad request" })
  @Roles(Role.Admin, Role.Manager)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return await this.locationService.update(id, updateLocationDto);
  }

  @ApiForbiddenResponse({ description: "Forbidden. Token is invalid." })
  @Roles(Role.Admin)
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.locationService.remove(id);
  }
}
