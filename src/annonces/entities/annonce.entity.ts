
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('annonce')
export class Annonce {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()  
    first_name: string;

    @Column()  
    last_name: string;

    @Column()  
    email: string;

    @Column()  
    phone: string;

}