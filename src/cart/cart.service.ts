import { Injectable, Req, Res } from '@nestjs/common';
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
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  // async create(@Req() request: Request) {
  //   const {bookName} = request.body
  //   if(!bookName) {
  //     return {
  //       success: false,
  //       message: "What book do you want to add❓"
  //     }
  //   }

  //   const token: any = request.headers.token
  //   const {id}: any = verify(token, 'secret_key')
  //   const user = await this.userRepository.findOne({where: {id: id}})
  //   const bookFind = await this.bookRepository.findOne({where: {title: bookName}})

  //   if(!bookFind) {
  //     return {
  //       success: false,
  //       message: 'There is no such book💔'
  //     }
  //   }
  //   const cart = this.cartRepository.create()
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
    const { bookName } = request.body;

    if (!bookName) {
      return {
        success: false,
        message: 'What book do you want to add❓',
      };
    }
    const userdata: User = request['user'];
    console.log(userdata);

    // const token: any = request.headers.token;

    try {
      // const { id }: any = verify(token, 'secret_key');
      const user = await this.userRepository.findOne({
        where: { id: userdata.id },
      });

      if (!user) {
        return {
          success: false,
          message: 'User not found🚫',
        };
      }

      const bookFind = await this.bookRepository.findOne({
        where: { title: bookName },
      });
      console.log(bookFind);

      if (!bookFind) {
        return {
          success: false,
          message: 'There is no such book💔',
        };
      }

      const cart = this.cartRepository.create();
      cart.user = user;
      // cart.user_id = id;
      cart.books = [bookFind];

      response.send({
        success: true,
        message: 'Added✅',
        data: cart,
      });

      await this.cartRepository.save(cart);
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred: ' + error.message,
      };
    }
  }

  async findAll() {
    const a = await this.cartRepository.find();
    console.log(a);
    return a;
  }

  async findOne(@Req() request: Request) {
    const token: any = request.headers.token;
    const { id }: any = verify(token, 'secret_key');
    const user = request['user'];

    const cart = await this.cartRepository.findOne({ where: { user: user } });
    console.log(cart);

    if (!cart) {
      return {
        success: false,
        message: 'Emty cart',
      };
    } else {
      return {
        success: true,
        data: cart,
      };
    }
  }

  update(updateCartDto: UpdateCartDto) {}

  async remove(@Req() request: Request) {
    const token: any = request.headers.token;

    const { login }: any = verify(token, 'secret_key');

    const check = await this.cartRepository.findOne({ where: { user: login } });

    const d = await this.cartRepository.delete(check);

    return {
      success: true,
      message: 'Deconsted✅',
    };
  }
}
