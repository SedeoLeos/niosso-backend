import { CommonDataEntity } from "src/common/utils";
import { Entity, Column, ManyToOne } from "typeorm";
import { Annonce } from './../../annonces/entities/annonce.entity';

@Entity('image_annonce')
export class ImageAnnonce  extends CommonDataEntity{
    @Column()
    name: string;

    @Column()
    url:string

    @Column()
    cotentType:string

    @ManyToOne(()=>Annonce, (annonce)=>annonce.images)
    annonce:Annonce
}
