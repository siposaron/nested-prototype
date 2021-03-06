import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from './location/location.module';
import { UserRegistryModule } from './user-registry/user-registry.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/nested'),
    LocationModule, 
    UserRegistryModule]
})
export class AppModule {}
