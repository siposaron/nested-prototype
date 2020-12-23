import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationFeature } from './schemas/location.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([ 
    LocationFeature
  ])],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
