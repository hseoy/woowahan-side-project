export class CreateS3ObjectDto {
  key: string;
  buffer: Buffer;
  mimetype: string;
  bucket?: string;
}
