import { Injectable } from '@nestjs/common';
import { _dbConn } from 'src/db';
import Imysql from 'mysql2/typings/mysql/lib/protocol/packets';
import {
  getOrderNum,
  insertOrders,
  insertOrdersHasMenu,
} from '../db/query-statements/orders';
import { OrdersRequestDto } from './dto/orders.request.dto';

@Injectable()
export class OrdersService {
  async create(orders: OrdersRequestDto): Promise<number> {
    const { paymentId, paymentAmount, totalAmount, menu } = orders;

    const conn = await _dbConn.getConnection();

    try {
      await conn.beginTransaction();

      const [newOrder]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await conn.query(insertOrders(), [
          paymentId,
          paymentAmount,
          totalAmount,
        ]);

      const insertOrderHasMenu = [];
      menu.forEach(async (item) => {
        const { menuId, optionDetailId } = item;

        for (let i = 0; i < item.quantity; i++) {
          insertOrderHasMenu.push(
            conn.query(insertOrdersHasMenu(), [
              newOrder.insertId,
              menuId,
              optionDetailId.split(',').join('^'),
            ]),
          );
        }
      });

      await Promise.all(insertOrderHasMenu);

      await conn.commit();

      const [orderNum]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await conn.query(getOrderNum(), [newOrder.insertId]);

      return orderNum[0].orderNum;
    } catch (err) {
      await conn.rollback();
      conn.release();
      console.log('mysql query error', err);
    } finally {
      conn.release();
    }
  }
}
