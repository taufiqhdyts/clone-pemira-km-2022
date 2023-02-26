import { IsNotEmpty } from 'class-validator';

enum OperationType {
  KURANG = 'kurang',
  TAMBAH = 'tambah',
}

export class UpdateNilaiCandidateDto {
  @IsNotEmpty()
  candidate_id: string;
  @IsNotEmpty()
  type: OperationType;
  @IsNotEmpty()
  sebanyak: number;
}
