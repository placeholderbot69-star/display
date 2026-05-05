const TARGET = 'https://dabinplay-hub-v-wip.base44.app'
const PROXY_HOST = 'https://display.placeholderbot-69.workers.dev'

addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  const reqUrl = new URL(request.url)
  const targetUrl = new URL(TARGET)
  targetUrl.pathname = reqUrl.pathname
  targetUrl.search = reqUrl.search

  // Forward request to target
  const init = {
    method: request.method,
    headers: new Headers(request.headers),
    body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.arrayBuffer() : undefined,
    redirect: 'manual'
  }

  // Ensure Host header matches target
  init.headers.set('Host', new URL(TARGET).host)

  const resp = await fetch(targetUrl.toString(), init)

  // Copy and modify headers
  const newHeaders = new Headers(resp.headers)
  newHeaders.delete('x-frame-options')
  newHeaders.delete('frame-options')

  // Restrict embedding to the worker host only
  newHeaders.set('Content-Security-Policy', `frame-ancestors ${PROXY_HOST};`)
  newHeaders.set('Access-Control-Allow-Origin', PROXY_HOST)
  newHeaders.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,OPTIONS')
  newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  const contentType = resp.headers.get('content-type') || ''
  if (contentType.includes('text/html')) {
    let text = await resp.text()

    // Rewrite root-relative src/href to go through the proxy host
    text = text.replace(/(src|href)=["']\/([^"']*)["']/g, (m, attr, path) => {
      return `${attr}="${PROXY_HOST}/${path}"`
    })

    // Remove base tag to avoid absolute base conflicts
    text = text.replace(/<base[^>]*>/i, '')

    return new Response(text, {
      status: resp.status,
      headers: newHeaders
    })
  }

  // Non-HTML responses returned as-is with modified headers
  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers: newHeaders
  })
}
