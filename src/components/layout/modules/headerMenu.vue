<template>
  <div class="header-menu">
    <div>{{menuName}}</div>
    <slot name="select"></slot>
  </div>
</template>

<script>
export default {
  name: "headerMenu",
  props:{
    menuName:{
      type:String,
      default:''
    }
  }
}
</script>

<style scoped>

</style>