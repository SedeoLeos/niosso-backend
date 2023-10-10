import { CommonDataEntity } from 'src/common/utils';
import { ImageAnnonce } from 'src/image-annonces/entities/image-annonce.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Categorie } from 'src/cathegorie/entities/cathegorie.entity';

@Entity('annonce')
export class Annonce extends CommonDataEntity {
  @Column()
  describe: string;
  @Column()
  title: string;
  @Column()
  price: string;
  @Column()
  device: string;

  @OneToMany(() => ImageAnnonce, (images) => images.annonce)
  images: ImageAnnonce[];

  @ManyToOne(() => User, (user) => user.annonce)
  user: User;

  @ManyToOne(() => Categorie, (categorie) => categorie.annonces)
  categorie: Categorie;
}
