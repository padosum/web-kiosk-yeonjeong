import { Inject, Injectable } from '@nestjs/common';
import { MYSQL_CONNECTION } from 'src/constants';
import { getAllCategory, getAllMenu } from '../db/query-statements/menu';
import { ReadMenuDto } from './dto/read-menu.dto';

@Injectable()
export class MenuService {
  constructor(@Inject(MYSQL_CONNECTION) private conn: any) {}
  async getAllMenu(): Promise<ReadMenuDto> {
    try {
      const [categories]: any = await this.conn.query(getAllCategory());
      const [menu]: any = await this.conn.query(getAllMenu());

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

      const allMenuWithCategory: ReadMenuDto = categories.map(
        ({ id, title }) => {
          return {
            id,
            title,
            menu: allMenu.filter((menuItem) => id === menuItem['categoryId']),
          };
        },
      );

      return allMenuWithCategory;
    } catch (e) {
      throw new Error(e);
    } finally {
      this.conn.release();
    }
  }
}
