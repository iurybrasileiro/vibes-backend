type File = Express.Multer.File & {
  buffer: {
    type: 'buffer'
    data: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>
  }
}

export interface UploadFile {
  location: string
  file: File
}
