<template>
  <ul>
    <li v-for="item in data" :key="item.id">
      <slot :row="item" :userInfo="黑马" :age="18" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
