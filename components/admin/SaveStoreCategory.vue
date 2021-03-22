<template>
  <form @submit.prevent="saveAttribute">
    <div class="vx-row">
      <div class="vx-col sm:w-full">
        <vs-card hover="true">
          <div slot="header">
            <h3>دسته های فروشگاه</h3>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>نام</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-input class="w-full" v-model="category.name" v-validate="'required'" name="name" data-vv-as="نام"/>
              <span class="text-danger text-sm" v-show="errors.has(`name`)">{{ errors.first(`name`) }}</span>

            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>نامک</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-input class="w-full" v-model="category.slug" v-validate="'required'" name="slug" data-vv-as="نامک"/>
              <span class="text-danger text-sm" v-show="errors.has(`slug`)">{{ errors.first(`slug`) }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>دسته مادر</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <tree-select  v-model="category.parent_id" :options="categories" :normalizer="normalizer"/>
              <span class="text-danger text-sm" v-show="errors.has(`slug`)">{{ errors.first(`slug`) }}</span>

            </div>
          </div>
          <div slot="footer">
            <vs-button color="success" :disabled="disable" type="filled" @click="saveAttribute">ذخیره</vs-button>
          </div>
        </vs-card>
      </div>
    </div>
  </form>
</template>

<script>
function createTree(cats, disabled, id = null) {
  let catsFiltered = cats.filter(cat => cat.parent_id === id)

  catsFiltered.forEach(cat =>{
    let disabledCat = 0
    if (!isNaN(disabled) && disabled > 0 && cat.id === disabled){
      disabledCat = -1
    }

    if (!isNaN(disabledCat) && disabledCat === -1){
      cat.isDisabled = true
    }

    let children = createTree(cats , disabled, cat.id)
    if (children.length){
      cat.children = children
    }
  })
  return catsFiltered
}
// import the component
import TreeSelect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: "save-store-category",
  components: {TreeSelect},
  props: {
    category: {
      required: true,
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      categories : [
        {
          name : 1,
          id : 1,
          isDisabled: true,
        }
      ]
    }
  },
  watch: {
    '$store.state.storeCategory.errors': {
      deep: false,
      handler(errors) {
        Object.entries(errors).forEach(error => {
          let name = error[0].split('.')
          if (name.length === 1) {
            name = name[0]
          } else {
            name = `${name[2]}[${name[1]}]`
          }
          this.errors.add({
            field: name,
            msg: error[1][0]
          })
        })
      }
    }
  },
  methods: {
    normalizer(cat) {
      return {
        id: cat.id,
        label: cat.name,
        children: cat.children,
      }
    },
    saveAttribute() {
      if (this.disable) {
        return
      }
      this.$validator.validateAll().then(validated => {
        if (validated) {
          this.$store.commit('storeCategory/SET_CATEGORY', this.category)
          this.$emit('save-category')
        }
      })
    },
  },
  async mounted() {
    await this.$store.dispatch('storeCategory/getCategories')
    let cats = this.$store.getters['storeCategory/getCategories']
    this.categories = createTree(cats , this.category.id ?? 0)
  },
  destroyed() {

  }
}
</script>
