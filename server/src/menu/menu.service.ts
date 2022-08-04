import { Injectable } from '@nestjs/common';
import { _dbQuery } from '../db';

@Injectable()
export class MenuService {
  private menuCategoryList = ['커피', '라떼', '티', '쥬스', '디카페인'];

  getAllCategory() {
    return _dbQuery(`select id, title from MENU_CATEGORY`, []);
  }
}
