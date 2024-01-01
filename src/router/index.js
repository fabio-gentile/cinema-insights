import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes.js'
import { DEFAULT_TITLE } from "@/router/routes.js";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const titleParam = to.params.title
  const title = to.meta.title

  // check if meta title in routes configuration
  if (title) {
    document.title = title
  }

  if (titleParam) {
    const extractedText = titleParam
      .replaceAll('-', ' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

    const title = `${extractedText} - ${DEFAULT_TITLE}`
    document.title = title
  }

  next()
})

export default router
