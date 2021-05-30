<template>
  <div>
    <SaveAttributes :attributes="attributes" :disable="disabled" @save-attributes="saveAttributes"/>
  </div>
</template>

<script>
import SaveAttributes from "~/components/admin/SaveAttributes";

export default {
  name: "update",
  components: {SaveAttributes},
  validate({params}) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      attribute: {},
      attributes: [],
      disabled: false,
      saveStatus: []
    }
  },
  async fetch() {
    await this.$store.dispatch('attribute/getAttribute', this.$route.params.id)
    this.attribute = this.$store.getters["attribute/getAttribute"]
    await this.$store.dispatch('attribute/getAttributes', {
      name: this.attribute.name
    })
    this.attributes = this.$store.getters["attribute/getAttributes"]
  },
  methods: {
    saveAttributes() {
      this.attributes.forEach(this.saveAttribute)
    },
    async saveAttribute(attribute, index) {
      this.disabled = true
      return await this.$store.dispatch(`attribute/${(attribute.id ? 'update' : 'store')}Attribute`, attribute).then((response) => {
        if (response.status === 200) {
          this.saveStatus[index] = true
          attribute.id = response.data.attribute.id
        }
      }).catch(error => {
        this.saveStatus[index] = false
        if (error.response && error.response.status === 422) {
          this.$store.commit('attribute/SET_ERRORS', {index: index, errors: error.response.data.errors})
        }
      }).then(() => {
        if (index === this.attributes.length - 1 && this.saveStatus.length === this.attributes.length && !this.saveStatus.includes(false)) {
          this.$vs.notify({
            title: "با موفقیت ویژگی ها ساخته شد",
            text: "چند لحظه دیگر به صفحه ویژگی ها هدایت خواهید شد.",
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
          setTimeout(() => {
            this.$router.push('.')
          }, 2100)
        } else {
          this.disabled = false
        }
      })
    }
  },
  destroyed() {
    this.$store.commit('attribute/SET_ATTRIBUTE')
  }
}
</script>

<style scoped>

</style>
