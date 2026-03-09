<template>
  <div class="search-wrap" :class="{ focused }">
    <span class="search-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    </span>

    <input
      ref="inputRef"
      v-model="query"
      :placeholder="search.placeholder"
      @keydown.enter="go"
      @focus="focused = true"
      @blur="focused = false"
      spellcheck="false"
      autocomplete="off"
    />

    <button class="engine-badge" @click="cycleEngine" title="Click to switch engine">
      {{ currentEngine }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  search: Object,
  theme:  Object,
})

const query        = ref('')
const focused      = ref(false)
const engineKey    = ref(props.search.engine || 'google')
const inputRef     = ref(null)

const engineNames  = computed(() => Object.keys(props.search.engines))
const currentEngine = computed(() => engineKey.value)

function cycleEngine() {
  const keys = engineNames.value
  const idx  = keys.indexOf(engineKey.value)
  engineKey.value = keys[(idx + 1) % keys.length]
}

function go() {
  const val = query.value.trim()
  if (!val) return
  const isUrl = /^(https?:\/\/|www\.)/.test(val)
  if (isUrl) {
    window.location.href = val.startsWith('http') ? val : `https://${val}`
  } else {
    const base = props.search.engines[engineKey.value]
    window.location.href = base + encodeURIComponent(val)
  }
}

onMounted(() => {
  // autofocus on load
  setTimeout(() => inputRef.value?.focus(), 100)
})
</script>

<style scoped>
.search-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0 16px;
  height: 54px;
  transition: border-color .2s, box-shadow .2s;
}

.search-wrap.focused {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 15%, transparent);
}

.search-icon {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font-size: .92rem;
  font-family: var(--font-display);
  min-width: 0;
}

input::placeholder {
  color: var(--text-muted);
}

.engine-badge {
  font-family: var(--font-mono);
  font-size: .65rem;
  text-transform: lowercase;
  color: var(--text-muted);
  background: var(--surface2);
  border: 1px solid var(--border);
  padding: 3px 10px;
  border-radius: 99px;
  cursor: pointer;
  transition: color .15s, border-color .15s;
  white-space: nowrap;
  flex-shrink: 0;
}

.engine-badge:hover {
  color: var(--accent);
  border-color: var(--accent);
}
</style>
