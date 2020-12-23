import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from 'mongoose';
import { Exclude, Expose, Transform } from "class-transformer";
import { IsOptional } from "class-validator";

class BaseDocument {

    @Expose({ name: 'id' })
    @Transform(value => value && value.toString())
    @IsOptional()
    @Prop()
    _id: string;

    @Exclude()
    @Prop()
    __v: number;
}

class Address {

    @Prop()
    addressLine1: string;

    @Prop()
    addressLine2: string;

    @Prop()
    zip: string;

    @Prop()
    country: string;
}

class Contact {
    @Prop()
    name: string;

    @Prop()
    phone: string;

    @Prop()
    email: string;
}

@Schema()
export class Location extends BaseDocument {

    constructor(partial: Partial<Location> = {}) {
        super();
        Object.assign(this, partial);
    }

    @Prop()
    name: string;

    @Prop()
    type: string;

    @Prop()
    servicesOffered: string;

    @Prop(Address)
    address: Address;

    @Prop([Contact])
    contacts: Contact[];

    @Exclude()
    @Prop({default: false})
    archived: boolean;

    @Exclude()
    @Prop(Date)
    createdOn: Date;

    @Transform(value => value && Number(value))
    @Prop({default: Date.now, type: SchemaTypes.Decimal128})
    timestamp: number;
}

const LocationSchema = SchemaFactory.createForClass(Location);

export type LocationDocument = Location & Document;

export const LocationFeature = { 
    name: Location.name, 
    useFactory: () => {
        const schema = LocationSchema;
        schema.pre<LocationDocument>('save', function() { 
            if (this.isNew) {
                this.createdOn = new Date();
            }
            this.timestamp = Date.now();
        });
        return schema;
    }
}