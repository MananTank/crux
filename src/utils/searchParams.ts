const url =
  typeof window !== 'undefined'
    ? new URL(window.location.href)
    : new URL('https://example.com/')

export const urlParam = url.searchParams.get('url')
export const originParam = url.searchParams.get('origin')
export const listParam = url.searchParams.get('list')
