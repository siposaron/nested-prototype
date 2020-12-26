import { IsArray, IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";
import { Role } from "../../auth/constants/user-info";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,64}$/)
    readonly password: string;
    @IsEnum(Role, { each: true })
    @IsArray()
    readonly roles: Role[];
}
