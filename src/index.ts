import path from 'path'
import { createUnplugin } from 'unplugin'
import alias from '@rollup/plugin-alias'
import type { ResolveIdHook } from 'rollup'
import MagicString from 'magic-string'
import { presets } from './config/presets'
import type { Options } from './types'
import { generateCode } from './helpers/generateCode'

const ENTRY_FILE_NAME = 'MOMENT_TO_DAYJS_ENTRY'

export default createUnplugin<Options>((options, meta) => {
  const { framework } = meta
  const { preset = 'antd' } = options || {}

  const plugins = options?.plugins ?? presets[preset].plugins
  const replaceMoment = options?.replaceMoment ?? presets[preset].replaceMoment

  let entrySource = ''

  return {
    name: 'unplugin-moment-to-dayjs',
    enforce: 'pre',
    vite: {
      config: () => {
        return replaceMoment
          ? {
            resolve: {
              alias: {
                moment: 'dayjs',
              },
            },
          }
          : {}
      },
      configResolved(config) {
        console.log('🚀 ~ file: index.ts ~ line 37 ~ configResolved ~ config', config.resolve.alias)
      },
      transformIndexHtml: {
        enforce: 'pre',
        transform() {
          return [{
            tag: 'script',
            attrs: {
              type: 'module',
              src: `${ENTRY_FILE_NAME}`,
            },
            injectTo: 'body-prepend',
          }]
        },
      },
    },
    rollup: {
      options: (options: any) => {
        if (framework !== 'rollup')
          return
        options.plugins = [
          alias({
            entries: {
              moment: 'dayjs',
            },
          }),
          ...options.plugins,
        ]
        return options
      },
    },
    webpack(compiler) {
      const { resolve } = (compiler as any).options
      resolve.alias = {
        ...resolve.alias,
        moment: 'dayjs',
      }
    },
    // transformInclude(id) {
    //   console.log(id)
    //   return id.includes(ENTRY_FILE_NAME)
    // },
    async resolveId(...args: Parameters<ResolveIdHook>) {
      const [source, _, options] = args
      if (source.includes(ENTRY_FILE_NAME))
        return ENTRY_FILE_NAME
      if (options?.isEntry === true)
        entrySource = source
    },
    load(id) {
      if (framework === 'vite' && id.includes(ENTRY_FILE_NAME))
        return generateCode(plugins)
    },
    transform(code, id) {
      if (framework === 'rollup' && id === entrySource) {
        const ms = new MagicString(code).prepend(generateCode(plugins))

        return {
          code: ms.toString(),
          map: ms.generateMap(),
        }
      }
      return code
    },
  }
})
