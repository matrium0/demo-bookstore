<template>
  author table
  {{ authors }}

  <ul>
    <li v-for="author in authors" :key="author.id">
      {{ author.firstname }}|{{ author.lastname }}|{{ author }}
    </li>

  </ul>
</template>

<script setup lang="ts">
import type {EnrichedAuthor} from '../../../../react/src/mock-backend/author/EnrichedAuthor';

const props = defineProps<{
  authors: EnrichedAuthor[]
}>()
// interface AuthorTableProps {
//   authors: EnrichedAuthor[]
// }

// export default {
//   props: {
//     authorNumber: Number,
//     authors: {
//       type: Object as () => EnrichedAuthor,
//       required: true
//     }
//   }
// }
// }
// export default {
//   props: {
//     title: String,
//     likes: Number
//   }
// }
</script>

<style scoped>

</style>
