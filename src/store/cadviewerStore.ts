import { defineStore } from 'pinia';
import cadviewer from 'cadviewer';
import useConfig from '../demos/hooks/useConfig';
import { Employee, SpaceObjectProps } from '../types';

export type NodeId = string | number;

export interface Layer {
  layer: string;
  color: string;
}

export interface CanvasInstance {
  id: string;
  filePath?: string;
  fileName?: string;
}

export const extractFileNameFromPath = (filePath: string) => {
  if (filePath.includes("/")) {
    return filePath.split("/").pop();
  } else if (filePath.includes("\\")) {
    return filePath.split("\\").pop();
  } else {
    return filePath;
  }
};

export const useCadviewerStore = defineStore('cadviewer', {
  state: () => {
    // In Pinia, we can't cleanly use computed hooks inside state,
    // so we initialize manually or using the raw config logic.
    const { config } = useConfig();
    const cfg = config.value;

    return {
      spaceObjects: [] as SpaceObjectProps[],
      selectedSpaceObjectID: undefined as string | undefined,
      employees: [] as Employee[],
      tabIndex: 'tenant_information',
      currentDrawingPath: undefined as string | undefined,
      expendedIds: [] as NodeId[],
      handleSelector: false,
      multiSelectArray: [] as string[],
      canvasInstances: [
        {
          id: 'floorPlan',
          fileName: cfg.initFileName ? extractFileNameFromPath(cfg.initFileName) : undefined,
          filePath: cfg.initFileName || undefined,
        }
      ] as CanvasInstance[],
      currentCanvasInstance: 'floorPlan' as string | undefined,
      layerColorsOnLoad: cfg.defaultLayerColorsOnLoad as Layer[],
      disableFeature: false,
      appVersion: '12.12.9',
    };
  },
  actions: {
    setSpaceObjects() {
      // @ts-ignore
      const allSpaceObjects = cadviewer.cvjs_returnAllSpaceObjects();
      this.spaceObjects = allSpaceObjects?.SpaceObjects ?? [];
    },
    setSelectedSpaceObjectID(id: string | undefined) {
      this.selectedSpaceObjectID = id;
    },
    setEmployees(employees: Employee[]) {
      this.employees = employees;
    },
    setTabIndex(index: string) {
      this.tabIndex = index;
    },
    setExpendedIds(ids: NodeId[]) {
      this.expendedIds = ids;
    },
    setHandleSelector(val: boolean) {
      this.handleSelector = val;
    },
    setMultiSelectArray(arr: string[]) {
      this.multiSelectArray = arr;
    },
    setLayerColorsOnLoad(layers: Layer[]) {
      this.layerColorsOnLoad = layers;
    },
    newCanvasInstance(callback?: () => void) {
      const id = "floorPlan-" + new Date().getTime();
      this.canvasInstances.push({
        id,
        fileName: undefined,
        filePath: undefined,
      });
      this.currentCanvasInstance = id;
      if (callback) callback();
    },
    removeCanvasInstance(id: string) {
      const index = this.canvasInstances.findIndex(instance => instance.id === id);
      if (id === this.currentCanvasInstance && index === this.canvasInstances.length - 1) {
        this.currentCanvasInstance = this.canvasInstances[index - 1]?.id;
      } else if (id === this.currentCanvasInstance) {
        this.currentCanvasInstance = this.canvasInstances[index + 1]?.id;
      }
      this.canvasInstances = this.canvasInstances.filter(instance => instance.id !== id);
    },
    setCurrentCanvasInstance(id: string | undefined) {
      this.currentCanvasInstance = id;
    },
    setCurrentDrawingPath(path: string | undefined) {
      if (path) {
        this.canvasInstances = this.canvasInstances.map(instance => ({
          ...instance,
          filePath: instance.id === this.currentCanvasInstance ? path : instance.filePath,
          fileName: instance.id === this.currentCanvasInstance ? extractFileNameFromPath(path) : instance.fileName,
        }));
      }
      this.currentDrawingPath = path;
    }
  }
});
