import { Controller } from '@nestjs/common';
import { TransactService } from '../services/transact.service';

@Controller('transact')
export class TransactController {
  constructor(private readonly transactService: TransactService) {}
}
