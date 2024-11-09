import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { UploadFile } from './interfaces/upload-file.interface'
import { StorageService } from './storage.service'

@Controller()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @MessagePattern('upload-file')
  async uploadFile(
    @Payload()
    data: UploadFile,
  ) {
    return await this.storageService.uploadFile(data)
  }

  @MessagePattern('delete-file')
  async deleteFile(
    @Payload()
    data: string,
  ) {
    return await this.storageService.deleteFile(data)
  }
}
