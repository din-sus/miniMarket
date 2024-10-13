import { Entity, PrimaryGeneratedColumn,ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;
    user_id: number
    @ManyToOne(() => User, (user) =>
        user.cart)
        user: User;
    @ManyToMany(() => Book)
    @JoinTable()
        books: Book[];
}
        