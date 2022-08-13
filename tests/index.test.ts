import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import momentToDayjs from 'unplugin-moment-to-dayjs/vite'
import { build } from 'vite'

describe('moment-to-dayjs', () => {
  it('vite', async() => {
    await build({
      plugins: [momentToDayjs()],
      build: {
        write: false,
        lib: {
          formats: ['es'],
          entry: resolve(__dirname, './fixtures/index.js'),
        },
      },
    }).then((res) => {
      [res].flat().forEach((chunk: any) => {
        chunk.output.forEach((o: any) => {
          expect(o.code).not.contain('moment')
        })
      })
    })
  })
})
