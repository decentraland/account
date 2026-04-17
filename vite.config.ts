import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react-swc'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const envVariables = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      federation({
        name: 'account_site',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/remote-entry.tsx'
        },
        shared: {
          react: { singleton: true, requiredVersion: '^18.3.0' },
          'react-dom': { singleton: true, requiredVersion: '^18.3.0' },
          'react-router-dom': { singleton: true, requiredVersion: '^7.9.0' },
          '@emotion/react': { singleton: true, requiredVersion: '^11.14.0' },
          '@emotion/styled': { singleton: true, requiredVersion: '^11.14.0' },
          '@reduxjs/toolkit': { singleton: true, requiredVersion: '^2.9.0' },
          'react-redux': { singleton: true, requiredVersion: '^9.2.0' },
          wagmi: { singleton: true, requiredVersion: '^2.19.0' },
          viem: { singleton: true, requiredVersion: '^2.44.0' },
          '@dcl/hooks': { singleton: true, requiredVersion: '^1.2.0' },
          'decentraland-ui2': { singleton: true, requiredVersion: '^2.0.0' },
          '@dcl/schemas': { singleton: true, requiredVersion: '^25.2.0' }
        }
      })
    ],
    define: {
      'process.env': {
        VITE_REACT_APP_DCL_DEFAULT_ENV: envVariables.VITE_REACT_APP_DCL_DEFAULT_ENV
      }
    },
    server: {
      cors: true,
      proxy: {
        '/auth': {
          target: 'https://decentraland.zone',
          followRedirects: true,
          changeOrigin: true,
          secure: false,
          ws: true
        },
        '/credits-api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/credits-api/, '')
        }
      }
    },
    ...(command === 'build'
      ? {
          base: envVariables.VITE_BASE_URL,
          optimizeDeps: {
            esbuildOptions: {
              define: {
                global: 'globalThis'
              },
              plugins: [
                NodeGlobalsPolyfillPlugin({
                  buffer: true,
                  process: true
                }),
                NodeModulesPolyfillPlugin()
              ]
            }
          },
          build: {
            target: 'esnext',
            commonjsOptions: {
              transformMixedEsModules: true
            },
            rollupOptions: {
              plugins: [rollupNodePolyFill()]
            },
            sourcemap: !process.env.CI && !process.env.VERCEL
          }
        }
      : undefined)
  } as any
})
