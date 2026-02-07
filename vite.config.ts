import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react-swc'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'
import { defineConfig, loadEnv } from 'vite'
import { federation } from '@module-federation/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const envVariables = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      federation({
        name: 'account',
        filename: 'remoteEntry.js',
        manifest: true,
        dts: false,
        exposes: {
          './App': './src/MFApp.tsx',
        },
        shared: {
          // Core React
          react: { singleton: true },
          'react-dom': { singleton: true },
          // Routing (v5)
          'react-router': { singleton: true },
          'react-router-dom': { singleton: true },
          history: { singleton: true },
          // Decentraland UI
          'decentraland-ui': { singleton: true },
          'decentraland-ui2': { singleton: true },
          'semantic-ui-css': { singleton: true },
          // Decentraland core libraries
          'decentraland-dapps': { singleton: true },
          'decentraland-connect': { singleton: true },
          'decentraland-transactions': { singleton: true },
          'decentraland-crypto-fetch': { singleton: true },
          '@dcl/single-sign-on-client': { singleton: true },
          '@dcl/crypto': { singleton: true },
          'dcl-catalyst-client': { singleton: true },
          // State management
          'react-redux': { singleton: true },
          'redux-saga': { singleton: true },
          reselect: { singleton: true },
          // Large shared libraries
          ethers: { singleton: true },
          thirdweb: { singleton: true },
          '@sentry/react': { singleton: true },
          'lottie-react': { singleton: true },
          // Utilities
          classnames: { singleton: true },
          'date-fns': { singleton: true },
          buffer: { singleton: true },
        },
      }),
    ],
    // Required because the CatalystClient tries to access it
    define: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'process.env': {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        VITE_REACT_APP_DCL_DEFAULT_ENV: envVariables.VITE_REACT_APP_DCL_DEFAULT_ENV
      }
    },
    server: {
      port: 3003,
      origin: 'http://localhost:3003',
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
          target: 'chrome89',
          commonjsOptions: {
            transformMixedEsModules: true
          },
          rollupOptions: {
            plugins: [rollupNodePolyFill()]
          },
          // Disable sourcemaps in CI/Vercel to reduce memory usage (avoids OOM on 8GB build)
          sourcemap: !process.env.CI && !process.env.VERCEL
        }
      }
      : undefined)
  } as any
})
