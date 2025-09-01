<template>
  <footer class="footer">
    <article class="footer__grid">
      <div class="footer__info">
        <NislabDark class="footer__logo" aria-label="NISLAB" />
        <address class="footer__address">
          <span class="-mb">〒610-0321 京都府京田辺市多々羅都谷1-3</span>
          <span>同志社大学 理工学部 情報システムデザイン学科</span>
          <span>同志社大学大学院 理工学研究科 情報工学専攻</span>
          <span>ネットワーク情報システム研究室（佐藤研究室）</span>
        </address>
      </div>
      <div class="footer__contents">
        <div class="footer__link">
          <a href="https://www.doshisha.ac.jp/" target="blank">同志社大学</a
          ><NewTab class="footer__newTab" />
        </div>
        <div class="footer__link">
          <a href="http://mrc.doshisha.ac.jp/" target="blank"
            >同志社大学モビリティ研究センター</a
          ><NewTab class="footer__newTab" />
        </div>
        <div class="footer__link">
          <a href="https://www.nces.i.nagoya-u.ac.jp/" target="blank"
            >名古屋大学組込みシステム研究センター</a
          ><NewTab class="footer__newTab" />
        </div>
        <div class="footer__link">
          <a href="https://be.contentful.com/login" target="blank">ログイン</a
          ><NewTab class="footer__newTab" />
        </div>
      </div>
    </article>
    <article class="footer__sub">
      <div class="footer__siteLinks">
        <nuxt-link to="/privacy-policy" class="footer__siteLink"
          >プライバシーポリシー</nuxt-link
        >
        <nuxt-link to="/disclaimer" class="footer__siteLink"
          >免責事項</nuxt-link
        >
      </div>
      <small class="footer__copy">&copy; {{ new Date().getFullYear() }} NISLAB.</small>
    </article>
  </footer>
</template>

<script>
import { NislabDark, NewTab } from '~/components/assets/index'

export default {
  components: {
    NislabDark,
    NewTab,
  },
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 3rem 3rem 0;
  color: #fff;
  background-color: $main-color;

  @include mq(tab) {
    padding: 1.5rem 1.5rem 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 1rem;

    @include mq(tab) {
      grid-template-columns: 1fr;
    }
  }

  &__logo {
    width: 320px;
    max-width: 100%;
    margin-top: 0.25rem;

    @include mq(tab) {
      display: block;
      margin: 0 auto;
    }
  }

  &__info,
  &__contents {
    padding: 1rem 0;
  }

  &__address {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    font-size: 0.875rem;
    font-style: normal;

    .-mb {
      margin-bottom: 0.5rem;
    }

    @include mq(tab) {
      align-items: center;
    }
  }

  &__contents {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @include mq(tab) {
      align-items: center;
    }

    & > :nth-last-child(2) {
      padding: 0 0 1.5rem 1rem;
      border-bottom: 1px solid $sub-color;

      @include mq(tab) {
        padding: 0 0 1.5rem 0;
      }
    }

    & > :last-child {
      padding-top: 1.5rem;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    line-height: 2em;

    @include mq(tab) {
      font-size: 0.825rem;
    }
  }

  &__newTab {
    height: 1rem;
    margin-left: 0.5rem;
  }

  &__login {
    padding: 0.5rem 3rem;
    margin-top: 2rem;
    font-family: $font-set-en;
    font-weight: bold;
    color: $main-color;
    background-color: $sub-color;
    border-radius: 24px;
  }

  &__siteLinks {
    display: flex;
    margin-top: 2rem;
    font-size: 0.75rem;
  }

  &__siteLink {
    padding: 0 0.5rem;
  }

  &__sub {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__copy {
    margin: 0.5rem 0;
    font-size: 0.75rem;
  }

  a {
    transition: 0.1s;
  }

  a:hover {
    color: #dedede;
    transition: 0.3s;
  }
}
</style>
