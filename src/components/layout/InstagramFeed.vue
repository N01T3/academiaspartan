<script setup lang="ts">
const posts = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=400&auto=format&fit=crop',
]
</script>

<template>
  <div class="ig-grid">
    <a v-for="(src, i) in posts" :key="i" href="#" class="ig-item" aria-label="Post do Instagram">
      <v-img :src="src" cover aspect-ratio="1" loading="lazy">
        <div class="ig-overlay d-flex align-center justify-center">
          <v-icon icon="mdi-instagram" color="white" />
        </div>
      </v-img>
    </a>
  </div>
</template>

<style scoped>
.ig-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.ig-item {
  border-radius: 8px;
  overflow: hidden;
}

.ig-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 200ms ease;
}

.ig-item:hover .ig-overlay {
  opacity: 1;
}
</style>
