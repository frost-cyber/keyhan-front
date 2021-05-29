<template>
 <div class="grid grid-cols-5 gap-2">
   <div class="col-span-2">
     <vs-input class="w-full" v-validate="'required'" v-model="page.title" name="title" label="عنوان" data-vv-as="عنوان"/>
     <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first('title') }}</span>
   </div>
   <div class="col-span-2">
     <vs-input class="w-full"  v-validate="'required'" v-model="page.slug" name="slug" label="نشانک" data-vv-as="نشانک"/>
     <span class="text-danger text-sm" v-show="errors.has('slug')">{{ errors.first('slug') }}</span>
   </div>
   <div class="col-span-1">
     <label>وضعیت</label>
     <tree-select :options="status" v-model="page.status" v-validate="'required'" name="status" class="w-full" data-vv-as="وضعیت"/>
     <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>
   </div>
   <div class="col-span-5">
     <editor v-model="page.body"  v-validate="'required'" name="body" data-vv-as="صفحه"/>
     <span class="text-danger text-sm" v-show="errors.has('body')">{{ errors.first('body') }}</span>
   </div>
   <vs-button color="success" type="filled" class="w-1/2" @click.native="SavePage">ذخیره</vs-button>
 </div>
</template>

<script>
import Editor from "~/components/admin/Editor";
export default {
  name: "SavePage",
  components:{
    Editor
  },
  data(){
    return{
      status:[
        {id:'active',label:'فعال'},
        {id:'deactive',label:'غیر فعال'}
      ]
    }
  },
  props:{
    page:{
      type:Object,
      default(){
        return {body:""}
      }
    }
  },
  methods:{
    SavePage(){
      this.$validator.validateAll().then(res=>{
        if(!res) return
        this.$emit('save-page')
      })

    }
  }
}
</script>

<style scoped>

</style>
