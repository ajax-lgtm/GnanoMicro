//一、scan接口
/*
1、新建扫描配置信息
POST    url：http://127.0.0.1:5000/v1/scan
*/
//传入参数
{
  "action": "create",
  "param": {
    "plateTypeId": 1,
    "cellName": "心肌细胞",
    "isManual": "True",
    "motorRunCfgId": 1,
    "cameraRunCfgId": 1,
    "comment": "this is a comment",
  }
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST  /v1/scan"
  },
  "scanId": 1
}
/*
2、修改扫描信息
POST   http://127.0.0.1:5000/v1/scan
*/
//传入参数
{
  "scanId": 1,
  "action": "update",
  "param": {
    "plateTypeId": 2,
    "cellName": "草履虫"
  }
  //参数可以是数据库中任意字段，可以是一个字段也可以是多个字段
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST /v1/scan"
  }
}
/*
3、查看扫描配置总体信息
POST   url:http://127.0.0.1:5000/v1/scan

*/
//传入参数
{
  "scanId": 1,
  "action": "showInfo",
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST /v1/scan"
  },
  "imageNum": 20,
  "createTime": "202002221824",
  "scanSize": 10
}
/*
4、列出总体或者部分照片和视频的列表
POST  http://127.0.0.1:5000/v1/scan
*/
//传入参数
{
  "scanId": 1,
  "action": "list",
  "filter": "all" //或者数字
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST /v1/scan"
  },
  "list": [
    {
      "imageId": 1,
      "imageName": "202002220938",
      "createTime": "2020-02-22 0938",
      "isImage": 1,
      "motorXPosition": 1.2,
      "motorYPosition": 3.1,
      "motorZPosition": 0.3,
      "scanId": 1,
      "plateHoleNum": 3,
      "plateSubHoleNum": 1,
      "imagePath": "",
      "comment": "this is a comment"
    },
    {
      "imageId": 2,
      "imageName": "202002220938",
      "createTime": "2020-02-22 0938",
      "isImage": 1,
      "motorXPosition": 1.2,
      "motorYPosition": 3.1,
      "motorZPosition": 0.3,
      "scanId": 1,
      "plateHoleNum": 3,
      "plateSubHoleNum": 1,
      "imagePath": "",
      "comment": "this is a comment"
    },
    {
      "imageId": 3,
      "imageName": "202002220938",
      "createTime": "2020-02-22 0938",
      "isImage": 1,
      "motorXPosition": 1.2,
      "motorYPosition": 3.1,
      "motorZPosition": 0.3,
      "scanId": 1,
      "plateHoleNum": 3,
      "plateSubHoleNum": 1,
      "imagePath": "",
      "comment": "this is a comment"
    }
  ]
}
/*
4、删除scan  把扫描配置信息和该次扫描所得的图片和视频也一块删掉
POST   url:http://127.0.0.1:5000/v1/scan

*/
//传入参数
{
  "scanId": 1,
  "action": "delete"
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "delete success",
    "request": "POST /v1/scan"
  }
}
//二、照片接口
/*
1、拍照
POST http://127.0.0.1:5000/v1/image

*/
//传入参数
{
  "scanId": 1,
  "action": "snap"
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST /v1/scan"
  },
  "imageId": 1,
  "imageName": "202002220938",
  "createTime": "2020-02-22 0938",
  "isImage": 1,
  "motorXPosition": 1.2,
  "motorYPosition": 3.1,
  "motorZPosition": 0.3,
  "scanId": 1,
  "plateHoleNum": 3,
  "plateSubHoleNum": 1,
  "imagePath": "",
  "comment": "this is a comment"
}
/*
2、获取当前照片信息
POST http://127.0.0.1:5000/v1/image

*/
//传入参数
{
  "imageId": 1,
  "action": "showInfo"
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST /v1/scan"
  },
  "imageId": 1,
  "imageName": "202002220938",
  "createTime": "2020-02-22 0938",
  "isImage": 1,
  "motorXPosition": 1.2,
  "motorYPosition": 3.1,
  "motorZPosition": 0.3,
  "scanId": 1,
  "plateHoleNum": 3,
  "plateSubHoleNum": 1,
  "imagePath": "",
  "comment": "this is a comment"
}
/*
3、修改照片信息
POST http://127.0.0.1:5000/v1/image

*/
//传入参数
{
  "imageId": 1,
  "action": "update",
  "param": {
    "imageName": "草履虫",
    "comment": "this is a new comment"
  }
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST /v1/image"
  }
}
/*
4、删除单张照片
POST  http://127.0.0.1:5000/v1/image

*/
//传入参数
{
  "imageId": 1,
  "action": "delete"
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "delete success",
    "request": "POST  /v1/image"
  }
}
//三、录像接口
/*
1、开始录像

POST  http://127.0.0.1:5000/v1/video

*/
//传入参数
{
  "scanId": 1,
  "action": "start"
}
//返回参数
{
  "videoId": 1,
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST  /v1/video"
  }
}
/*
2、暂停录像
POST  http://127.0.0.1:5000/v1/video
*/
//传入参数
{
  "videoId": 1,
  "action": "pause"
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "pause success",
    "request": " POST  /v1/video"
  }
}
/*
3、继续录像
POST  http://127.0.0.1:5000/v1/video
*/
//传入参数
{
  "videoId": 1,
  "action": "resume"
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "resume success",
    "request": "POST  /v1/video"
  }
}
/*
4、结束录像

POST  http://127.0.0.1:5000/v1/video
*/
//传入参数
{
  "videoId": 1,
  "action": "stop"
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "stop success",
    "request": "POST  /v1/video"
  }
}
/*
5、查询状态

POST http://127.0.0.1:5000/v1/video
*/
//传入参数
{
  "action": "check"
}
//返回参数
//录像中
{
  "message": {
    "error_code": 1,
    "msg": "taking a video",
    "request": "POST /v1/video"
  },
  "imageNum": 20
}
//无录像
{
  "message": {
    "error_code": 2,
    "msg": "there is no video",
    "request": "POST  /v1/video"
  }
}
/*
6、视频播放
POST  http://127.0.0.1:5000/v1/video
*/
//传入参数
{
  "action": "play",
  "videoId": 1
}
//返回参数,
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST  /v1/video"
  },
  "videoInfo": {
    "imageNum": 10,
    "path": ""
  },
  "video": [
    {
      "imageId": 1,
      "imageName": "202002221555",
      "createTime": "2020-02-22 0938",
      "isImage": 1,
      "motorXPosition": 1.2,
      "motorYPosition": 3.1,
      "motorZPosition": 0.3,
      "scanId": 1,
      "plateHoleNum": 3,
      "plateSubHoleNum": 1,
      "imagePath": "",
      "comment": "this is a comment"
    },
    {
      "imageId": 2,
      "imageName": "202002221556",
      "createTime": "2020-02-22 0938",
      "isImage": 1,
      "motorXPosition": 1.2,
      "motorYPosition": 3.1,
      "motorZPosition": 0.3,
      "scanId": 1,
      "plateHoleNum": 3,
      "plateSubHoleNum": 1,
      "imagePath": "",
      "comment": "this is a comment"
    },
    {
      "imageId": 5,
      "imageName": "202002221558",
      "createTime": "2020-02-22 0938",
      "isImage": 1,
      "motorXPosition": 1.2,
      "motorYPosition": 3.1,
      "motorZPosition": 0.3,
      "scanId": 1,
      "plateHoleNum": 3,
      "plateSubHoleNum": 1,
      "imagePath": "",
      "comment": "this is a comment"
    }
  ]
}
/*
7、视频下载
POST   http://127.0.01:5000/v1/video

*/
//传入参数
{
  "videoId": 1,
  "action": "download",
  "param": "mp4" //或者是origin，代表原始文件
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST  /v1/video"
  },
  "path": ""
}
/*
8、查看视频总体信息
POST http://127.0.0.1:5000/v1/video
*/
//传入参数
{
  "videoId": 1,
  "action": "showInfo"
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST  /v1/video"
  }
  "videoSize": 3,
  "imageNum": 20,
  "path": ""
}
//四、根目录接口
/*
1、根目录查看

POST   http://127.0.0.1:5000/v1/base

*/
//传入参数
{
  "action": "showInfo"
}
//返回参数
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST  /v1/base"
  },
  "totalScanNum": 100,
  "user1": {
    "scanNum": 2
  },
  "user2": {
    "scanNum": 5
  }
}
/*
2、根目录查看scan列表
POST   http://127.0.0.1:5000/v1/base

*/
//传入参数
{
  "action": "list",
  "filter": "user" //filter 的参数还可以为time、all
}
//返回参数
/*filter:all*/
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST  /v1/base"
  },
  "list": [
    {
      "scanId": 1,
      "plateTypeId": 1,
      "userId": 1,
      "cellName": "心肌细胞",
      "createTime": "202002220938",
      "motorRunCfgId": 1,
      "cameraRunCfgId": 1,
      "comment": "this is a comment"
    },
    {
      "scanId": 2,
      "plateTypeId": 1,
      "userId": 2,
      "cellName": "草履虫",
      "createTime": "202002220938",
      "motorRunCfgId": 1,
      "cameraRunCfgId": 1,
      "comment": "this is a comment"
    },
    {
      "scanId": 3,
      "plateTypeId": 2,
      "userId": 3,
      "cellName": "花瓣细胞",
      "createTime": "202002220938",
      "motorRunCfgId": 1,
      "cameraRunCfgId": 1,
      "comment": "this is a comment"
    }
  ],
  "plate": [
    {
      "plateTypeId": 1,
      "plateNmae": "96孔板"
    },
    {
      "plateTypeId": 2,
      "plateName": "36孔板"
    }
  ]
}
/*filter:user*/
//筛选出某一个用户的配置表
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST  /v1/base"
  },
  "list": [
    {
      "scanId": 1,
      "plateTypeId": 1,
      "userId": 1,
      "cellName": "心肌细胞",
      "createTime": "202002220938",
      "motorRunCfgId": 1,
      "cameraRunCfgId": 1,
      "comment": "this is a comment"
    },
    {
      "scanId": 2,
      "plateTypeId": 1,
      "userId": 1,
      "cellName": "草履虫",
      "createTime": "202002220938",
      "motorRunCfgId": 1,
      "cameraRunCfgId": 1,
      "comment": "this is a comment"
    },
    {
      "scanId": 3,
      "plateTypeId": 2,
      "userId": 1,
      "cellName": "花瓣细胞",
      "createTime": "202002220938",
      "motorRunCfgId": 1,
      "cameraRunCfgId": 1,
      "comment": "this is a comment"
    }
  ],
  "plate": [
    {
      "plateTypeId": 1,
      "plateNmae": "96孔板"
    },
    {
      "plateTypeId": 2,
      "plateName": "36孔板"
    }
  ]
}
/*filter:time*/
//根据传入的时间，返回某个时间段内的scan列表
//例如：filter:202002221202-202002231202
{
  "message": {
    "error_code": 0,
    "msg": "success",
    "request": "POST  /v1/base"
  },
  "list": [
    {
      "scanId": 1,
      "plateTypeId": 1,
      "userId": 1,
      "cellName": "心肌细胞",
      "createTime": "202002221938",
      "motorRunCfgId": 1,
      "cameraRunCfgId": 1,
      "comment": "this is a comment"
    },
    {
      "scanId": 2,
      "plateTypeId": 1,
      "userId": 4,
      "cellName": "草履虫",
      "createTime": "202002230938",
      "motorRunCfgId": 1,
      "cameraRunCfgId": 1,
      "comment": "this is a comment"
    },
    {
      "scanId": 3,
      "plateTypeId": 2,
      "userId": 2,
      "cellName": "花瓣细胞",
      "createTime": "202002230038",
      "motorRunCfgId": 1,
      "cameraRunCfgId": 1,
      "comment": "this is a comment"
    }
  ],
  "plate": [
    {
      "plateTypeId": 1,
      "plateNmae": "96孔板"
    },
    {
      "plateTypeId": 2,
      "plateName": "36孔板"
    }
  ]
}