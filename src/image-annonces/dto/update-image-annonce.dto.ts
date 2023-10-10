import { PartialType } from '@nestjs/mapped-types';
import { CreateImageAnnonceDto } from './create-image-annonce.dto';

export class UpdateImageAnnonceDto extends PartialType(CreateImageAnnonceDto) {}
