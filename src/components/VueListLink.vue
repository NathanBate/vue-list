<template>
  <InertiaLink v-if="inertiaLinks === true" :href="href"><slot/></InertiaLink>
  <a v-else :href="href"><slot/></a>
</template>

<script>
import { Link } from '@inertiajs/inertia-vue3'

export default {
  props: {
    href: {
      required: true,
      type: String
    }
  },
  inject: ['inertiaLinks'],
  components: {
    InertiaLink : Link
  },
}
</script>