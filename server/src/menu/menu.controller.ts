import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadMenuDto } from './dto/read-menu.dto';

@Controller('menu')
@ApiTags('Menu API')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({
    summary: '전체 메뉴 조회 API',
    description: '전체 메뉴를 조회한다.',
  })
  @ApiResponse({
    type: ReadMenuDto,
    description: 'success',
    status: 200,
  })
  @Get()
  getAllMenu(): Promise<ReadMenuDto> {
    return this.menuService.getAllMenu();
  }
}
