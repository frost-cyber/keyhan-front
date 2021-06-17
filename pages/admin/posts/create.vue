<template>
<SavePost :post="post"/>
</template>

<script>
import SavePost from '~/components/admin/SavePost'
export default {
  name: "create",
  components:{
    SavePost
  },
  data(){
    return{
      post:{
        cities:[],
        states:[]
      }
    }
  }

}
</script>

<style scoped>

</style>