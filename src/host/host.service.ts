import { Injectable } from '@nestjs/common';

@Injectable()
export class HostService {
  async hello(name: string): Promise<string> {
    return await `Hello ${name}`;
  }
}
