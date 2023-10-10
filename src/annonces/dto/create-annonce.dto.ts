import { IsNotEmpty, IsNumberString, IsString } from "class-validator"
import { i18nValidationMessage } from "nestjs-i18n"

export class CreateAnnonceDto {
    @IsString({message:i18nValidationMessage('validation.IsString')})
    @IsNotEmpty()
    describe:string;
    @IsString({message:i18nValidationMessage('validation.IsString')})
    @IsNotEmpty()
    title:string;
    @IsNumberString({},{message:i18nValidationMessage('validation.IsNumberString')})
    @IsNotEmpty()
    price:number;
    @IsString({message:i18nValidationMessage('validation.IsString')})
    @IsNotEmpty()
    device:string
    @IsNotEmpty()
    images:any

    static fatory(data:Partial<CreateAnnonceDto>): CreateAnnonceDto{
        const annonce = new CreateAnnonceDto();
        if(data){
            annonce.describe = data.describe;
            annonce.title = data.title;
            annonce.price = data.price;
            annonce.device = data.device;
            annonce.images = data.images;
        }
        return 
    }
}
