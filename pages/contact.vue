<template>
  <Section class="contact">
    <Title :title="`Contact`" :sub-title="`お問い合わせ`" />
    <!-- eslint-disable vue/no-v-html -->
    <article class="contact__content content">
      <div v-html="$md.render(body)" />
    </article>
    <ReturnPage />
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
  async asyncData({$content}) {
    const allPages = await loadAllPages({ $content })
    const contact = allPages.find(post => post.fields.slug["en-US"] === 'contact')
    return { body: contact.fields.body["en-US"] }
  },
  head() {
    return {
      title: 'お問い合わせ | NISLAB',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'お問い合わせ | NISLAB',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.contact {
  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 8rem;
  }
}
</style>
