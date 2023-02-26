export class candidate {
  candidate_id: string;
  rank: number;
}

export class CreateVoteDto {
  type: 'MWAWM' | 'K3M';
  voter_id: string;
  data: candidate[];
  isForUpdate: boolean;
}
