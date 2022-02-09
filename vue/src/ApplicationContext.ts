import {reactive} from 'vue'

export const applicationContext = reactive<{ user?: string }>({
  user: "your-username"
})
