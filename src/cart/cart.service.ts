import { Injectable, Req, Res } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private readonly cartRepository: Repository<Cart>, @InjectRepository(User) private readonly userRepository: Repository<User>,
  @InjectRepository(Book) private readonly bookRepository: Repository<Book>,){}
  
  // async create(@Req() request: Request) {
  //   let {bookName} = request.body
  //   if(!bookName) {
  //     return {
  //       success: false,
  //       message: "What book do you want to add❓"
  //     }
  //   }
    
  //   let token: any = request.headers.token
  //   let {id}: any = verify(token, 'secret_key')
  //   let user = await this.userRepository.findOne({where: {id: id}})
  //   let bookFind = await this.bookRepository.findOne({where: {title: bookName}})
    
  //   if(!bookFind) {
  //     return {
  //       success: false,
  //       message: 'There is no such book💔'
  //     }
  //   }
  //   let cart = this.cartRepository.create()
  //   cart.user = user
  //   cart.user_id = id
  //   cart.books = [bookFind]
    
  //   await this.cartRepository.save(cart)
  //   return {
  //     success: true,
  //     message: 'Added✅',
  //     data: cart
  //   }
  // }

  async create(@Req() request: Request, @Res() response: Response) {
    let { bookName } = request.body;
    
    if (!bookName) {
      return {
        success: false,
        message: "What book do you want to add❓",
      };
    }
  
    let token: any = request.headers.token;
  
    try {
      let { id }: any = verify(token, 'secret_key');
      let user = await this.userRepository.findOne({ where: { id: id } });
  
      if (!user) {
        return {
          success: false,
          message: 'User not found🚫',
        };
      }
  
      let bookFind = await this.bookRepository.findOne({ where: { title: bookName } });
  
      if (!bookFind) {
        return {
          success: false,
          message: 'There is no such book💔',
        };
      }
  
      let cart = this.cartRepository.create();
      cart.user = user;
      cart.user_id = id;
      cart.books = [bookFind];
  
      response.send({
        success: true,
        message: 'Added✅',
        data: cart,
      })

      await this.cartRepository.save(cart);
      
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred: ' + error.message,
      };
    }
  }
  

  async findAll() {
    let a = await this.cartRepository.find()
    console.log(a)
    return a
  }

  async findOne(@Req() request: Request) {
    let token:any = request.headers.token
    let {id}: any = verify(token, 'secret_key')
    let user = request['user']

    let cart = await this.cartRepository.findOne({where: {user: user}})
    console.log(cart)

    if(!cart) {
      return {
        success: false,
        message: 'Emty cart'
      }
    }else{
      return {
        success: true,
        data: cart
      }
    }
  }

  update(updateCartDto: UpdateCartDto) {
    
  }

  async remove(@Req() request: Request) {
    let token:any = request.headers.token

    let {login}: any = verify(token, 'secret_key')

    let check = await this.cartRepository.findOne({where: {user: login}})

    let d = await this.cartRepository.delete(check)

    return {
      success: true,
      message: 'Deleted✅'
    }
  }
}
