<template>
  <div class="folder-structure h-full overflow-auto text-black">
    <div v-if="loading" class="text-sm text-gray-500 p-4">Loading folders...</div>
    <div v-else-if="error" class="text-sm text-red-500 p-4">{{ error }}</div>
    <div v-else class="p-2">
      <ul v-if="folderStructure.length > 0">
        <li v-for="node in folderStructure" :key="node.path" class="my-1">
          <div 
            class="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded justify-between"
            @click="handleClick(node)"
          >
            <div class="flex items-center">
              <!-- Render Folder Icon -->
              <span v-if="node.children" class="mr-3" v-html="dirIcon"></span>
              <!-- Render File Icon -->
              <span v-else class="mr-3" v-html="getFileIcon(node.name)"></span>
              <span class="text-sm font-medium truncate" :title="node.name">{{ node.name }}</span>
            </div>
            
            <button class="text-gray-400 hover:text-gray-600 focus:outline-none rounded-full p-1 hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </button>
          </div>
          
          <FolderNode 
            v-if="node.children && expanded[node.path]" 
            :nodes="node.children" 
            @select-file="handleFileSelect" 
          />
        </li>
      </ul>
      <div v-else class="text-sm text-gray-500 p-4">No files found.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import cadviewer from 'cadviewer';
import useConfig from '../../demos/hooks/useConfig';
import FolderNode from './FolderNode.vue';
import { dirIcon, unkownIcon, dwgIcon, dxfIcon, dwfIcon, tifIcon, tiffIcon, dgnIcon, jsonIcon, pdfIcon, imgIcon, excelIcon, csvIcon, svgIcon, pngIcon, gifIcon, jpgIcon } from './icons';

interface FileNode {
  name: string;
  path: string;
  children?: FileNode[];
}

const emit = defineEmits(['close']);
const { config } = useConfig();
const folderStructure = ref<FileNode[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
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

const fetchFolders = async () => {
  loading.value = true;
  error.value = null;
  
  let endpoint = "listdwgdirectory";
  let url = config.value.ServerBackEndUrl;
  if (!url.endsWith("/")) url += "/";
  
  try {
    const response = await fetch(`${url}${endpoint}?loginFeatureEnabled=false`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to load folders (${response.status})`);
    }
    
    const data = await response.json();
    folderStructure.value = data;
  } catch (err: any) {
    error.value = err.message || "Failed to load folders";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleClick = (node: FileNode) => {
  if (node.children) {
    expanded.value[node.path] = !expanded.value[node.path];
  } else {
    handleFileSelect(node);
  }
};

const handleFileSelect = (node: FileNode) => {
  cadviewer.cvjs_setZoomImageWallpaper(false);
  
  // The server might return an absolute local path (e.g. C:\nodejs\... or \nodejs\...). 
  // We need to strip everything before 'content' so the backend can correctly resolve it 
  // against its own ServerLocation.
  let cleanPath = node.path;
  const contentIndex = cleanPath.indexOf('content');
  if (contentIndex !== -1) {
    cleanPath = cleanPath.substring(contentIndex);
  }
  
  // Replace backslashes with forward slashes for URLs
  cleanPath = cleanPath.replace(/\\/g, '/');
  
  let url = config.value.ServerBackEndUrl;
  if (!url.endsWith("/")) url += "/";
  
  cadviewer.cvjs_LoadDrawing("floorPlan", url + cleanPath);
  emit('close'); // Close the slideover panel
};

onMounted(() => {
  fetchFolders();
});
</script>

<style scoped>
:deep(svg) {
  width: 24px;
  height: 24px;
}
</style>
