import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Request, Response, response } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  create(@Req() request: Request, @Res() response: Response) {
    return this.cartService.create(request, response);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get('my/cart')
  findOne(@Req() request: Request) {
    return this.cartService.findOne(request)
  }

  @Patch(':id')
  update(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(updateCartDto);
  }

  @Delete('remove')
  remove(@Req() request: Request) {
    return this.cartService.remove(request);
  }
}
