
export function notNull<T>(v: T | undefined | null): v is T {
  return v !== null
}

export function extensionsToGlob(extensions: string[]) {
  return extensions.length > 1 ? `{${extensions.join(',')}}` : extensions[0] || ''
}
