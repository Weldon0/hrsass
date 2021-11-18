import PageTools from './pageTools'
import UploadExcel from './UploadExcel'

// 注册上传图片的组件
import ImageUpload from './ImageUpload/index'
import ScreenFull from './ScreenFull/index.vue'
import Theme from './Theme'
import Lang from './lang'
import TagsView from './TagsView'

export default (Vue) => {
  Vue.component('PageTools', PageTools)
  Vue.component('UploadExcel', UploadExcel)
  Vue.component('ImageUpload', ImageUpload)
  Vue.component('ScreenFull', ScreenFull)
  Vue.component('Theme', Theme)
  Vue.component('Lang', Lang)
  Vue.component('TagsView', TagsView)
}
