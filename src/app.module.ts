import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { FreeBoardModule } from './modules/freeBoard/freeBoard.module';
import { ProductBoardModule } from './modules/productBoard/productBoard.module';
import { ProductReqListModule } from './modules/productReqList/productReqList.module';
import { PurchaseHistoryModule } from './modules/purchaseHistory/purchaseHistory.module';
import { RatePlanCodeModule } from './modules/ratePlanCode/ratePlanCode.module';
import { TransactModule } from './modules/transact/transact.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, `env`],
      validate,
    }),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRATION_TIME') },
      }),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    BrandModule,
    UserModule,
    TransactModule,
    EmployeeModule,
    FreeBoardModule,
    ProductBoardModule,
    PurchaseHistoryModule,
    AuthModule,
    RatePlanCodeModule,
    ProductReqListModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
