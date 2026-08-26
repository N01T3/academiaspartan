import { describe, it, expect, beforeEach } from 'vitest'
import { loadStorage, saveStorage, resetStorage, SCHEMA_VERSION } from '@/utils/storage'
import { isTeam } from '@/utils/validators'

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('loadStorage retorna fallback quando a chave não existe', () => {
    expect(loadStorage('spartan.team', [])).toEqual([])
  })

  it('loadStorage retorna fallback quando o JSON está corrompido', () => {
    localStorage.setItem('k', '{invalid')
    expect(loadStorage('k', { ok: true })).toEqual({ ok: true })
  })

  it('loadStorage retorna fallback e remove a chave quando a versão do schema difere', () => {
    saveStorage('k', { a: 1 })
    localStorage.setItem('spartan.schemaVersion', '1')
    expect(loadStorage('k', { ok: true })).toEqual({ ok: true })
    expect(localStorage.getItem('k')).toBeNull()
  })

  it('loadStorage retorna fallback quando o validator falha', () => {
    saveStorage('k', { x: 1 })
    expect(loadStorage('k', [], isTeam)).toEqual([])
    expect(localStorage.getItem('k')).toBeNull()
  })

  it('loadStorage retorna o dado quando válido e versão correta', () => {
    const data = ['a', 'b']
    saveStorage('k', data)
    const isValid = (v: unknown): v is string[] => Array.isArray(v) && v.every((s) => typeof s === 'string')
    expect(loadStorage('k', [], isValid)).toEqual(data)
  })

  it('saveStorage grava a versão e o valor serializado', () => {
    saveStorage('k', { a: 1 })
    expect(localStorage.getItem('spartan.schemaVersion')).toBe(String(SCHEMA_VERSION))
    expect(JSON.parse(localStorage.getItem('k') as string)).toEqual({ a: 1 })
  })

  it('resetStorage remove somente chaves spartan.* e mantém as demais', () => {
    saveStorage('spartan.a', 1)
    saveStorage('spartan.b', 2)
    localStorage.setItem('outra.coisa', 'x')
    resetStorage()
    expect(localStorage.getItem('spartan.a')).toBeNull()
    expect(localStorage.getItem('spartan.b')).toBeNull()
    expect(localStorage.getItem('outra.coisa')).toBe('x')
  })
})
