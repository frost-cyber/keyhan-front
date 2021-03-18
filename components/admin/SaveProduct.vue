<template>
  <vs-card>
    <form-wizard title="" subtitle="">
      <tab-content title="Personal details">
        <div class="grid grid-cols-8 gap-5">
          <div class="col-span-2">
            <vs-input label="نام" class="w-full" v-model="product.name"/>
          </div>
          <div class="col-span-2">
            <vs-input label="کدمحصول" class="w-full" v-model="product.code"/>
          </div>
          <div class="col-span-2">
            <vs-input label="نامک" class="w-full" v-model="product.slug"/>
          </div>
          <div class="col-span-6 row-start-2 row-end-7">
            <editor/>
          </div>
          <div class="col-span-2 row-start-1 col-start-7">
            <label class="w-full">دسته ها</label>
            <tree-select v-model="product.categories" :options="categories" :normalizer="normalizer"/>
          </div>
          <div class="col-span-2 row-start-2 col-start-7">
            <label class="w-full">نوع محصول</label>
            <tree-select v-model="product.type" :options="types"/>
          </div>
          <div class="col-span-2 row-start-3 col-start-7">
            <label class="w-full">تاریخ انتشار محصول</label>
            <persion-date class="w-full" v-model="product.published_at"></persion-date>
          </div>
        </div>
      </tab-content>
      <tab-content title="ویژگی ها">
        <div class="grid grid-cols-12 gap-5">
          <template v-for="(attribute , index) in product.attributes">
            <vs-button icon="delete" class="col-span-2" @click.native="product.attributes.splice(index, 1)"/>
            <tree-select v-model="attribute.id" class="col-span-5" :options="attributes" @input="attributeValues(index , attribute.id)"/>
            <tree-select v-model="attribute.values" multiple class="col-span-5" :options="attribute.vals"/>
          </template>
          <vs-button color="primary" class="col-span-2" @click.native="product.attributes.push({id:null ,values:[],vals:[]})">افزودن ویژگی</vs-button>
        </div>
      </tab-content>
      <tab-content title="متغیر ها">
        <vs-collapse :not-arrow="true" :accordion="true" type="border" >
          <vs-collapse-item v-for="(variable , index) in product.variables" :key="index">
            <div slot="header">
              {{ `${variableLabel()} ${variableValue(variable['variable_id']? variable['variable_id'] :null)}` }}
            </div>
            <div class="grid grid-cols-8 gap-5">
              <label class="col-span-2">{{ variableLabel() }}</label>
              <tree-select class="col-span-8" v-model="variable['variable_id']" :options="product.variable.values"/>
              <vs-input label="قیمت خرید" v-model="variable['purchase_price']" class="col-span-2"/>
              <vs-input label="قیمت فروش" v-model="variable['selling_price']" class="col-span-2"/>
              <vs-input label="قیمت تخفیف خورده" v-model="variable['discounted_price']" class="col-span-2"/>
              <vs-input label="قیمت فروش کلی" v-model="variable['wholesale_price']" class="col-span-2"/>
              <vs-input label="کمترین مقدار خرید برای قیمت عمده" v-model="variable['minimum_wholesale']" class="col-span-2"/>
              <vs-input label="موجودی" v-model="variable['inventory']" class="col-span-2"/>
              <vs-input label="واحد" v-model="variable['unit']" class="col-span-2"/>
            </div>
          </vs-collapse-item>
        </vs-collapse>
        <tree-select v-model="product.variable.id" :options="variables" v-if="~~product.type === 2 && !product.variables.length" @input="variableValues(product.variable.id)"/>
        <vs-button v-if="~~product.type === 2" color="primary" class="col-span-2" @click.native="product.variables.push({id:null ,value:''})">افزودن ویژگی</vs-button>
      </tab-content>
      <tab-content title="ویژگی ها"></tab-content>
    </form-wizard>
  </vs-card>
</template>

<script>
function createTree(cats, disabled, id = null) {
  let catsFiltered = cats.filter(cat => cat.parent_id === id)

  catsFiltered.forEach(cat => {
    let disabledCat = 0
    if (!isNaN(disabled) && disabled > 0 && cat.id === disabled) {
      disabledCat = -1
    }

    if (!isNaN(disabledCat) && disabledCat === -1) {
      cat.isDisabled = true
    }

    let children = createTree(cats, disabled, cat.id)
    if (children.length) {
      cat.children = children
    }
  })
  return catsFiltered
}

import momentj from 'moment-jalaali'
import moment from 'moment'
import PersionDate from 'vue-persian-datetime-picker'
import Editor from "~/components/admin/Editor";

export default {
  name: "saveProduct",
  components: {
    Editor,
    PersionDate,
  },
  data() {
    return {
      product: {
        name: '',
        slug: '',
        sku: '',
        type: 1,
        published_at: '',
        attributes: [],
        variable: {
          id: '',
          values: []
        },
        variables: [],
      },
      types: [
        {
          id: 1,
          label: 'ساده',
        },
        {
          id: 2,
          label: 'متغیر',
        },
        {
          id: 3,
          label: 'دانلودی',
        },
      ]
    }
  },
  computed: {
    categories() {
      return createTree(this.$store.getters['storeCategory/getCategories'], false)
    },
    attributes() {
      let attributes = []
      this.$store.getters['attribute/getAttributes'].forEach(att => attributes.push({id: att.id, label: att.name}))
      return attributes
    },
    variables() {
      let variables = []
      this.$store.getters['attribute/getAttributes'].forEach(att => (att.is_variable ? variables.push({id: att.id, label: att.name}) : null))
      return variables
    }
  },
  methods: {
    variableLabel(){
      return (this.variables.find(v => v.id === this.product.variable.id)).label
    },
    variableValue(id){
      if (id === null) return ''
      return this.$store.getters['attribute/getAttribute']['values'].find(v => v.id === id).value
    },
    async normalizeAttributes(id) {
      if (id === null) return []
      await this.$store.dispatch('attribute/getAttribute', id)
      let attribute = this.$store.getters['attribute/getAttribute']
      let values = []
      attribute.values.forEach(val => values.push({id: val.id, label: val.value}))
      return values
    },
    async attributeValues(index, id) {
      this.product.attributes[index].vals = await this.normalizeAttributes(id)
      this.product.attributes[index].values = []
    },
    async variableValues(id) {
      this.product.variable.values = await this.normalizeAttributes(id)
    },
    normalizer(cat) {
      return {
        id: cat.id,
        label: cat.name,
        children: cat.children,
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch('storeCategory/getCategories')
    this.$store.dispatch('attribute/getAttributes')
  }
}
</script>
