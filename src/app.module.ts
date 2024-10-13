import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VerifyToken } from './middleware/verifyToken';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0490',
      database: 'najot',
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule,
    BooksModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forFeature([User])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyToken)
      .forRoutes({path: '/books/admin/*', method: RequestMethod.ALL}, {path: '/', method: RequestMethod.ALL}, {path: '/cart/*', method: RequestMethod.ALL})
  }
}
