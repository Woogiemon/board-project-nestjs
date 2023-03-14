import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatePlanCodeRequest } from '../dto/createRatePlanCodeRequest.dto';
import { RatePlanCodeEntity } from '../entities/ratePlanCode.entity';

@Injectable()
export class RatePlanCodeService {
  private readonly logger = new Logger(RatePlanCodeService.name);
  constructor(
    @InjectRepository(RatePlanCodeEntity)
    private readonly ratePlanCodeRepository: Repository<RatePlanCodeEntity>,
  ) {}

  async createRatePlanCode(
    request: CreateRatePlanCodeRequest,
  ): Promise<RatePlanCodeEntity> {
    const createRatePlanCode = await this.ratePlanCodeRepository.create({
      groupCode: request.groupCode,
      point: request.point,
    });

    return await this.ratePlanCodeRepository.save(createRatePlanCode);
  }
}
