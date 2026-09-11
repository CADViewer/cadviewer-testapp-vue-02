<template>
  <div class="h-full w-full CADViewer relative" ref="divRef">
    <div
      :id="canvasPlanId"
      class="cadviewer-bootstrap cadviewer-core-styles h-full w-full relative overflow-hidden"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import cadviewer from 'cadviewer';
import { useCadviewerStore } from '../../store/cadviewerStore';
import useConfig from '../../demos/hooks/useConfig';
import EventSystem from '../../events/EventSystem';

const props = defineProps<{
  canvasPlanId: string;
}>();

const divRef = ref<HTMLElement | null>(null);
const store = useCadviewerStore();
const { config } = useConfig();


let isMountedState = false;
let FileName = '';

const handleWindowResize = () => {
  try {
    if (!divRef.value) return;
    const { width, height } = divRef.value.getBoundingClientRect();
    if (config.value.debugMode) console.log("_handleWindowResize");
    cadviewer.cvjs_resizeWindow_fixedSize(width, height, props.canvasPlanId);
  } catch (err) {
    console.log(err);
  }
};

const mountCanvas = () => {
  FileName = config.value.ServerBackEndUrl + config.value.initFileName;

  cadviewer.cvjs_setMeasurementDefaultType("Area");
  cadviewer.cvjs_debugMode(config.value.debugMode);
  cadviewer.cvjs_setCallbackQuickCount(true);

  cadviewer.cvjs_setAllServerPaths_and_Handlers(
    config.value.ServerBackEndUrl,
    config.value.ServerUrl,
    config.value.ServerLocation,
    "NodeJS",
    "ReactJS",
    props.canvasPlanId,
    ""
  );

  cadviewer.cvjs_setCADViewerInterfaceVersion(8);
  cadviewer.cvjs_setCADViewerSkin(config.value.setCADViewerSkin);
  cadviewer.cvjs_loadCADViewerLanguage(config.value.setCADViewerLanguage, "");
  cadviewer.cvjs_displayTopMenuIconBar(config.value.displayTopMenuIconBar, props.canvasPlanId);
  cadviewer.cvjs_displayTopNavigationBar(config.value.displayTopNavigationBar, props.canvasPlanId);

  if (config.value.setTopMenuXMLDirect) {
    cadviewer.cvjs_setTopMenuXMLDirect(props.canvasPlanId, config.value.topMenuXML_config_file);
  } else {
    cadviewer.cvjs_setTopMenuXML(props.canvasPlanId, config.value.topMenuXML, config.value.topMenuXMLpath);
  }

  cadviewer.cvjs_InitCADViewer_highLight_popUp_app(
    props.canvasPlanId,
    "/assets/cadviewer/app/",
    config.value.BaseAttributes,
    config.value.HighlightAttributes,
    config.value.SelectAttributes,
    ""
  );

  cadviewer.cvjs_setLicenseKeyDirect(
    '{ "cvKey": "' + config.value.cadviewerLicenseKey + '" }'
  );

  cadviewer.cvjs_allowFileLoadToServer(true);

  isMountedState = true;
  handleWindowResize();

  if (config.value.initFileName !== "") {
    cadviewer.cvjs_setZoomImageWallpaper(false);
    cadviewer.cvjs_LoadDrawing(props.canvasPlanId, FileName);
    store.setCurrentDrawingPath(FileName);
  }
};

onMounted(() => {
  EventSystem.subscribe("cadviewer.handle_resize", handleWindowResize);
  window.addEventListener("resize", handleWindowResize);
  
  if (!isMountedState) {
    mountCanvas();
  }
  
  if (divRef.value) {
    const resizeObserver = new ResizeObserver(() => {
      handleWindowResize();
    });
    resizeObserver.observe(divRef.value);
    
    onBeforeUnmount(() => {
      resizeObserver.disconnect();
    });
  }
});

onBeforeUnmount(() => {
  EventSystem.unsubscribe("cadviewer.handle_resize", handleWindowResize);
  window.removeEventListener("resize", handleWindowResize);
});

</script>
<style scoped>
@import './CADViewer.component.css';
</style>
