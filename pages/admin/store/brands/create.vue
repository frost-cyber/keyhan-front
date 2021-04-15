<template>
<save-brand :brand="brand" :disabled="disabled"/>
</template>

<script>
export default {
  name: "create",
  data() {
    return {
      brand:{},
      disabled: false,
    }
  },
}
</script>

<style scoped>

</style>
