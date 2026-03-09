<template>
  <div class="bottom-bar">
    <div class="left">
      <span class="greeting">{{ greeting }}</span>
      <span class="sep">·</span>
      <span class="mono">press enter to search</span>
    </div>
    <div class="right mono">
      {{ dayCount }} days since {{ profile.startDate || '2024-01-01' }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  profile: Object,
})

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h <  5) return '🌙 burning midnight oil'
  if (h < 12) return '☀ good morning'
  if (h < 17) return '⛅ good afternoon'
  if (h < 21) return '🌆 good evening'
  return '🌙 good night'
})

const dayCount = computed(() => {
  const start = new Date(props.profile.startDate || '2024-01-01')
  return Math.floor((new Date() - start) / 86400000)
})
</script>

<style scoped>
.bottom-bar {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.left,
.right {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: .68rem;
  color: var(--text-muted);
}

.greeting {
  color: var(--text);
  font-size: .72rem;
}

.sep { opacity: .4; }

.mono {
  font-family: var(--font-mono);
  font-size: .68rem;
}
</style>
