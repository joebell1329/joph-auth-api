import { singleton } from 'tsyringe';
import { pbkdf2Sync, createDecipheriv } from 'crypto';
import { IEncryptedData } from './crypto.model';

@singleton()
export class CryptoService {

  public verify(payload: IEncryptedData, password: string): boolean {
    const binPassword = Buffer.from(password, 'utf8');
    const binIv = Buffer.from(payload.iv, 'utf8');
    const binSalt = Buffer.from(payload.salt, 'utf8');

    const masterKey = this.deriveKey(binPassword, binSalt);

    const decipher = createDecipheriv('aes-256-gcm', masterKey, binIv);
    const decrypted = decipher.update()
  }

  /**
   * Derives a 256 bit key using PBKDF2 with 8000 iterations.
   * @param cryptoKey - The original key to derive the new key from.
   * @param salt - A randomly generated salt.
   */
  private deriveKey(cryptoKey: Buffer, salt: Buffer): Buffer {
    return pbkdf2Sync(cryptoKey, salt, 8000, 32, 'sha256');
  }

}
