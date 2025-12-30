import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { Role } from 'src/role.enum';
import { Roles } from 'src/role/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { UseGuards } from '@nestjs/common';

@Controller('audit')
@UseGuards(AuthGuard, RoleGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createAuditDto: CreateAuditDto) {
    return this.auditService.create(createAuditDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.auditService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.auditService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateAuditDto: UpdateAuditDto) {
    return this.auditService.update(+id, updateAuditDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.auditService.remove(+id);
  }
}
