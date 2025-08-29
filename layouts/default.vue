<template>
  <div>
    <Header class="l-header" />
    <GlobalNav class="l-globalNav" :class="[isOpen ? 'open' : 'close']" />
    <main class="l-main" :class="{ lower: lowerPage }">
      <Nuxt />
    </main>
    <ReturnTop />
    <Footer class="l-footer" />
  </div>
</template>

<script>
import { Header, Footer, ReturnTop } from '~/components/layouts/index'
import { GlobalNav } from '~/components/common/index'

export default {
  components: {
    Header,
    Footer,
    ReturnTop,
    GlobalNav,
  },
  data() {
    return {
      lowerPage: false,
      path: this.$route.path,
    }
  },
  computed: {
    isOpen() {
      return this.$store.state.isOpen
    },
  },
  watch: {
    $route(to) {
      this.path = to.path
      to.path === '/' ? (this.lowerPage = false) : (this.lowerPage = true)
    },
    isOpen: {
      handler() {
        if (this.isOpen === true) {
          document.body.classList.add('overflow-y-hidden')
          document.addEventListener('touchmove', this.handleTouchMove, {
            passive: false,
          })
        } else {
          document.body.classList.remove('overflow-y-hidden')
          document.removeEventListener('touchmove', this.handleTouchMove, {
            passive: false,
          })
        }
      },
    },
  },
  mounted() {
    this.path === '/' ? (this.lowerPage = false) : (this.lowerPage = true)
  },
  methods: {
    handleTouchMove(event) {
      event.preventDefault()
    },
  },
}
</script>

<style lang="scss" scoped>
.l-header {
  position: fixed;
  top: 32px;
  right: 0;
  left: 0;
  margin: 0 auto;

  @include mq(desk) {
    top: 0;
  }
}
.l-main {
  max-width: 100vw;
  min-height: 100vh;
}

.l-globalNav {
  z-index: 20;
  transition: all 0.5s;
}

.open {
  transform: translateX(0);
}

.close {
  transform: translateX(100%);
}

.l-footer {
  width: 100vw;
}
</style>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.overflow-y-hidden {
  overflow-y: hidden;
}
</style>
