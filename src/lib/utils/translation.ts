import type React from 'react'
import * as translations from '../../locales'

const flattenedTranslations: Record<string, string> = {}

function flattenObject(obj: Record<string, any>, prefix = ''): void {
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObject(obj[key], fullKey)
    } else {
      flattenedTranslations[fullKey] = String(obj[key])
    }
  }
}

// Initialize with the 'en' locale
const enTranslations = (translations as any).en ?? (translations as any).default?.en ?? translations
if (typeof enTranslations === 'object') {
  flattenObject(enTranslations)
}

/**
 * Simple translation function. Replaces decentraland-dapps' t().
 * This is used in non-React code (selectors, utils). In React components, use useTranslation() from @dcl/hooks.
 */
export function t(key: string, values?: Record<string, string | number>): string {
  let result = flattenedTranslations[key] ?? key
  if (values) {
    for (const [k, v] of Object.entries(values)) {
      result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
    }
  }
  return result
}

/**
 * T component for JSX usage: `<T id="key" values={{...}} />`
 * Returns the translated string (values interpolation is simplified).
 */
export const T: React.FC<{ id: string; values?: Record<string, any> }> = ({ id }) => {
  return t(id) as any
}
