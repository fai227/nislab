<template>
  <Section class="its">
    <Title :title="`ITS`" :sub-title="`Intelligent Transport Systems`" />
    <!-- eslint-disable vue/no-v-html -->
    <article class="its__content content">
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
    const its = allPages.find(post => post.fields.slug["en-US"] === 'its')
    return { body: its.fields.body["en-US"] }
  },
  head() {
    return {
      title: 'ITS | NISLAB',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'ITS | NISLAB',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.its {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }
}
</style>
