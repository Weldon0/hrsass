<template>
  <el-card class="box-card">
    <el-row type="flex" justify="space-between">
      <el-col :span="6">
        <div v-if="hasBefore" class="before">
          <i class="el-icon-info" />
          <slot name="before" />
        </div>
      </el-col>
      <el-col :span="6">
        <slot name="after" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    hasBefore: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.before {
  display: inline-block;
  padding: 0px 10px;
  border-radius: 3px;
  border: 1px solid rgba(145, 213, 255, 1);
  background: rgba(230, 247, 255, 1);
  font-size: 12px;
  height: 30px;
  line-height: 30px;

  i {
    color: red;
  }

}
</style>
