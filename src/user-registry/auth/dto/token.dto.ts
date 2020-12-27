import { IsNotEmpty, IsString } from "class-validator";

export class TokenDto {
    @IsString()
    @IsNotEmpty()
    readonly access_token: string;
}
