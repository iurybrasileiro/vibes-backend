import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { type Bucket, Storage } from '@google-cloud/storage'
import { randomUUID } from 'crypto'
import { URL } from 'node:url'
import { resolve } from 'path'

import { type UploadFile } from './interfaces/upload-file.interface'

@Injectable()
export class StorageService {
  private readonly storage = new Storage({
    keyFilename: resolve(
      __dirname,
      'service-accounts',
      'vibes-service-account.json',
    ),
  })

  private readonly bucket: Bucket

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.storage.bucket(
      this.configService.getOrThrow('BUCKET_NAME'),
    )
  }

  async uploadFile(data: UploadFile) {
    const id = randomUUID()
    const extension = data.file.originalname.split('.').pop()
    const filename = `${id}.${extension}`

    const file = this.bucket.file(`${data.location}/${filename}`)
    const buffer = Buffer.from(data.file.buffer)

    await file.save(buffer, {
      contentType: data.file.mimetype,
      predefinedAcl: 'publicRead',
    })

    const public_uri = file.publicUrl()
    const decoded_uri = decodeURIComponent(public_uri)
    return decoded_uri
  }

  async deleteFile(uri: string): Promise<unknown> {
    const parsed_url = new URL(uri)
    const decoded_pathname = decodeURIComponent(parsed_url.pathname)

    const bucket_name = this.configService.getOrThrow('BUCKET_NAME')
    const file_path = decoded_pathname.replace(`/${bucket_name}/`, '')

    return await this.bucket.file(file_path).delete()
  }
}
