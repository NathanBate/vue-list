<template>
  <InertiaLink v-if="inertiaLinks === true" :href="href"><!-- inertia link --><slot/></InertiaLink>
  <a v-else :href="href"><slot/></a>
</template>

<script>
import { Link } from '@inertiajs/inertia-vue3'

export default {
  props: {
    href: {
      required: true,
      type: String
    },
    inertiaLinks: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  components: {
    InertiaLink : Link
  },
}
</script>