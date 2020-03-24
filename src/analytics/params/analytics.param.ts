import { IsNumberString } from 'class-validator';

export class GetAnalyticsParams {
  @IsNumberString()
  year: string;
}
