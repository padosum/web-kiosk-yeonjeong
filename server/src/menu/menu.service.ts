import { Injectable } from '@nestjs/common';
import { _dbConn } from '../db';

@Injectable()
export class MenuService {
  async getAllMenu() {
    const conn = await _dbConn.getConnection();

    try {
      const [menus] = await conn.query(`select id, title from MENU_CATEGORY`);
      return menus;
    } catch (e) {
      throw new Error(e);
    } finally {
      conn.release();
    }
  }
}
