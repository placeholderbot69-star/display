const TARGET = 'https://dabinplay-hub-v-wip.base44.app'
const PROXY_HOST = 'https://display.placeholderbot-69.workers.dev'
const PROXY_IP = '159.203.181.211'
const PROXY_PORT = '9191'

addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  const reqUrl = new URL(request.url)
  const targetUrl = new URL(TARGET)
  targetUrl.pathname = reqUrl.pathname
  targetUrl.search = reqUrl.search

  // Build proxy URL that forwards the absolute target URL in the path
  // Example: http://proxy-ip:port/https://target/...
  const proxyPath = `http://${PROXY_IP}:${PROXY_PORT}/${targetUrl.toString()}`

  const init = {
    method: request.method,
    headers: new Headers(request.headers),
    body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.arrayBuffer() : undefined,
    redirect: 'manual'
  }

  // Some proxies require Host header of the proxy itself
  init.headers.set('Host', `${PROXY_IP}:${PROXY_PORT}`)

  const resp = await fetch(proxyPath, init)

  const newHeaders = new Headers(resp.headers)
  newHeaders.delete('x-frame-options')
  newHeaders.delete('frame-options')
  newHeaders.set('Content-Security-Policy', `frame-ancestors ${PROXY_HOST};`)
  newHeaders.set('Access-Control-Allow-Origin', PROXY_HOST)
  newHeaders.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,OPTIONS')
  newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  const contentType = resp.headers.get('content-type') || ''
  if (contentType.includes('text/html')) {
    let text = await resp.text()
    text = text.replace(/(src|href)=["']\/([^"']*)["']/g, (m, attr, path) => {
      return `${attr}="${PROXY_HOST}/${path}"`
    })
    text = text.replace(/<base[^>]*>/i, '')
    return new Response(text, { status: resp.status, headers: newHeaders })
  }

  return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers: newHeaders })
}
