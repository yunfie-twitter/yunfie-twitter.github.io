<script setup lang="ts">
import { ref } from 'vue'
import { siteConfig } from '../data/site'
import SectionHeader from './SectionHeader.vue'

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
  <section id="contact" class="home-section">
    <SectionHeader
      index="06 — Contact"
      title="Contact"
      description="お問い合わせ・ご連絡はこちらから。"
    />

    <div class="home-contact">
      <div>
        <p class="home-contact__desc">{{ contact.description }}</p>
        <a class="home-contact__mail" :href="`mailto:${contact.email}`">
          {{ contact.email }}
        </a>
      </div>

      <form class="home-form" @submit.prevent="submit">
        <label class="home-field">
          <span>Name</span>
          <input v-model="name" name="name" type="text" autocomplete="name" placeholder="お名前" />
        </label>
        <label class="home-field">
          <span>Email</span>
          <input
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            placeholder="返信先メールアドレス"
          />
        </label>
        <label class="home-field">
          <span>Subject</span>
          <input v-model="subject" name="subject" type="text" placeholder="件名" required />
        </label>
        <label class="home-field">
          <span>Message</span>
          <textarea v-model="message" name="message" rows="4" placeholder="お問い合わせ内容" required />
        </label>
        <button type="submit" class="home-submit">メールを作成する</button>
      </form>
    </div>
  </section>
</template>
