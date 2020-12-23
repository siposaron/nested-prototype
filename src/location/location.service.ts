import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location, LocationDocument } from './schemas/location.schema';

@Injectable()
export class LocationService {

  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<LocationDocument>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = new this.locationModel(createLocationDto);
    const createdLocation = await location.save();
    if (createdLocation) {
      return new Location(createdLocation.toJSON());
    }
  }

  async findAll(): Promise<Location []> {
    const locations = await this.locationModel.find().exec();
    return locations.map((location) => new Location(location.toJSON()));
  }

  async findOne(id: string): Promise<Location>  {
    const location = await this.locationModel.findOne({_id: id}).exec();
    return new Location(location.toJSON());
  }

  async update(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const location = await this.locationModel.findByIdAndUpdate(id, updateLocationDto).exec();
    return new Location(location.toJSON());
  }

  async remove(id: string): Promise<void>  {
    await this.locationModel.findByIdAndDelete(id).exec();
  }
}
