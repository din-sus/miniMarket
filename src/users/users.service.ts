import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  async login(createUserDto: LoginUserDto) {
    try {
      let check = await this.userRepository.findOne({where: {login: createUserDto.login, password: createUserDto.password}})

      if(!check) {
        return {
          success: false,
          message: 'Please register❗'
        }
      }else{
        let access_token = sign({login: createUserDto.login}, 'secret_key')
        let refresh_token = sign({login: createUserDto.login}, 'secret_key', {expiresIn: 100})

        return {
          success: true,
          message: 'You have logined successfully✅',
          token: refresh_token
        }

      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async register(createUserDto: RegisterUserDto) {
    try {
      let check = await this.userRepository.findOne({where: {login: createUserDto.login, password: createUserDto.password}})

      if(check) {
        return {
          success: false,
          message: 'You registered before❗'
        }
      }else {
        const user = this.userRepository.create(createUserDto)
        await this.userRepository.save(user)

        return {
          success: true,
          message: 'You have registered successfully✅'
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findAll() {
    return await this.userRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}