import { Controller, Logger } from '@nestjs/common';
import { RatePlanCodeService } from '../services/ratePlanCode.service';

@Controller('ratePlanCode')
export class RatePlanCodeController {
  private readonly logger = new Logger(RatePlanCodeController.name);
  constructor(private readonly ratePlanCodeService: RatePlanCodeService) {}
}
