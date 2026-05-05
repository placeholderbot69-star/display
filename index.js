// server.js
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
const TARGET = 'https://dabinplay-hub-v-wip.base44.app'

app.set('trust proxy', true) // if behind Cloudflare or another proxy

app.use('/', createProxyMiddleware({
  target: TARGET,
  changeOrigin: true,
  secure: true,
  onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader('Host', new URL(TARGET).host)
  },
  onError(err, req, res) {
    res.status(502).send('Proxy error')
  }
}))

app.listen(3000, () => console.log('Proxy listening on :3000'))
