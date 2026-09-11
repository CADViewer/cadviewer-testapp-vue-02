<template>
  <ul class="pl-6 border-l border-gray-100 ml-4 mt-1">
    <li v-for="node in nodes" :key="node.path" class="my-1">
      <div 
        class="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded justify-between group"
        @click="handleClick(node)"
      >
        <div class="flex items-center">
          <span v-if="node.children" class="mr-3" v-html="dirIcon"></span>
          <span v-else class="mr-3" v-html="getFileIcon(node.name)"></span>
          <span class="text-sm font-medium text-gray-700 truncate" :title="node.name">{{ node.name }}</span>
        </div>

        <button class="text-gray-400 hover:text-gray-600 focus:outline-none rounded-full p-1 hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </button>
      </div>
      
      <FolderNode 
        v-if="node.children && expanded[node.path]" 
        :nodes="node.children" 
        @select-file="$emit('select-file', $event)" 
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dirIcon, unkownIcon, dwgIcon, dxfIcon, dwfIcon, tifIcon, tiffIcon, dgnIcon, jsonIcon, pdfIcon, imgIcon, excelIcon, csvIcon, svgIcon, pngIcon, gifIcon, jpgIcon } from './icons';

interface FileNode {
  name: string;
  path: string;
  children?: FileNode[];
}

const props = defineProps<{
  nodes: FileNode[]
}>();

const emit = defineEmits(['select-file']);

const expanded = ref<Record<string, boolean>>({});

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'dwg': return dwgIcon;
    case 'dxf': return dxfIcon;
    case 'dwf': return dwfIcon;
    case 'pdf': return pdfIcon;
    case 'tif': return tifIcon;
    case 'tiff': return tiffIcon;
    case 'dgn': return dgnIcon;
    case 'json': return jsonIcon;
    case 'csv': return csvIcon;
    case 'xlsx': 
    case 'xls': return excelIcon;
    case 'svg': return svgIcon;
    case 'png': return pngIcon;
    case 'gif': return gifIcon;
    case 'jpg': 
    case 'jpeg': return jpgIcon;
    default: return unkownIcon;
  }
};

const handleClick = (node: FileNode) => {
  if (node.children) {
    expanded.value[node.path] = !expanded.value[node.path];
  } else {
    emit('select-file', node);
  }
};
</script>

<style scoped>
:deep(svg) {
  width: 24px;
  height: 24px;
}
</style>
