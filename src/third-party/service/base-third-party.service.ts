import { HttpService } from '@nestjs/axios';
import { Observable, catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseThirdPartyService {
  constructor(private readonly httpService: HttpService) {}

  async sendPost(
    url: string,
    requestBody: any,
    headers?: Record<string, string>,
    shouldLog?: boolean,
  ): Promise<any> {
    var start = Date.now();
    const { data } = await lastValueFrom(
      this.httpService.post(url, requestBody, { headers: headers }).pipe(
        catchError((er: AxiosError) => {
          console.log(`An error happened: `, er);
          throw er;
        }),
      ),
    );
    var end = Date.now();
    if (shouldLog) {
      console.log(
        `Url = ${url}\tStart = ${start}\tEnd = ${end}\tDuration = ${Math.abs(end - start)}`,
      );
    }
    // console.log(`Response data: `, data);
    return data;
  }

  async sendGet(
    url: string,
    headers?: Record<string, string>,
    shouldLog?: boolean,
  ): Promise<any> {
    var start = Date.now();
    const { data } = await firstValueFrom(
      this.httpService.get(url, { headers: headers }).pipe(
        catchError((er: AxiosError) => {
          console.log(`An error happened: `, er);
          throw er;
        }),
      ),
    );
    var end = Date.now();
    if (shouldLog) {
      console.log(
        `Url = ${url}\tStart = ${start}\tEnd = ${end}\tDuration = ${Math.abs(end - start)}`,
      );
    }
    return data;
  }
}
