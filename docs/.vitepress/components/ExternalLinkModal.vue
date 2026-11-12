<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(false)
const url = ref('')

const open = (href: string) => {
  url.value = href
  visible.value = true
}

const close = () => {
  visible.value = false
}

const onClick = (event: MouseEvent) => {
  const target = event.target
  if (!(target instanceof Element)) return
  const link = target.closest('a[target="_blank"]')
  if (!(link instanceof HTMLAnchorElement)) return
  if (link.dataset.noModal === 'true') return
  const href = link.getAttribute('href')
  if (!href || href === '#') return
  event.preventDefault()
  open(href)
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('click', onClick)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="ext-modal-title"
    @click.self="close"
  >
    <div class="w-full max-w-md rounded-lg bg-[var(--vp-c-bg)] p-6 shadow-xl">
      <p id="ext-modal-title" class="m-0 mb-2 font-bold text-main">外部サイトへ移動します</p>
      <p class="mb-6 break-all text-sm text-secondary">{{ url }}</p>
      <div class="flex justify-end gap-2">
        <button
          type="button"
          class="cursor-pointer rounded-md border border-main px-4 py-2 text-sm text-main"
          @click="close"
        >
          キャンセル
        </button>
        <a
          :href="url"
          target="_blank"
          rel="noopener noreferrer"
          data-no-modal="true"
          class="rounded-md bg-primary px-4 py-2 text-sm text-white no-underline"
        >
          移動する ↗
        </a>
      </div>
    </div>
  </div>
</template>
