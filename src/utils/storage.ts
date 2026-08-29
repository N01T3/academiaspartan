const VERSION_KEY = 'spartan.schemaVersion'

export const SCHEMA_VERSION = 2

type Validator<T> = (value: unknown) => value is T

function readVersion(): number {
  try {
    const raw = localStorage.getItem(VERSION_KEY)
    if (raw === null) return 0
    const n = Number(raw)
    return Number.isFinite(n) ? n : 0
  } catch {
    return 0
  }
}

export function loadStorage<T>(key: string, fallback: T, validate?: Validator<T>): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    const data = JSON.parse(raw) as unknown
    if (readVersion() !== SCHEMA_VERSION) {
      localStorage.removeItem(key)
      return fallback
    }
    if (validate && !validate(data)) {
      localStorage.removeItem(key)
      return fallback
    }
    return data as T
  } catch {
    return fallback
  }
}

export function saveStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(VERSION_KEY, String(SCHEMA_VERSION))
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage may be unavailable (private mode / quota) */
  }
}

export function resetStorage(): void {
  try {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith('spartan.')) keys.push(k)
    }
    keys.forEach((k) => localStorage.removeItem(k))
  } catch {
    /* ignore */
  }
}
