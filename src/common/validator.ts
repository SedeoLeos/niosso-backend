import { BadRequestException, Injectable } from "@nestjs/common";
import { I18nContext, I18nService } from 'nestjs-i18n';
import { DataSource } from "typeorm";

export abstract class Validator<T> {
    listRegister = [];
    constructor(private i18nService: I18nService, private datasource: DataSource) {
    }

    async validate(body: T, primary?: { dtoField: string, value: any }) {
        await this.register(body, primary);
        await this.dtoValidate(body)
    }
    abstract register(body: T, primary?: { dtoField: string, value: any }): Promise<void>


    async dtoValidate(body: any) {

        console.log(body)
        const result = await this.i18nService.validate(body)
        console.log(result)
        if (result.length > 0) {
            throw new BadRequestException({ errors: result });
        }

    }


}

/*******
 * @class ValidatorExtend fixe in Dto for to
 * before to validate regirtrer your  factory dto 
 * in register @method register<T>(body: @param T,@param name: string, @param primary?: { dtoField: string, value: any })
 * make synthaxe dto.validate();
 * ******/
export class ValidatorRessource {

    errors= new ResultError();
    constructor(private readonly lang: I18nContext) {
        
    }

    validate() {
        const errors =this.errors
        if (Object.values(errors).length > 0) {
            throw new BadRequestException({ errors, statusCode: 400, })
        }

    }
    async register<T>(body: T, name?: string, primary?: { dtoField: string, value: any }) {
        if (primary) {
            const { dtoField, value } = primary;
            body[dtoField] = value;
        }
        await this.dtoValidate(body, name);

    }

    protected async dtoValidate<T>(body: T, name?: string) {
        const error = new FidBack();
        const _name = name ?? body.constructor.name
        const result = await this.lang.validate(body)
        if (result.length > 0) {
            const constraints = result.map((data) => {
                error.errors_details[data.property] = Object.values(data.constraints)
                error.errors_list.push(...Object.values(data.constraints))
                return { [data.property]: Object.values(data.constraints) }
            })
            this.errors[_name] = error

        }
    }


}


export class ResultError {
    [x: string]: FidBack;
}
export class FidBack {
    errors_details:ErrorDetail
    errors_list: string[];
    constructor() {
        this.errors_details = new ErrorDetail()
        this.errors_list=[]
    }

}
export class ErrorDetail{
    [proporty: string]: string[];
}
