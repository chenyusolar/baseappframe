import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist-uni'
import type { App } from 'vue'
export const pinia = createPinia()
pinia.use(piniaPersist)
export async function setupStore(app: App) {
  app.use(pinia);
  console.log("挂载pinia");
}
export * from './modules'
