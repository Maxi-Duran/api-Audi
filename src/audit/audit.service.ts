import { Injectable } from '@nestjs/common';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { Repository } from 'typeorm';
import { Audit } from './entities/audit.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(Audit) private auditRepository: Repository<Audit>,
  ) {}
  create(createAuditDto: CreateAuditDto): Promise<Audit> {
    return this.auditRepository.save(createAuditDto);
  }

  findAll() {
    return this.auditRepository.find();
  }

  findOne(id: number) {
    return this.auditRepository.findOneBy({ id });
  }

  update(id: number, updateAuditDto: UpdateAuditDto) {
    return this.auditRepository.update(id, updateAuditDto);
  }

  remove(id: number) {
    return this.auditRepository.delete(id);
  }
}
