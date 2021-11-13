import PageTools from './pageTools'
import UploadExcel from './UploadExcel'

// 注册上传图片的组件
import ImageUpload from './ImageUpload/index'

export default (Vue) => {
  Vue.component('PageTools', PageTools)
  Vue.component('UploadExcel', UploadExcel)
  Vue.component('ImageUpload', ImageUpload)
}
