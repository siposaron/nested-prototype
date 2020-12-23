import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    readonly addressLine1: string;
    readonly addressLine2: string;
    readonly zip: string;
    @IsString()
    @IsNotEmpty()
    readonly country: string;
}

export class ContactDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    @IsNotEmpty()
    readonly phone: string;
    @IsEmail()
    readonly email: string;
}

export class CreateLocationDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    readonly type: string;
    readonly servicesOffered: string;
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    readonly address: AddressDto;
    @ValidateNested({ each: true })
    @Type(() => ContactDto)
    readonly contacts: ContactDto[];
}


