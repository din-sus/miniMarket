import { Entity, PrimaryGeneratedColumn,
    ManyToOne, ManyToMany, JoinTable, Column }
    from 'typeorm';
    import { User } from 'src/users/entities/user.entity';
    import { Book } from 'src/books/entities/book.entity';
    @Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @ManyToMany(() => Book)
    @JoinTable()
    books: Book[];

    @Column()
    totalPrice: number;

    @Column({ default: 'pending' })
    status: string; // 'pending', 'completed','canceled'
}