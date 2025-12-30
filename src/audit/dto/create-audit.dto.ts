import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateAuditDto {
  @IsNumber()
  idUser: number;

  @IsString()
  ip: string;
  @IsDate()
  date: Date;
}
