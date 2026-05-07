/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
  }
  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>
}

declare module 'virtual:pwa-register/react' {
  export interface UseRegisterSWOptions {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
  }
  export function useRegisterSW(options?: UseRegisterSWOptions): {
    needRefresh: [boolean, (needRefresh: boolean) => void]
    offlineReady: [boolean, (offlineReady: boolean) => void]
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>
  }
}
