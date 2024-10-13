import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

    @Column({default: 'user'})
    role: string

    @OneToMany(() => Order, (order) =>
        order.user)
        orders: Order[];
    @OneToMany(() => Cart, (cart) =>
        cart.user)
        cart: Cart[];
}
