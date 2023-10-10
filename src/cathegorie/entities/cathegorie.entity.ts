import { Annonce } from 'src/annonces/entities/annonce.entity';
import { CommonDataEntity } from 'src/common/utils';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('categorie')
export class Categorie extends CommonDataEntity {
  @Column()
  name: string;
  @OneToMany(() => Annonce, (annonce) => annonce.categorie)
  annonces: Annonce[];
}
