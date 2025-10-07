<template>
  <div class="globalNav">
    <Nav />
  </div>
</template>

<script>
import { Nav } from '~/components/common/index'
export default {
  components: {
    Nav,
  },
}
</script>

<style lang="scss" scoped>
.globalNav {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 64px;
  overflow-y: auto;
  background-color: $main-color;
}
</style>
