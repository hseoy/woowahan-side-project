import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  generateHash(unHashedStr: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(unHashedStr, salt);
    return hash;
  }

  compare(hashedStr: string, unHashedStr: string): boolean {
    return (unHashedStr && bcrypt.compareSync(unHashedStr, hashedStr)) || false;
  }
}
