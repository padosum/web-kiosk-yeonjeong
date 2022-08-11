import { Inject, Injectable } from '@nestjs/common';
import Imysql from 'mysql2/typings/mysql/lib/protocol/packets';
import { MYSQL_CONNECTION } from 'src/constants';
import {
  getOrderNum,
  insertOrders,
  insertOrdersHasMenu,
} from '../db/query-statements/orders';
import { OrdersRequestDto } from './dto/orders.request.dto';

@Injectable()
export class OrdersService {
  constructor(@Inject(MYSQL_CONNECTION) private conn: any) {}
  async create(orders: OrdersRequestDto): Promise<number> {
    const { paymentId, paymentAmount, totalAmount, menu } = orders;

    try {
      await this.conn.beginTransaction();

      const [newOrder]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(insertOrders(), [
          paymentId,
          paymentAmount,
          totalAmount,
        ]);

      const insertOrderHasMenu = [];
      menu.forEach(async (item) => {
        const { menuId, optionDetailId } = item;

        for (let i = 0; i < item.quantity; i++) {
          insertOrderHasMenu.push(
            this.conn.query(insertOrdersHasMenu(), [
              newOrder.insertId,
              menuId,
              optionDetailId.split(',').join('^'),
            ]),
          );
        }
      });

      await Promise.all(insertOrderHasMenu);

      await this.conn.commit();

      const [orderNum]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(getOrderNum(), [newOrder.insertId]);

      return orderNum[0].orderNum;
    } catch (err) {
      await this.conn.rollback();
      this.conn.release();
      console.log('mysql query error', err);
    } finally {
      this.conn.release();
    }
  }
}
