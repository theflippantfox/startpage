<template>
  <div class="links-panel">
    <div
      v-for="section in sections"
      :key="section.id"
      class="section"
    >
      <div class="section-label">
        <span>{{ section.label }}</span>
      </div>

      <div class="link-row">
        <a
          v-for="link in section.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="pill"
          :style="{ '--section-color': section.color }"
        >
          <span class="pill-icon">{{ link.icon }}</span>
          <span class="pill-name">{{ link.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  sections: Array,
})
</script>

<style scoped>
.links-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  flex: 1;
}

/* ── Section label ── */
.section-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.section-label span {
  font-family: var(--font-mono);
  font-size: .6rem;
  text-transform: uppercase;
  letter-spacing: .18em;
  color: var(--text-muted);
  white-space: nowrap;
}

.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* ── Link row ── */
.link-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* ── Pill ── */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 15px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-size: .82rem;
  font-weight: 500;
  text-decoration: none;
  transition:
    transform  .18s cubic-bezier(.34,1.56,.64,1),
    border-color .18s,
    color .18s,
    box-shadow .18s,
    background .18s;
  position: relative;
  overflow: hidden;
}

/* glow layer */
.pill::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--section-color, var(--accent));
  opacity: 0;
  transition: opacity .18s;
  border-radius: inherit;
}

.pill:hover {
  transform: translateY(-2px) scale(1.04);
  border-color: var(--section-color, var(--accent));
  color: var(--text);
  box-shadow: 0 4px 18px -6px var(--section-color, var(--accent));
}

.pill:hover::after {
  opacity: .08;
}

.pill-icon {
  font-size: 1rem;
  line-height: 1;
  position: relative;
  z-index: 1;
}

.pill-name {
  position: relative;
  z-index: 1;
}
</style>
