import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";

class AddressDto {
  
  @IsString()
  @IsNotEmpty()
  readonly addressLine1: string;
  
  @ApiPropertyOptional()
  @Type(() => String)
  readonly addressLine2: string;
  
  @ApiPropertyOptional()
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
  
  @ApiPropertyOptional()
  @Type(() => String)
  readonly type: string;
  
  @ApiPropertyOptional()
  @Type(() => String)
  readonly servicesOffered: string;

  @ApiPropertyOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  readonly address: AddressDto;

  @ApiPropertyOptional()
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  readonly contacts: ContactDto[];

  @Type(() => String)
  readonly owner: string;
}
