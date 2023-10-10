import { OmitType } from "@nestjs/mapped-types";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CommonDataEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt: Date;
}
export class CommonDataEntityUuid extends OmitType(CommonDataEntity, ['id']) {
    @PrimaryGeneratedColumn('uuid')
    id: string;

}

export enum SystemRole {
    ADMIN = "admin",
    SYS = "Super admin",
    USER = 'Simple user'
}

export enum InvitationState {
    ACCEPTED = "Accepter",
    DEFAULT = "Envoyer",
    EXPIRED = "Expirer",
    REFULED = "Refuser"
}
export interface LoginRequest extends Request {
    user: User;
    // organisation: Organisation
}
