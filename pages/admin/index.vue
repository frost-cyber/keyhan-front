<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mb-base"
            icon="CpuIcon"
            icon-right
            statistic="86%"
            statisticTitle="CPU Usage"/>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mb-base"
            icon="ServerIcon"
            icon-right
            statistic="1.2gb"
            statisticTitle="Memory Usage"
            color="success"/>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mb-base"
            icon="ActivityIcon"
            icon-right
            statistic="0.1%"
            statisticTitle="Downtime Ratio"
            color="danger"/>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
            hideChart
            class="mb-base"
            icon="AlertOctagonIcon"
            icon-right
            statistic="13"
            statisticTitle="Issues Found"
            color="warning"/>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 mt-3">
      <vs-card class="col-span-1">
        <div slot="header">
          <h4 class="contents">نظرات محصولات</h4>
          <vs-button redius color="primary" class="float-left" type="filled" icon="refresh" @click.native="getProductsComment"/>
        </div>
        <vs-table ref="table" :data="productsComment" v-if="productsComment.length">
          <template slot="thead">
            <vs-th>نظرات</vs-th>
            <vs-th>تاریخ</vs-th>
            <vs-th>وضعیت</vs-th>
          </template>
          <template slot-scope="{data}">
            <tbody>
            <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
              <vs-td>{{ tr.body.substr(0, 20) + (tr.body.substr(0, 20).length < tr.body.length ? '...' : '') }}</vs-td>
              <vs-td>
                <p class="">{{ $jalaali(tr.created_at).format('jYYYY/jMM/jDD') }}</p>
              </vs-td>
              <vs-td>
                <vs-switch @input="productChangeConfirmed(tr.id)" color="success" v-model="tr.confirmed">
                  <span slot="on">تایید شده</span>
                  <span slot="off">تایید نشده</span>
                </vs-switch>
              </vs-td>

            </vs-tr>
            </tbody>
          </template>
        </vs-table>
        <h4 class="text-center text-primary"  v-else>
          نظر جدیدی ندارید
        </h4>
      </vs-card>
      <vs-card class="col-span-1">
        <div slot="header">
          <h4 class="contents">نظرات وبلاگ</h4>
          <vs-button redius color="primary" class="float-left" type="filled" icon="refresh" @click.native="getArticlesComment"/>
        </div>
        <vs-table ref="table" :data="articlesComment" v-if="articlesComment.length">
          <template slot="thead">
            <vs-th>نظرات</vs-th>
            <vs-th>تاریخ</vs-th>
            <vs-th>وضعیت</vs-th>
          </template>
          <template slot-scope="{data}">
            <tbody>
            <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">
              <vs-td>{{ tr.body.substr(0, 20) + (tr.body.substr(0, 20).length < tr.body.length ? '...' : '') }}</vs-td>
              <vs-td>
                <p class="">{{ $jalaali(tr.created_at).format('jYYYY/jMM/jDD') }}</p>
              </vs-td>
              <vs-td>
                <vs-switch @input="articleChangeConfirmed(tr.id)" color="success" v-model="tr.confirmed">
                  <span slot="on">تایید شده</span>
                  <span slot="off">تایید نشده</span>
                </vs-switch>
              </vs-td>

            </vs-tr>
            </tbody>
          </template>
        </vs-table>
        <h4 class="text-center text-primary"  v-else>
          نظر جدیدی ندارید
        </h4>
      </vs-card>
    </div>
  </div>

</template>

<script>
import StatisticsCardLine from '~/components/statistics-cards/StatisticsCardLine.vue'

export default {
  name: 'Dashboard',
  components: {
    StatisticsCardLine
  },
  computed: {
    articlesComment() {
      return this.$store.getters['articleComment/getComments']
    },
    productsComment() {
      return this.$store.getters['productComment/getComments']
    }
  },
  methods: {
    productChangeConfirmed(id) {
      this.$store.dispatch('productComment/toggleConfirm', id)
    },
    articleChangeConfirmed(id) {
      this.$store.dispatch('articleComment/toggleConfirm', id)
    },
    getArticlesComment() {
      this.$store.dispatch('articleComment/getComments', {limit: 5, confirmed: 0})
    },
    getProductsComment() {
      this.$store.dispatch('productComment/getComments', {limit: 5, confirmed: 0})
    }
  },
  fetch() {
    this.getProductsComment()
    this.getArticlesComment()
  }
};
</script>
