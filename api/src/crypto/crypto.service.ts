import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class CryptoService {
  async hash(password: string): Promise<string> {
    return hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
