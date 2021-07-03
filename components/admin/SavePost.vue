<template>
  <div class="grid grid-cols-6 gap-2">
    <vs-card class="col-span-2">
      <div>
        <vs-input class="w-full" v-model="post.name" name="name" data-vv-as="نام" v-validate="'required'" label="نام"/>
        <span class="text-danger text-sm" v-if="errors.has('name')">{{ errors.first('name') }}</span>
      </div>
      <div>
        <vs-input class="w-full" v-model="post.is_free" name="is_free" data-vv-as="رایگان" label="رایگان"/>
        <span class="text-danger text-sm" v-if="errors.has('is_free')">{{ errors.first('is_free') }}</span>
      </div>
      <div>
        <span>استان</span>
        <tree-select class="w-full" :options="ostan" :normalizer="(val)=>{return {label:val.name , id:val.id}}"
                     v-model="post.states" name="states" data-vv-as="استان ها"  multiple/>
        <span class="text-danger text-sm" v-if="errors.has('states')">{{ errors.first('states') }}</span>
      </div>
    </vs-card>
    <vs-card class="col-span-4">
      <vs-button @click.native="post.weight.push({start:null,end:null,price:null})">افزودن</vs-button>
      <div class="grid grid-cols-4 gap-3" v-for="(w,index) in post.weight" :key="index" >
       <div>
         <vs-input class="w-full" v-validate="'required'" :name="'start.'+index" label="از" v-model="w.start" data-vv-as=" شروع"/>
         <span class="text-danger text-sm" v-if="errors.has('start.'+index)">{{ errors.first('start.'+index) }}</span>
       </div>
        <div>
          <vs-input class="w-full" v-validate="'required'" :name="'end.'+index" label="تا" v-model="w.end" data-vv-as="پایان"/>
          <span class="text-danger text-sm" v-if="errors.has('end.'+index)">{{ errors.first('end.'+index) }}</span>
        </div>
       <div>
         <vs-input class="w-full"  v-validate="'required'" label="قیمت" :name="'price.'+index" v-model="w.price" data-vv-as="قیمت"/>
         <span class="text-danger text-sm" v-if="errors.has('price.'+index)">{{ errors.first('price.'+index) }}</span>
       </div>
        <div>
          <vs-button class="mt-5 mr-5 lg:w-3/4" color="danger" icon="delete" @click.native="post.weight.splice(index , 1)">حذف</vs-button>
        </div>
      </div>

      <vs-divider/>
      <vs-button color="success" @click.native="savePost">ذخیره</vs-button>
    </vs-card>
  </div>
</template>

<script>
import treeSelect from '@riophae/vue-treeselect'

export default {
  name: "save_post",
  props: {
    post: {
      required: true
    }
  },
  computed: {
    ostan() {
      return this.$store.getters['address/getOstans']
    },
    cities() {
      return this.$store.getters['address/getCities']
      let cities = this.$store.getters['address/getCities']
      // cities.forEach(city=>{
      //   if(){
      //
      //   }
      // })
    },
  },
  watch: {
    '$store.state.post.errors': {
      deep: false,
      handler(errors) {
        Object.entries(errors).forEach(error => {

          let name = error[0].split('.')
          if (name.length === 1) {
            name = name[0]
          } else {
            name = `${name[2]}.${name[1]}`
          }
          this.errors.add({
            field: name,
            msg: error[1][0]
          })
        })
      }
    }
  },
  components: {
    treeSelect
  },
  methods: {

    savePost() {
      this.$validator.validateAll().then(validated => {
        if (validated) {
          this.$emit('save_post')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>