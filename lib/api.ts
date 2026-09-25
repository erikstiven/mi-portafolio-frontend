// /lib/api.ts
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/,'')}/api`
    : 'http://localhost:3001/api',
});
// /lib/api.ts (debajo del create)
console.log('[api] baseURL =', api.defaults.baseURL);

// Helper robusto para detectar FormData en browser/SSR
const isFormData = (data: any) => {
  if (!data) return false;
  // Browser
  if (typeof FormData !== 'undefined' && data instanceof FormData) return true;
  // SSR/Node: constructor name o interfaz "parecida"
  const name = data?.constructor?.name;
  if (name === 'FormData') return true;
  if (typeof data.append === 'function' && typeof data.get === 'function') return true;
  return false;
};

api.interceptors.request.use((config) => {
  // 1) Token solo en cliente (Zustand o fallback localStorage)
  const token =
    typeof window !== 'undefined'
      ? useAuthStore.getState().token || localStorage.getItem('token')
      : null;

  // Asegura objeto de headers
  if (!config.headers) config.headers = {};

  // 2) Auth header
  if (token) {
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  // 3) Content-Type:
  //    - Si es FormData: no seteamos nada y eliminamos cualquier Content-Type previo
  //    - Si NO es FormData: por defecto JSON (si no está ya seteado)
  if (isFormData(config.data)) {
    // quita cualquier content-type previo para que axios ponga el boundary correcto
    delete (config.headers as any)['Content-Type'];
    delete (config.headers as any)['content-type'];
  } else {
    if (!(config.headers as any)['Content-Type'] && !(config.headers as any)['content-type']) {
      (config.headers as any)['Content-Type'] = 'application/json';
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== 'undefined') {
      const isLogin = error.config?.url?.includes('/auth/login');
      if (!isLogin) {
        useAuthStore.getState().logout();
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
