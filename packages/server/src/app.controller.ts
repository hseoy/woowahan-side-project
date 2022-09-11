import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @ApiOperation({
    summary: 'Health Check API',
    description: '서버가 제대로 실행되었는 지 확인하기 위한 API입니다',
  })
  @ApiOkResponse()
  getHealthCheck(): string {
    return this.appService.getHealthCheck();
  }
}
