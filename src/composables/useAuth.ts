import { useAuthStore } from '@/store/auth'

export function useAuth() {
  const auth = useAuthStore()
  return auth
}
