import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { sign } from 'jsonwebtoken';
import { User } from "src/user/entities/user.entity";
import { CommonDataEntity } from "src/common/utils";

@Entity('refresh')
export class Refresh  extends CommonDataEntity {

  @Column()
  userAgent: string;

  @Column()
  reseted: boolean = false;

  @ManyToOne(() => User, (user) => user.refreshToken)
  user: User;


  public get sign(): string {
    if (this.reseted) {
      return sign({ id: this.id, userAgent: this.userAgent, reseted: this.reseted }, process.env.RESET_SECRET, { expiresIn: '2h' });
    }
    return sign({ id: this.id, userAgent: this.userAgent, reseted: this.reseted }, process.env.REFRESH_SECRET, { expiresIn: '30d' });
  }

}
