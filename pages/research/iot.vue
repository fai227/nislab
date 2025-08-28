<template>
  <Section class="iot">
    <Title :title="`IoT`" :sub-title="`Internet of Things`" />
    <!-- eslint-disable vue/no-v-html -->
    <article class="iot__content content">
      <div v-html="$md.render(body)" />
    </article>
    <ReturnPage text="研究一覧へ" slug="/research" />
  </Section>
</template>

<script>
import { Section, Title, ReturnPage } from '~/components/utility/index'
import { loadAllPages } from '~/plugins/content_loader'

export default {
  components: {
    Section,
    Title,
    ReturnPage,
  },
  async asyncData({ $content }) {
    const allPages = await loadAllPages({ $content })
    const iot = allPages.find(post => post.fields.slug["en-US"] === 'iot')
    return { body: iot.fields.body["en-US"] }
  },
  head() {
    return {
      title: 'IoT | NISLAB',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'IoT | NISLAB',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.iot {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }
}
</style>
