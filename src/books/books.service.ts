import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const check = await this.bookRepository.findOne({
        where: { title: createBookDto.title },
      });
      console.log(check);

      if (check) {
        return {
          success: false,
          message: 'This book already exists💔',
        };
      } else {
        const books = this.bookRepository.create(createBookDto);
        const saveBook = await this.bookRepository.save(books);

        return {
          success: true,
          message: 'Book has been created successfully✅',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) {
      return {
        success: false,
        message: 'There is no book like this❗',
      };
    } else {
      return {
        success: true,
        data: book,
      };
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const check = await this.bookRepository.findOne({ where: { id } });

      if (!check) {
        return {
          success: false,
          message: 'There is no book',
        };
      } else {
        const userData = this.bookRepository.merge(check, updateBookDto);
        const save = await this.bookRepository.save(userData);

        return {
          success: true,
          message: 'Updated successfully✅',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async remove(id: number) {
    const check = await this.bookRepository.findOne({ where: { id } });

    if (!check) {
      return {
        success: false,
        message: 'No book to delete❗',
      };
    } else {
      await this.bookRepository.delete(id);

      return {
        success: true,
        message: 'Deleted successfully✅',
      };
    }
  }
}
