<template>
  <form @submit.prevent="saveAttribute">
    <div class="vx-row">
      <div class="vx-col sm:w-1/3">
        <vs-card hover="true">
          <div slot="header">
            <h3>ویژگی</h3>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>نام</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-input class="w-full" v-model="attribute.name" v-validate="'required'" name="name" data-vv-as="نام ویژکی"/>
              <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>انتخاب نوع:</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-select v-model="attribute.type" class="w-full select-large" :disabled="!!lengthValues" v-validate="'required'" name="type" data-vv-as="نوع ویژکی">
                <vs-select-item :key="index" :value="item.code" :text="item.label" v-for="(item,index) in types" class="w-full"/>
              </vs-select>
              <span class="text-danger text-sm" v-show="errors.has('type')">{{ errors.first('type') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <vs-checkbox color="success" v-model="attribute.is_variable">این ویژگی متغیر محصول است</vs-checkbox>
            </div>
          </div>
          <div slot="footer">
            <vs-button color="success" :disabled="disable" type="filled" @click="saveAttribute">ذخیره</vs-button>
          </div>
        </vs-card>
      </div>
      <div class="vx-col sm:w-2/3">
        <vs-card hover="true">
          <div class="vx-row mb-6">
            <div class="vx-col w-full mb-6">
              <vs-button class="mb-6" color="primary" :disabled="disable" type="filled" @click="addAttribute">افزودن ویژگی</vs-button>
              <hr>
            </div>
            <div class="vx-col w-full mb-6" v-for="(item , index) in attribute.values">
              <div class="vx-row">
                <div class="vx-col">
                  <vs-button color="danger" type="filled" icon="delete" @click.native="removeAttribute(index)"></vs-button>
                </div>
                <div class="vx-col">
                  <div class="vx-row">
                    <div class="vx-col">
                      <span v-if="attribute.type === 2">نام</span>
                      <span v-else>مقدار</span>
                    </div>
                    <div class="vx-col">
                      <div v-if="attribute.type === 2">
                        <vs-input class="w-full" v-model="item.value" v-validate="'required'" :name="`value[${index}]`" data-vv-as="نام رنگ"/>
                        <span class="text-danger text-sm" v-show="errors.has(`value[${index}]`)">{{ errors.first(`value[${index}]`) }}</span>
                      </div>
                      <div v-else>
                        <vs-input class="w-full" v-model="item.value" v-validate="'required'" :name="`value[${index}]`" data-vv-as="مقدار ویژگی"/>
                        <span class="text-danger text-sm" v-show="errors.has(`value[${index}]`)">{{ errors.first(`value[${index}]`) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="attribute.type === 2" class="vx-col">
                  <div class="vx-row">
                    <div class="vx-col">
                      <span>رنگ</span>
                    </div>
                    <div class="vx-col">
                      <input type="color" class="w-10" v-model="item.code" name="" v-validate="'required'" :name="`code[${index}]`" data-vv-as="کد رنگ"/>
                      <span class="text-danger text-sm" v-show="errors.has(`code[${index}]`)">{{ errors.first(`code[${index}]`) }}</span>
                    </div>
                  </div>
                </div>
                <div v-else-if="attribute.type === 3" class="vx-col">
                  <div class="vx-row">
                    <div class="vx-col">
                      <span>واحد</span>
                    </div>
                    <div class="vx-col">
                      <vs-input class="w-full" v-model="item.unit" v-validate="'required'" :name="`unit[${index}]`" data-vv-as="واحد"/>
                      <span class="text-danger text-sm" v-show="errors.has(`unit[${index}]`)">{{ errors.first(`unit[${index}]`) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vs-card>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "save-attribute",
  props: {
    attribute: {
      required: true,
    },
    disable:{
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      dataTemplates: {
        value: {
          type1: {
            id: null,
            value: null
          },
          type2: {
            id: null,
            value: null,
            code: '#ffffff',
          },
          type3: {
            id: null,
            value: null,
            unit: null,
          },
        }
      },
      types: [
        {code: 1, label: 'ساده'},
        {code: 2, label: 'رنگ'},
        {code: 3, label: 'واحد'},
      ]
    }
  },
  watch: {
    '$store.state.attribute.errors': {
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
  computed: {
    lengthValues() {
      return this.attribute.values.length
    },
  },
  methods: {
    addAttribute() {
      let item = this.dataTemplates.value[`type${this.attribute.type}`]
      if (typeof item != "undefined") {
        item = JSON.parse(JSON.stringify(item))
        this.attribute.values.push(item)
      }
    },
    removeAttribute(index) {
      this.attribute.values.splice(index, 1)
    },
    saveAttribute() {
      if (this.disable){
        return
      }
      this.$validator.validateAll().then(validated => {
        if (validated) {
          this.$store.commit('attribute/SET_ATTRIBUTE' , this.attribute)
          this.$emit('save-attribute')
        }
      })
    },
  },
  created() {
  }
}
</script>
