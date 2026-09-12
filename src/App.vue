<template>
  <div class="h-screen w-full flex flex-col overflow-hidden font-sans">
    
    <!-- Header Ported from React -->
    <div class="bg-gray-100 min-h-20 px-4 md:px-6 lg:px-14 py-2 border-b border-gray-300 flex-shrink-0 z-50 relative">
      <div class="w-full flex flex-wrap flex-col lg:flex-row justify-between items-stretch gap-2">
        <div class="flex flex-row gap-2 items-center">
          <img
            src="/CADViewer_Primary_logo.svg"
            alt="CADViewer Logo"
            class="h-9 sm:h-10 block"
            style="height: 40px; width: auto;"
          />
        </div>
        <!-- Group Logo and Main Info -->
        <div class="flex flex-wrap items-center lg:ml-4 min-w-0 flex-1">
          <div class="flex flex-col justify-start items-start lg:ml-4 min-w-0">
            <div>
              <div class="flex flex-row items-center gap-4">
                <h4 class="font-bold text-gray-800 m-0 flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" width="24" height="24" alt="Vue Logo" style="margin-top: -4px;" />
                  CADViewer: Vue.js 3 Visual Query Sample
                </h4>
                
                <!-- GitHub Link Injection -->
                <a href="https://github.com/CADViewer/cadviewer-testapp-vue-02" target="_blank" class="flex items-center gap-1.5 text-base font-bold no-underline px-3 py-1 rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 whitespace-nowrap ml-2" style="color: #0366d6;">
                  <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" style="width:20px; height:20px;" alt="GitHub Logo"/>
                  <span>Pull or clone from GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Action Buttons -->
        <div class="flex items-start justify-start lg:justify-end flex-wrap">
          <div class="flex flex-grow-1 gap-1 flex-wrap justify-end">
            <!-- Tech Docs -->
            <button
              class="inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 mr-2 my-2"
            >
              <img src="/cvlogo_white.svg" alt="CV Logo" class="w-5 h-5 mr-1" style="width: 20px; height: 20px;" />
              Tech Docs
            </button>
            <!-- User Manual -->
            <button
              class="inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 mr-2 my-2"
            >
              <img src="/cvlogo_white.svg" alt="CV Logo" class="w-5 h-5 mr-1" style="width: 20px; height: 20px;" />
              User Manual
            </button>
            <!-- Open Files -->
            <button
              @click="isFolderPanelOpen = true"
              class="inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 mr-2 my-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1" style="width: 20px; height: 20px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
              </svg>
              Open Files
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 relative w-full h-full bg-white">
      <CADViewer canvasPlanId="floorPlan" />
    </div>

    <!-- Right Slideover Panel for Folder Structure -->
    <TransitionRoot as="template" :show="isFolderPanelOpen">
      <Dialog as="div" class="relative z-50" @close="isFolderPanelOpen = false">
        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-300 sm:duration-500" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-300 sm:duration-500" leave-from="translate-x-0" leave-to="-translate-x-full">
                <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div class="bg-primary-700 px-4 py-6 sm:px-6 relative text-white">
                      <div class="flex items-center justify-between">
                        <DialogTitle class="text-lg font-semibold leading-6 text-white">
                          Folder Structure
                        </DialogTitle>
                        <button type="button" class="relative rounded-md text-white hover:text-gray-200 focus:outline-none" @click="isFolderPanelOpen = false">
                          <span class="absolute -inset-2.5" />
                          <span class="sr-only">Close panel</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div class="mt-1">
                        <p class="text-sm text-primary-200">
                          Drill down to select file
                        </p>
                      </div>
                      <div class="mt-4">
                        <button class="bg-white text-primary-700 font-semibold py-2 px-4 rounded shadow flex items-center text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                          </svg>
                          Upload new file(s) to MY FOLDER
                        </button>
                      </div>
                    </div>
                    <div class="relative flex-1 px-4 py-6 sm:px-6">
                      <FolderStructure @close="isFolderPanelOpen = false" />
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import CADViewer from './components/CADViewer/CADViewer.vue';
import FolderStructure from './components/FolderStructure/FolderStructure.vue';

const isFolderPanelOpen = ref(false);
</script>

<style>
/* Add missing primary colors matching React implementation */
.bg-primary-700 {
  background-color: #032145;
}
.bg-primary-600 {
  background-color: #052c5c;
}
.hover\:bg-primary-500:hover {
  background-color: #0a3f80;
}
.text-primary-700 {
  color: #032145;
}
.text-primary-200 {
  color: #8daed6;
}
</style>
