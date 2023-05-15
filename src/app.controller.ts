import { FileService } from './modules/file/file.service';
import { UserService } from './modules/user/user.service';
import { Controller, Get,Param,Post,Req,Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { User } from './modules/user/models/user.entity';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Args, Query } from '@nestjs/graphql';
import { createReadStream, createWriteStream, existsSync } from 'fs';
@Controller('file')
export class AppController {
  constructor(private readonly userService: UserService, private readonly fileService: FileService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File,@Args('name') name:string) :Promise<boolean> {
  console.log(file);
  const filename = decodeURI(escape(file.originalname))
  console.log(filename);
  const ws = createWriteStream(`D://panfile//${name}//${filename}`,
  {
    flags: 'w',     
    autoClose: true,
    encoding: 'utf8'
    },);
  ws.write(file.buffer)
  ws.on('error',(error)=> {
    console.error('Error occurred:', error);
  })
  return await this.fileService.create({
    filepath:`D://panfile//${name}//${filename}`,
    filename:filename,
    filetype:file.mimetype,
    filesize:file.size,
    username:name,
    createdAt:new Date()
  })
  }
    @Post('download')
    public download(@Args('file') file:string,@Res() res: Response) {
    // console.log(file)
    const filePath = file;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.download(filePath, (err) => {
      if (!err) {
        console.log('success', 'download', filePath);
        return true;
      }
      console.error(err);
      res.send({ err: -1, msg: String(err) });
    });
  }
  @Get(':username/:filename')
  async downloadFile(@Param('username') username: string,@Param('filename') filename: string, @Res() res: Response) {
    const filePath = `d:\\panfile\\${username}\\${filename}`; // 文件路径
    const fileExists = existsSync(filePath); // 判断文件是否存在

    if (fileExists) {
      const fileStream = createReadStream(filePath); // 创建文件读取流
      fileStream.pipe(res); // 将文件读取流通过管道传输到响应流中
    } else {
      res.status(404).send('File not found'); // 文件不存在，返回404错误
    }
  }
  @Get('/create')
  async create(): Promise<boolean> {
    return await this.userService.create({
      name: '水滴超级管理员',
      password:'123456',
      tel:'110'
    });
  }

  @Get('/del')
  async del(): Promise<boolean> {
    return await this.userService.del('0d56828d-5b72-47c3-955a-f76caf4793f2');
  }

  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update(
      'cb71e40d-9f15-40ef-a137-1acaa38831f4',
      {
        name: '水滴超级管理员11111',
      },
    );
  }

  @Get('/find')
  async find(): Promise<User> {
    return await this.userService.find('cb71e40d-9f15-40ef-a137-1acaa38831f4');
  }
}
