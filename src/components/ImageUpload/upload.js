import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDiFVUDfqkNjocBTVLuDG1VieIfla8QQBf',
  SecretKey: 'FDvLUN1OUJrGOFp9E3bttc4F9m7ByTih'
})
export function upload(params, callback) {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: 'wuxiaohui-1254415986', // 存储桶
        Region: 'ap-nanjing', // 地域
        Key: params.file.name, // 文件名
        Body: params.file, // 要上传的文件对象
        StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
        onProgress(params) {
          callback(params)
        }
        // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
      },
      function(err, data) {
        // data返回数据之后 应该如何处理
        if (err) return reject(err)
        resolve(data)
      }
    )
  })
}
