<template>
  <article>
    <Section class="publications">
      <Title :title="`Publications`" :sub-title="`研究業績`" />
      <!-- eslint-disable vue/no-v-html -->
      <article class="publications__content content">
        <h3 class="publications__title">{{ publication.fields.title['en-US'] }}</h3>
        <div v-html="$md.render(publication.fields.body['en-US'])" />
      </article>
      <ReturnPage />
    </Section>
    <Section :bg="`#eee`">
      <h3 class="publications__listTitle">研究業績一覧</h3>
      <PublicationsList />
    </Section>
  </article>
</template>

<script>
import { PublicationsList } from '~/components/common/index'
import { Section, Title, ReturnPage } from '~/components/utility/index'
import { loadAllPublications } from '~/plugins/content_loader'

export default {
  components: {
    PublicationsList,
    Section,
    Title,
    ReturnPage,
  },
  async asyncData({ $content, params }) {
    const allPublications = await loadAllPublications({ $content })
    const publication = allPublications.find(pub => pub.fields.slug["en-US"] === params.publication)
    return { publications: allPublications, publication }
  },
  head({ $config }) {
    return {
      title: this.publication.fields.title['en-US'] + ' | NISLAB',
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: $config.baseURL + this.$route.path.substr(1),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.publication.fields.title['en-US'] + ' | NISLAB',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.publications {
  &__title {
    margin-bottom: 2.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
  }

  &__content {
    width: $content-width;
    max-width: 90%;
    margin: 4rem auto 0;
  }

  &__listTitle {
    margin-bottom: 2.5rem;
    font-size: 1.25rem;
    text-align: center;
  }
}
</style>
