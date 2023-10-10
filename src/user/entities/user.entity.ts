import {
    Column,
    OneToMany,
} from 'typeorm';
import { Entity } from 'typeorm';
import { CommonDataEntity, SystemRole } from 'src/common/utils';
import { Refresh } from 'src/refresh/entities/refresh.entity';
import { Annonce } from 'src/annonces/entities/annonce.entity';
class Profile {
    @Column({ nullable: true, })
    firstName?: string;

    @Column({ nullable: true, })
    lastName?: string;

    @Column({ default: '' })
    phone: string;

    @Column({ default: '' })
    image: string;
}

@Entity('user')
export class User extends CommonDataEntity {

    @Column()
    email: string;

    @Column(() => Profile, { prefix: false, })
    profile: Profile;

    @Column({ default: '' })
    password: string;


    @Column({ default: false, type: 'boolean' })
    active: boolean;

    @Column({ type: 'enum', enum: SystemRole, default: SystemRole.USER })
    role: SystemRole;

    @OneToMany(() => Refresh, (refresh) => refresh.user)
    refreshToken: Refresh[];

    @OneToMany(()=>Annonce, (annonce)=>annonce.user)
    annonce:Annonce;

}

