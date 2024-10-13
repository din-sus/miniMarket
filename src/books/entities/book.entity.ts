import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  author: string;
  @Column('decimal')
  price: number;
  @Column({ default: true })
  inStock: boolean;
  @Column({ type: 'text' })
  description: string;
  @Column()
  category: string;
}
