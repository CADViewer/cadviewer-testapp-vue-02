import { computed } from "vue";
import { getActiveConfig, getActiveDemoInfo } from "../index";

/**
 * Custom hook (composable) to access the active configuration
 */
export function useConfig() {
  const config = computed(() => {
    return getActiveConfig();
  });

  const demoInfo = computed(() => {
    return getActiveDemoInfo();
  });

  return {
    config,
    demoInfo,
    isDemoMode: computed(() => demoInfo.value.id !== "default"),
  };
}

/**
 * Hook to access a specific configuration property
 */
export function useConfigValue<
  T extends keyof ReturnType<typeof getActiveConfig>
>(key: T): ReturnType<typeof getActiveConfig>[T] {
  const { config } = useConfig();
  return config.value[key];
}

export default useConfig;
