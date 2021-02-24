<template>
  <div class="vx-row">
    <div class="vx-col sm:w-1/5">
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>نام</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <vs-input class="w-full" v-model="attribute.name"/>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>انتخاب نوع:</span>
        </div>
        <div class="vx-col sm:w-2/3 w-full">
          <vs-select v-model="attribute.type" class="w-full select-large" :disabled="!!lengthValues">
            <vs-select-item :key="index" :value="item.code" :text="item.label" v-for="(item,index) in types" class="w-full"/>
          </vs-select>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <vs-checkbox color="success" v-model="attribute.is_variable">این ویژگی متغیر محصول است</vs-checkbox>
        </div>
      </div>
    </div>
    <div class="vx-col sm:w-4/5">
      <div class="vx-row mb-6">
        <div class="vx-col w-full mb-6">
          <vs-button class="mb-6" color="primary" type="filled" @click="addAttribute">افزودن ویژگی</vs-button>
          <hr>
        </div>
        <div class="vx-col w-full mb-6" v-for="(item , index) in attribute.values">
          <div class="vx-row">
            <div class="vx-col">
              <vs-button color="danger" type="filled" @click.native="removeAttribute(index)">حذف ویژگی</vs-button>
            </div>
            <div class="vx-col">
              <div class="vx-row">
                <div class="vx-col sm:w-1/3 w-full">
                  <span v-if="attribute.type === 2">نام</span>
                  <span v-else v-show="consoleLog">مقدار</span>
                </div>
                <div class="vx-col sm:w-2/3 w-full">
                  <vs-input v-if="attribute.type === 2" class="w-full" v-model="item.name"/>
                  <vs-input v-else class="w-full" v-model="item.value"/>
                </div>
              </div>
            </div>
            <div v-if="attribute.type === 2" class="vx-col">
              <div class="vx-row">
                <div class="vx-col sm:w-1/3 w-full">
                  <span>رنگ</span>
                </div>
                <div class="vx-col sm:w-2/3 w-full">
                  <vs-input type="color" class="w-full" v-model="item.color"/>
                </div>
              </div>
            </div>
            <div v-else-if="attribute.type === 3" class="vx-col">
              <div class="vx-row">
                <div class="vx-col sm:w-1/3 w-full">
                  <span>واحد</span>
                </div>
                <div class="vx-col sm:w-2/3 w-full">
                  <vs-input class="w-full" v-model="item.unit"/>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "create",
  data() {
    return {
      attribute: {
        name: null,
        type: null,
        is_variable: false,
        values: []
      },
      dataTemplates: {
        value: {
          type1: {
            id: null,
            value: null
          },
          type2: {
            id: null,
            name: null,
            code: null,
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
  computed: {
    lengthValues() {
      return this.attribute.values.length
    },
    consoleLog() {
      console.log(this.attribute)
      return this.attribute.type
    }
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
    validateStep1() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-1').then(result => {
          if (result) {
            resolve(true)
          } else {
            reject('correct all values')
          }
        })
      })
    },
  }
}
</script>

<style scoped>

</style>
