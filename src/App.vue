<template>
  <div v-if="config" class="app">
    <!-- Inject font from config -->
    <component :is="'link'" rel="stylesheet" :href="config.theme.googleFonts" />

    <div class="layout">
      <!-- LEFT: hero panel -->
      <HeroPanel :profile="config.profile" :theme="config.theme" />

      <!-- RIGHT: search + sections + bottom bar -->
      <div class="right">
        <SearchBar :search="config.search" :theme="config.theme" />
        <LinksPanel :sections="config.sections" />
        <BottomBar :profile="config.profile" />
      </div>
    </div>
  </div>

  <div v-else-if="error" class="load-error">
    <p>⚠ Could not load <code>config.json</code></p>
    <pre>{{ error }}</pre>
  </div>

  <div v-else class="loading">loading...</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import HeroPanel  from './components/HeroPanel.vue'
import SearchBar  from './components/SearchBar.vue'
import LinksPanel from './components/LinksPanel.vue'
import BottomBar  from './components/BottomBar.vue'

const config = ref(null)
const error  = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('./config.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    config.value = await res.json()
  } catch (e) {
    error.value = e.message
  }
})

// Apply CSS variables whenever config loads or changes
watch(config, (cfg) => {
  if (!cfg) return
  const t = cfg.theme
  const root = document.documentElement.style
  root.setProperty('--bg',           t.bg)
  root.setProperty('--surface',      t.surface)
  root.setProperty('--surface2',     t.surface2)
  root.setProperty('--border',       t.border)
  root.setProperty('--text',         t.text)
  root.setProperty('--text-muted',   t.textMuted)
  root.setProperty('--accent',       t.accent)
  root.setProperty('--font-display', `'${t.fontDisplay}', sans-serif`)
  root.setProperty('--font-mono',    `'${t.fontMono}', monospace`)
  document.title = cfg.profile.name ? `${cfg.profile.name} / home` : 'Startpage'
}, { immediate: true })
</script>

<style>
:root {
  /* fallback values — overridden by config watcher */
  --bg:           #0f0f12;
  --surface:      #16161c;
  --surface2:     #1e1e27;
  --border:       #2a2a35;
  --text:         #d4d4dc;
  --text-muted:   #55556a;
  --accent:       #c8f060;
  --font-display: 'Syne', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
  --radius:       10px;
  --radius-sm:    6px;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-display);
}

.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
}

.layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
  width: 100%;
  max-width: 1160px;
  animation: fadeIn .45s ease both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.right {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.loading,
.load-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: .85rem;
}

.load-error pre {
  color: #f76a8a;
  font-size: .75rem;
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
