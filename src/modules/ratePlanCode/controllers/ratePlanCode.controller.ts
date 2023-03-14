import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateRatePlanCodeRequest } from '../dto/createRatePlanCodeRequest.dto';
import { RatePlanCodeEntity } from '../entities/ratePlanCode.entity';
import { RatePlanCodeService } from '../services/ratePlanCode.service';

@Controller('ratePlanCode')
export class RatePlanCodeController {
  private readonly logger = new Logger(RatePlanCodeController.name);
  constructor(private readonly ratePlanCodeService: RatePlanCodeService) {}

  @Post('/createRatePlanCode')
  async createRatePlanCode(
    @Body() request: CreateRatePlanCodeRequest,
  ): Promise<RatePlanCodeEntity> {
    return await this.ratePlanCodeService.createRatePlanCode(request);
  }
}
