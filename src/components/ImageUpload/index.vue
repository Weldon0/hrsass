<template>
  <div>
    <el-upload
      :http-request="upload"
      :before-upload="beforeUpload"
      action="#"
      :on-change="changeFile"
      :on-remove="removeFile"
      :class="isComplete && 'disabled'"
      :limit="1"
      :on-preview="preview"
      :file-list="fileList"
      list-type="picture-card"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" />

    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="80%">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDiFVUDfqkNjocBTVLuDG1VieIfla8QQBf',
  SecretKey: 'FDvLUN1OUJrGOFp9E3bttc4F9m7ByTih'
})
export default {
  data() {
    return {
      showPercent: false,
      currentFileUid: '',
      dialogVisible: false,
      imgUrl: '',
      percent: 0,
      currentFileId: '',
      fileList: []
    }
  },
  computed: {
    // 上传组件是否上传完成
    isComplete() {
      return this.fileList.length === 1
    }
  },
  methods: {
    async upload(params) {
      if (params.file) {
        cos.putObject(
          {
            Bucket: 'wuxiaohui-1254415986', // 存储桶
            Region: 'ap-nanjing', // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
            // 进度条
            onProgress: (params) => {
              console.log(params)
              // params percent上传的进度
              // 0 ==> 1
              this.percent = params.percent * 100 // 0 ==> 100
            }
            // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
          },
          (err, data) => {
            // 上传成功或者失败的时候
            if (err) return this.$message.error(err.message)
            console.log(data.Location) // 图片的服务端链接
            // 目的: 从本地filelist中找到当前正在上传的文件对象，把本地的url地址替换成服务器的url地址即可
            // currentFileUid ==> 上传的时候记录的当前正在上传的文件的uid
            this.fileList.forEach((item) => {
              if (item.uid === this.currentFileUid) {
                // 本地的图片地址替换成服务器返回的地址
                item.url = `http://${data.Location}`
                //  表示上传完成
                item.upload = true
              }
            })
            // 上传完成初始化进度条
            // 1、进度条消失
            // 2、进度条进度初始化为0
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)
          }
        )
      }
    },
    beforeUpload(file) {
      // 需求： 1、文件类型
      // 2、文件大小

      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        //  满足条件的类型
        this.$message.error(`上传文件类型${file.type}，不符合规则`)
        // 目的：停止上传
        return false
      }

      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error(`文件尺寸不符合规则`)
        // 目的：停止上传
        return false
      }
      this.currentFileUid = file.uid
      // 开始上传
      this.showPercent = true
      return true
    },
    changeFile(file, fileList) {
      // fillist：上传成功的文件列表
      // 触发多次，push？
      this.fileList = [...fileList]
    },
    removeFile(file) {
      console.log(file)
      // 过滤图片
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid)
    },
    preview(file) {
      // file.url
      // 弹层展示
      this.dialogVisible = true
      this.imgUrl = file.url
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
