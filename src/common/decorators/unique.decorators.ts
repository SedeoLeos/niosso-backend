import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
  
  @Injectable()
  @ValidatorConstraint({ name: 'Unique', async: true })
  export class UniqueConstraintTypeOrm implements ValidatorConstraintInterface {
    constructor(private dataSource: DataSource) {
     }
  
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
      let [model, uniqueField, primary] = args.constraints;
      let dbField = null, dtoField = null
      if (primary) {
        dbField = primary.dbField as string
        dtoField = primary.dtoField as string
      }
      
      const object = args.object;
      if (!value || !model) return false;
  
      const where = {};
  
      if (value && uniqueField) {
        where[uniqueField] = value
      }
      if (!dtoField) {
        dtoField = dbField;
      }
      if (dbField && dtoField) {
        where[dbField] = {
          not: object[dtoField]
        }
  
      }
      try {
         if (!this.dataSource.getRepository(model)) {
           return false;
        }
        if (Object.keys(where).length < 1) {
          
          return false;
        }
        
        const result = await this.dataSource.getRepository(model as string).findOne({
          where: where
        })
        if(result==null){
          return true;
        }
        return !result
      } catch (e) {
        console.log("+++++++++++",e)
  
        return false;
      }
    }
  
    defaultMessage(args: ValidationArguments) {
      const [model, property = 'id', exceptField = null] = args.constraints;
      return ` this ${args.property} exist in table ${model}`;
    }
  }
  
  export function IsUniqueTypeOrma(
    model: string,
    uniqueField: string,
    primary?: { dbField: string, dtoField?: string },
    validationOptions?: ValidationOptions,
  ) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [model, uniqueField, primary],
        validator: UniqueConstraintTypeOrm,
      });
    };
  }
  