<template>
  <form @submit.prevent="saveArticle">
    <div class="vx-row">
      <div class="vx-col sm:w-1/3">
        <vs-card hover="true">
          <div slot="header">
            <h3> مطلب</h3>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>دسته:</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <tree-select  label="name" v-validate="'required'" name="category" :normalizer="normalizer"  v-model="article.categories" :options="categories" data-vv-as="دسته"/>
              <span class="text-danger text-sm" v-show="errors.has('category')">{{ errors.first('category') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>تگ:</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <v-select v-model="article.tags" name="tag" v-validate="'required'" taggable multiple :options="tags" data-vv-as="تگ"/>
              <span class="text-danger text-sm" v-show="errors.has('tag')">{{ errors.first('tag') }}</span>

            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>وضعیت:</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-select v-model="article.status" class="w-full select-large" v-validate="'required'" name="status" data-vv-as="وضعیت">
                <vs-select-item :key="index" :value="item.code" :text="item.label" v-for="(item,index) in status" class="w-full"/>
              </vs-select>
              <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>

            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>تاریخ انتشار مطلب:</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <div class="mt-2">
                <persion-date class="w-full" v-model="article.published_at" style="width:100%" v-validate="'required'" name="published_at" data-vv-as="تاریخ انتشار"/>
                <span class="text-danger text-sm" v-show="errors.has('published_at')">{{ errors.first('published_at') }}</span>
              </div>

            </div>
          </div>
          <div class="w-full m-5">
            <img class="articleImage" :src="article.thumbnail.link||require('@/assets/images/Flag_of_None.png')" @click="selectFile"/>
            <vs-row vs-justify="flex-start">
              <vs-button @click.native="article.thumbnail = {}" color="danger"> حذف عکس</vs-button>
            </vs-row>
          </div>
        </vs-card>
        <vs-card>
          <h3>متا تگ ها</h3>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-3/3 w-full">
              <span>کلید واژه ها:</span>
            </div>
            <div class="vx-col sm:w-3/3 w-full">
              <vs-input class="w-full" v-model="article.meta.keywords" v-validate="'required'" name="meta.keywords" data-vv-as="کلید واژه ها"/>
              <span class="text-danger text-sm" v-if="errors.has('meta.keywords')">{{ errors.first('meta.keywords') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-3/3 w-full">
              <span>توضیحات:</span>
            </div>
            <div class="vx-col sm:w-3/3 w-full">
              <vs-textarea v-model="article.meta.description" v-validate="'required'" name="meta.description" data-vv-as="توضیحات"/>
              <span class="text-danger text-sm" v-if="errors.has('meta.description')">{{ errors.first('meta.description') }}</span>
            </div>
          </div>
        </vs-card>
      </div>
      <div class="vx-col sm:w-2/3">
        <vs-card hover="true">
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-3/3 w-full">
              <span>عنوان</span>
              <vs-input class="w-full" v-model="article.title" v-validate="'required'" name="title" data-vv-as="عنوان مطلب"/>
              <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first('title') }}</span>
            </div>
            <div class="vx-col sm:w-3/3 w-full">
              <span>نامک:</span>
              <vs-input class="w-full" v-model="article.slug" v-validate="'required'" name="slug" data-vv-as="نشانک "/>
              <br>
              <span class="text-danger text-sm" v-show="errors.has('slug')">{{ errors.first('slug') }}</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <span>مطلب:</span>
            </div>
            <div class="vx-col sm:w-3/3 w-full">
              <editor v-model="article.body" v-validate="'required'" name="body" data-vv-as="مطلب" rows="5"/>
              <span class="text-danger text-sm" v-show="errors.has('body')">{{ errors.first('body') }}</span>

            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <span>توضیحات</span>
            </div>
            <div class="vx-col sm:w-3/3 w-full">
              <vs-textarea v-model="article.description" v-validate="'required'" name="description" data-vv-as="توضیحات" rows="5"/>
              <span class="text-danger text-sm" v-show="errors.has('description')">{{ errors.first('description') }}</span>

            </div>
            <div slot="footer">
              <vs-button color="success" :disabled="disable" type="filled" @click="saveArticle">ذخیره</vs-button>
            </div>
          </div>
        </vs-card>
      </div>
    </div>
  </form>
</template>

<script>
import vSelect from 'vue-select'
import PersionDate from 'vue-persian-datetime-picker'
import Editor from "~/components/admin/Editor";
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

export default {
  name: "save-article",
  components: {
    Editor,
    PersionDate,
    'v-select': vSelect
  },
  props: {
    article: {
      required: true,
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      status: [
        {code: 'active', label: 'فعال'},
        {code: 'deactive', label: 'غیرفعال'}
      ]
    }
  },
  watch: {
    '$store.state.article.errors': {
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
    tags(){
      return this.$store.getters['article/getTags']
    },
    categories() {
      return createTree(this.$store.getters['articleCategory/getCategories'], false)
    },
  },
  methods: {
    normalizer(cat) {
      return {
        id: cat.id,
        label: cat.name,
        children: cat.children,
      }
    },
    selectFile() {
      let input = document.createElement('input')
      input.type = 'file'
      input.onchange = this.uploadFile
      input.click()
    },
    async uploadFile(event) {
      let file = event.target.files[0]
      await this.$store.dispatch('files/uploadArticleImage', file).then(res => {
        this.article.thumbnail = res.data
      }).catch(error => {
        if (error.response.status === 422) {
          this.$vs.notify({
            title: 'درخواست شما با خطا مواجه شد',
            text: error.response.data.errors.file[0],
            color: 'danger',
          })
        }
      })
    },
    successUpload(event) {
      let response = (JSON.parse(event.currentTarget.response))
      this.article.image_id = response.uploaded.id
      this.$vs.notify({color: 'success', title: 'با موفقیت آپلود شد'})
    },
    saveArticle() {
      if (this.disable) {
        return
      }
      this.$validator.validateAll().then(validated => {
        if (validated) {
          this.$emit('save-article')
        }
      })
    },
  },
  fetch() {
    this.$store.dispatch('article/getTags')
    this.$store.dispatch('articleCategory/getCategories')
  },
}
</script>
<style scoped>
.articleImage {
  border: 2px dashed #636363;
  height: 200px;
  width: 100%;

}
</style>
