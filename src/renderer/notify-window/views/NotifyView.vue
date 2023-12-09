<script setup>
import { useNotification, NAvatar } from 'naive-ui'
import { h, onMounted, onBeforeUnmount } from 'vue'
import NotifyWithPoster from '@notify/components/NotifyWithPoster.vue'

const notification = useNotification()
let rectsInterval = null

const notifyTypes = {
  withPoster: ({ id, title, description, content, meta, poster, duration, closable, keepAliveOnHover }) => ({
    content: () => h(NotifyWithPoster, {
      title,
      poster,
      description,
      content,
      onOpen: () => window.api.notifyEvent(id, 'openRelease'),
      onWatch: () => window.api.notifyEvent(id, 'watchEpisode')
    }),
    duration,
    closable,
    meta,
    keepAliveOnHover
  }),
  default: ({ title, description, content, meta, duration, closable, avatar, keepAliveOnHover }) => ({
    title,
    description,
    content,
    meta,
    duration,
    closable,
    keepAliveOnHover,
    avatar: avatar
      ? () => h(NAvatar, {
          size: 'small',
          round: true,
          src: avatar
        })
      : null
  })
}

onMounted(() => {
  rectsInterval = setInterval(() => {
    window.api.setShape(
      [...document.querySelectorAll('.n-notification')]
        .map(notify => {
          const n = notify.getBoundingClientRect()
          return {
            x: Math.trunc(n.x),
            y: Math.trunc(n.y),
            width: Math.trunc(n.width),
            height: Math.trunc(n.height)
          }
        })
    )
  }, 10)

  window.api.setNotifyHandler((options) => {
    const data = notifyTypes[options.type || 'default'](options)
    data.onClose = () => window.api.notifyClosed(options.id)
    data.onAfterLeave = () => window.api.notifyLeave(options.id)
    notification.create(data)
  })

  window.api.ready()
})

onBeforeUnmount(() => {
  clearInterval(rectsInterval)
  window.api.removeNotifyHandler()
})
</script>

<style scoped>

</style>
