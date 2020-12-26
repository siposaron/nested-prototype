import { IsNotEmpty, IsString } from "class-validator";

export class AuthenticatedUserDto {
    @IsString()
    @IsNotEmpty()
    readonly id: string;
    @IsNotEmpty()
    readonly roles: string[];
}
