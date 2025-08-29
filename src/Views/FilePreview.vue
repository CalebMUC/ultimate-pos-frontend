<template>
  <div class="w-full h-[600px] bg-gray-100 rounded shadow">
    <div v-if="loading" class="flex items-center justify-center h-full">
      <span class="text-gray-500">Loading preview...</span>
    </div>

    <iframe
      v-else-if="previewUrl"
      :src="previewUrl"
      class="w-full h-full rounded"
    ></iframe>

    <div v-else class="flex items-center justify-center h-full text-red-500">
      Failed to load preview.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { UseDocumentStore  } from '../store/DocumentsStore';
const props = defineProps({
  fileId: {
    type: Number,
    required: true,
  },
});

const fileStore = UseDocumentStore();
const previewUrl = ref(null);
const loading = ref(true);

const loadPreview = async () => {
  try {
    loading.value = true;
    await fileStore.preview(props.fileId);
    previewUrl.value = fileStore.previewBlobUrl;
  } catch (err) {
    console.error("Preview error:", err);
    previewUrl.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(loadPreview);
watch(() => props.fileId, loadPreview); // Re-load if fileId changes
</script>
