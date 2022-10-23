import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AWSError, S3, SharedIniFileCredentials } from 'aws-sdk';
import { CreateS3ObjectDto } from './dto/create-s3-object.dto';
import { PromiseResult } from 'aws-sdk/lib/request';
import { CopyS3ObjectDto } from './dto/copy-s3-object.dto';

@Injectable()
export class S3Service {
  private s3: S3;
  private bucketName: string;

  constructor(configService: ConfigService) {
    this.bucketName = configService.get('aws.bucket.name');
    this.s3 = new S3({
      region: configService.get('aws.bucket.region'),
      credentials: this.getS3Credentials(configService.get('aws.credentials')),
    });
  }

  private getS3Credentials({
    profile,
    accessKeyId,
    secretAccessKey,
  }: {
    profile?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
  }) {
    if (profile) {
      return new SharedIniFileCredentials({ profile });
    }
    if (accessKeyId && secretAccessKey) {
      return { accessKeyId, secretAccessKey };
    }
    return;
  }

  private isS3Error(
    err: unknown,
  ): err is { $metadata: { httpStatusCode: number } } {
    return Boolean(err && typeof err === 'object' && '$metadata' in err);
  }

  /** 해당 S3 Object가 존재할 경우 true, 없을 경우 HTTP Error Status Code 반환 */
  async existS3Object(key: string) {
    try {
      await this.s3.headObject({ Bucket: this.bucketName, Key: key }).promise();

      return true;
    } catch (err) {
      const isS3Error = this.isS3Error(err);
      return isS3Error ? err.$metadata?.httpStatusCode || 500 : 500;
    }
  }

  async getS3Object(
    key: string,
  ): Promise<PromiseResult<S3.GetObjectOutput, AWSError> | null> {
    const existence = await this.existS3Object(key);

    if (existence === true) {
      return this.s3
        .getObject({
          Bucket: this.bucketName,
          Key: key,
        })
        .promise();
    }

    return null;
  }

  createS3Object({ key, bucket, buffer, mimetype }: CreateS3ObjectDto) {
    return this.s3
      .putObject({
        Bucket: bucket || this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: mimetype,
        ACL: 'bucket-owner-full-control',
      })
      .promise();
  }

  deleteS3Object(key: string) {
    return this.s3
      .deleteObject({
        Bucket: this.bucketName,
        Key: key,
      })
      .promise();
  }

  copyS3Object({ departureKey, destinationKey }: CopyS3ObjectDto) {
    return this.s3
      .copyObject({
        Bucket: this.bucketName,
        CopySource: encodeURI(`${this.bucketName}/${departureKey}`),
        Key: destinationKey,
        ACL: 'bucket-owner-full-control',
      })
      .promise();
  }
}
