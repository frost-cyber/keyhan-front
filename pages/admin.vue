<template>
  <NuxtChild @setAppClasses="(classesStr) => $emit('setAppClasses', classesStr)" />
</template>

<script>
export default {
  middleware:['auth' , 'isAdmin'],
  name: "admin",
  layout: "MainDashboard"
}
</script>
