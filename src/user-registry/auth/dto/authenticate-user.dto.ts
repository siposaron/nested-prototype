import { IsNotEmpty, IsString } from "class-validator";

export class AuthenticateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
