import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";

class AddressDto {
  @IsString()
  @IsNotEmpty()
  readonly addressLine1: string;
  @Type(() => String)
  readonly addressLine2: string;
  @Type(() => String)
  readonly zip: string;
  @IsString()
  @IsNotEmpty()
  readonly country: string;
}

class ContactDto {
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
  @Type(() => String)
  readonly type: string;
  @Type(() => String)
  readonly servicesOffered: string;
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  readonly address: AddressDto;
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  readonly contacts: ContactDto[];
  @Type(() => String)
  readonly owner: string;
}
