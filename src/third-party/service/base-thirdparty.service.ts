import { HttpService } from '@nestjs/axios';
import { CreateGameDto } from '../dto/create-game.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

export class BaseThirdPartyService {
  constructor(private readonly httpService: HttpService) {}
  sendPost(
    url: string,
    data: any,
    headers?: Record<string, string>,
  ): Observable<AxiosResponse<any>> {
    console.log(url);
    console.log(data);
    console.log(headers);

    return this.httpService.post(url, data, { headers });
  }
}
