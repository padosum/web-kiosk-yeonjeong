import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('menu')
@ApiTags('Menu API')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({
    summary: '전체 메뉴 조회 API',
    description: '전체 메뉴를 조회한다.',
  })
  getAllMenu() {
    return this.menuService.getAllMenu();
  }
}
