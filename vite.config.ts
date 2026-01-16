import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react-swc'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const envVariables = loadEnv(mode, process.cwd())
  return {
    plugins: [react()],
    // Required because the CatalystClient tries to access it
    define: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'process.env': {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        VITE_REACT_APP_DCL_DEFAULT_ENV: envVariables.VITE_REACT_APP_DCL_DEFAULT_ENV
      }
    },
    server: {
      proxy: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '/auth': {
          target: 'https://decentraland.zone',
          followRedirects: true,
          changeOrigin: true,
          secure: false,
          ws: true
        },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '/credits-api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/credits-api/, '')
        }
      }
    },
    ...(command === 'build'
      ? {
        base: envVariables.VITE_BASE_URL,
        optimizeDeps: {
          esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
              global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
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
          commonjsOptions: {
            transformMixedEsModules: true
          },
          rollupOptions: {
            plugins: [rollupNodePolyFill()]
          },
          sourcemap: true
        }
      }
      : undefined)
  } as any
})
