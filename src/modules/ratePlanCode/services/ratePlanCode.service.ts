import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatePlanCodeEntity } from '../entities/ratePlanCode.entity';

@Injectable()
export class RatePlanCodeService {
  private readonly logger = new Logger(RatePlanCodeService.name);
  constructor(
    @InjectRepository(RatePlanCodeEntity)
    private readonly ratePlanCodeRepository: Repository<RatePlanCodeEntity>,
  ) {}
}
