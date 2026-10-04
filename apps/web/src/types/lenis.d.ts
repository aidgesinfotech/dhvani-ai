/** Shared Lenis handle on window (set by SmoothScroll). */
declare global {
  interface Window {
    __lenis?: {
      scrollTo: (
        target: number | string | HTMLElement,
        opts?: { immediate?: boolean; duration?: number; force?: boolean; offset?: number },
      ) => void;
      scroll?: number;
    };
  }
}

export {};
