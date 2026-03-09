<template>
  <aside class="hero-panel">

    <!-- Top image area — mimics the anime art panel from the screenshot -->
    <div class="hero-image-wrap">
      <!-- If user sets profile.avatar, show it. Otherwise show the gradient placeholder. -->
      <img v-if="profile.avatar" :src="profile.avatar" class="hero-img" alt="avatar" />
      <div v-else class="hero-placeholder">
        <span class="hero-emoji">{{ profile.avatarEmoji }}</span>
      </div>

      <!-- Vertical text overlay — edit profile.verticalText in config.json -->
      <div class="vertical-text">
        <span
          v-for="(char, i) in verticalChars"
          :key="i"
          :style="{ animationDelay: `${i * 0.06}s` }"
        >{{ char }}</span>
      </div>

      <!-- Subtle gradient fade at bottom -->
      <div class="hero-fade" />
    </div>

    <!-- Info section below the image -->
    <div class="hero-info">

      <div class="name-block">
        <h1 class="name">{{ profile.name }}</h1>
        <span class="handle">{{ profile.handle }}</span>
        <div class="status">
          <span class="status-dot" />
          {{ profile.status }}
        </div>
      </div>

      <div class="stats-row">
        <div v-for="stat in profile.stats" :key="stat.label" class="stat">
          <span class="stat-val">{{ stat.value }}</span>
          <span class="stat-lbl">{{ stat.label }}</span>
        </div>
      </div>

      <div class="tags">
        <span v-for="tag in profile.tags" :key="tag" class="tag">#{{ tag }}</span>
      </div>

      <div class="divider" />

      <div class="clock-block">
        <div class="clock-time">{{ time }}</div>
        <div class="clock-date">{{ date }}</div>
      </div>

      <blockquote v-if="profile.quote" class="quote">
        "{{ profile.quote }}"
        <cite v-if="profile.quoteAuthor">— {{ profile.quoteAuthor }}</cite>
      </blockquote>

    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  profile: Object,
  theme: Object,
})

// Vertical text defaults to "CHILL" if not set in config
const verticalChars = computed(() => {
  const text = props.profile.verticalText || 'CHILL'
  return text.split('')
})

// Clock
const now  = ref(new Date())
let timer

const pad  = n => String(n).padStart(2, '0')

const time = computed(() => {
  const d = now.value
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
})

const date = computed(() => {
  const d = now.value
  const days   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
})

onMounted(() => { timer = setInterval(() => { now.value = new Date() }, 1000) })
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.hero-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

  /* top accent line */
  border-top: 2px solid var(--accent);
}

/* ── IMAGE AREA ── */
.hero-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: var(--surface2);
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.hero-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--surface2) 0%, #0d0d14 100%);
  font-size: 5rem;
}

/* Vertical text — exactly like the screenshot */
.vertical-text {
  position: absolute;
  top: 50%;
  left: 28px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  writing-mode: vertical-rl;
  text-orientation: upright;
  border: 1.5px solid var(--accent);
  padding: 14px 8px;
  border-radius: 4px;
  background: rgba(0,0,0,.25);
  backdrop-filter: blur(4px);
}

.vertical-text span {
  font-family: var(--font-display);
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .25em;
  color: var(--accent);
  opacity: 0;
  animation: charIn .4s ease forwards;
}

@keyframes charIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* bottom fade on hero image */
.hero-fade {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 60px;
  background: linear-gradient(to bottom, transparent, var(--surface));
}

/* ── INFO AREA ── */
.hero-info {
  padding: 20px 22px 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 1;
}

/* Name */
.name-block { display: flex; flex-direction: column; gap: 4px; }

.name {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -.025em;
  color: var(--text);
  line-height: 1.1;
}

.handle {
  font-family: var(--font-mono);
  font-size: .72rem;
  color: var(--text-muted);
}

.status {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: .72rem;
  font-family: var(--font-mono);
  color: var(--accent);
  margin-top: 4px;
}

.status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
  animation: blink 2.2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes blink {
  0%,100% { opacity: 1; }
  50%      { opacity: .3; }
}

/* Stats */
.stats-row {
  display: flex;
  gap: 8px;
}

.stat {
  flex: 1;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 8px 6px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.stat-val {
  font-size: 1rem;
  font-weight: 700;
  color: var(--accent);
  font-family: var(--font-mono);
}

.stat-lbl {
  font-size: .6rem;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

/* Tags */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: .68rem;
  font-family: var(--font-mono);
  padding: 3px 9px;
  border-radius: 99px;
  border: 1px solid var(--border);
  color: var(--text-muted);
  transition: border-color .15s, color .15s;
  cursor: default;
}

.tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Divider */
.divider {
  height: 1px;
  background: var(--border);
}

/* Clock */
.clock-block { text-align: left; }

.clock-time {
  font-family: var(--font-mono);
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: .04em;
  line-height: 1;
}

.clock-date {
  font-family: var(--font-mono);
  font-size: .65rem;
  color: var(--text-muted);
  margin-top: 5px;
  text-transform: uppercase;
  letter-spacing: .1em;
}

/* Quote */
.quote {
  font-size: .76rem;
  color: var(--text-muted);
  font-style: italic;
  line-height: 1.65;
  border-left: 2px solid var(--accent);
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.quote cite {
  font-style: normal;
  font-size: .68rem;
  color: var(--text-muted);
  opacity: .7;
}
</style>
