import { describe, it, expect } from 'vitest'
import { uid, formatCurrency, formatDate, slugify } from '@/utils/format'

describe('slugify', () => {
  it('remove pontuação e espaços', () => {
    expect(slugify('Olá Mundo!!')).toBe('ola-mundo')
  })

  it('remove acentos', () => {
    expect(slugify('Periodização para hipertrofia')).toBe('periodizacao-para-hipertrofia')
  })
})

describe('formatCurrency', () => {
  it('contém o símbolo R$', () => {
    expect(formatCurrency(199.9)).toContain('R$')
  })
})

describe('formatDate', () => {
  it('retorna string não vazia contendo o ano', () => {
    const result = formatDate('2026-08-10')
    expect(result).toBeTruthy()
    expect(result).toContain('2026')
  })
})

describe('uid', () => {
  it('retorna string não vazia e valores diferentes entre chamadas', () => {
    const a = uid()
    const b = uid()
    expect(a).toBeTruthy()
    expect(b).toBeTruthy()
    expect(a).not.toBe(b)
  })
})
