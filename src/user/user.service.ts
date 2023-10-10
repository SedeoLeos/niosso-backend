import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto) {
    console.log(userDto);
    const user = this.userRepository.create({ ...userDto, profile: userDto });
    let message = { contenu: '', objet: '' };
    const salt = await bcrypt.genSalt();
    console.log(user);
    user.password = await bcrypt.hash(user.password, salt);
    const _user = await this.userRepository.save(user);

    return _user;
  }

  async updatePassword(user: User) {
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  // async setImage(user: User, id: number, image: ImageDto) {
  //   const photo = await this.s3Service.uploadFile(image.image, {
  //     type: 'image',
  //     user: user.email,
  //   });
  //   user = await this.userRepository.save({
  //     id: user.id,
  //     profile: { image: photo },
  //   });
  //   const { firstName, lastName, phone, ...prof } = user.profile;
  //   return { ...user, profile: prof };
  // }
  async findOneBy(findOptons: FindOptionsWhere<User>) {
    return this.userRepository.findOneBy(findOptons);
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.save({
      id: id,
      ...updateUserDto,
      profile: { ...updateUserDto },
    });
    return user;
  }

}
