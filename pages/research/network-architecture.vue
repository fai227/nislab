<template>
  <Section class="networkArchitecture">
    <Title :title="`Network`" :sub-title="`Network Architecture`" />
    <!-- eslint-disable vue/no-v-html -->
    <article class="networkArchitecture__content content">
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
    const network = allPages.find(post => post.fields.slug["en-US"] === 'network-architecture')
    return { body: network.fields.body["en-US"] }
  },
  head() {
    return {
      title: 'Network Architecture | NISLAB',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Network Architecture | NISLAB',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.networkArchitecture {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }
}
</style>
