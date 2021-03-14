<template>
  <NuxtChild @setAppClasses="(classesStr) => $emit('setAppClasses', classesStr)" />
</template>

<script>
export default {
  middleware:'',
  name: "admin",
  layout: "MainDashboard"
}
</script>
