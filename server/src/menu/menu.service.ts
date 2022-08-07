import { Injectable } from '@nestjs/common';
import { _dbConn } from '../db';
import { getAllCategory, getAllMenu } from '../db/query-statements/menu';

@Injectable()
export class MenuService {
  async getAllMenu() {
    const conn = await _dbConn.getConnection();

    try {
      const [categories]: any = await conn.query(getAllCategory());
      const [menu]: any = await conn.query(getAllMenu());

      const allMenu = menu.map((item) => {
        const {
          price,
          optionId,
          optionDetailId,
          optionTitle,
          optionSurcharge,
        }: {
          price: string;
          optionId: string;
          optionDetailId: string;
          optionTitle: string;
          optionSurcharge: string;
        } = item;
        return {
          ...item,
          price: Number(price),
          optionId: optionId?.split(',').map(Number),
          optionDetailId: optionDetailId?.split(',').map(Number),
          optionTitle: optionTitle?.split(','),
          optionSurcharge: optionSurcharge?.split(',').map(Number),
        };
      });

      const allMenuWithCategory = categories.map(({ id, title }) => {
        return {
          id,
          title,
          menu: allMenu.filter((menuItem) => id === menuItem['categoryId']),
        };
      });

      return allMenuWithCategory;
    } catch (e) {
      throw new Error(e);
    } finally {
      conn.release();
    }
  }
}
