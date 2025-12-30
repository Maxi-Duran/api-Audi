import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { AuditModule } from '../audit/audit.module';
@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuditModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
