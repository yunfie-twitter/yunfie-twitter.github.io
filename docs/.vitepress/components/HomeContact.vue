<script setup lang="ts">
import { ref } from 'vue'
import { siteConfig } from '../data/site'

const { contact } = siteConfig
const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')

const submit = () => {
  const body = [
    name.value ? `お名前: ${name.value}` : '',
    email.value ? `返信先: ${email.value}` : '',
    '',
    message.value
  ]
    .filter((line, index) => line || index === 2)
    .join('\n')

  const mailto = new URL(`mailto:${contact.email}`)
  mailto.searchParams.set('subject', subject.value || 'お問い合わせ')
  mailto.searchParams.set('body', body)
  window.location.href = mailto.toString()
}
</script>

<template>
  <section id="contact" class="mx-auto max-w-5xl px-6 py-12">
    <div
      class="grid gap-8 rounded-2xl border border-main bg-[var(--vp-c-bg-brand)] p-8 sm:grid-cols-2"
    >
      <div>
        <span class="text-xs font-semibold uppercase tracking-widest text-primary-default">
          CONTACT
        </span>
        <h2 class="mt-2 mb-4 text-3xl font-bold">CONTACT</h2>
        <p class="text-secondary">{{ contact.description }}</p>
        <a class="text-primary-default underline" :href="`mailto:${contact.email}`">
          {{ contact.email }}
        </a>
      </div>

      <form class="flex flex-col gap-3" @submit.prevent="submit">
        <label class="flex flex-col gap-1 text-xs font-semibold text-secondary">
          NAME
          <input v-model="name" name="name" type="text" autocomplete="name" placeholder="お名前" class="rounded-md border border-main bg-[var(--vp-c-bg)] px-3 py-2 text-sm font-normal text-main" />
        </label>
        <label class="flex flex-col gap-1 text-xs font-semibold text-secondary">
          EMAIL
          <input v-model="email" name="email" type="email" autocomplete="email" placeholder="返信先メールアドレス" class="rounded-md border border-main bg-[var(--vp-c-bg)] px-3 py-2 text-sm font-normal text-main" />
        </label>
        <label class="flex flex-col gap-1 text-xs font-semibold text-secondary">
          SUBJECT
          <input v-model="subject" name="subject" type="text" placeholder="件名" required class="rounded-md border border-main bg-[var(--vp-c-bg)] px-3 py-2 text-sm font-normal text-main" />
        </label>
        <label class="flex flex-col gap-1 text-xs font-semibold text-secondary">
          MESSAGE
          <textarea v-model="message" name="message" rows="5" placeholder="お問い合わせ内容" required class="rounded-md border border-main bg-[var(--vp-c-bg)] px-3 py-2 text-sm font-normal text-main" />
        </label>
        <button
          type="submit"
          class="cursor-pointer rounded-md bg-primary px-5 py-2 font-semibold text-white"
        >
          メールを作成する
        </button>
      </form>
    </div>
  </section>
</template>
