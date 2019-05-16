/**
 * 构建全局应用文件
 * 例如打点
 */

// 将代码用tsc默认配置转化
// 再用rollup处理
const rollup = require('rollup')
// const { uglify } = require('rollup-plugin-uglify')
const { exec } = require('child_process')
const fs = require('fs-extra')
const path = require('path')
const resolve = p => path.resolve(__dirname, '../', p)

const target = resolve('packages/utils')
const tmp = resolve('lib-global/tmp')
const tmpTsConfig = resolve('lib-global/tmp/tsconfig.json')

fs.copySync(target, tmp)
fs.outputFileSync(tmpTsConfig, JSON.stringify({
  compilerOptions: {
    target: 'es5',
    module: 'esnext'
  },
  include: [
    './*'
  ]
}))

exec(`tsc --project ${tmp}`, async (err, data) => {
  // if (err) throw err
  console.log(data)
  const outputBanner = `
/**
 * 全局打点方法
 * type dot = {
 *   new: (options: DefaultOptions) => void
 *   hit: (did: string) => void
 * }
 * window.EscDot = { 
 *   default: new() => dot, 
 *   hit: () => void 
 * }
 * generated by @yangming at ${Date.now()}
 */
`
  const inputOptions = {
    input: tmp + '/dot.js',
    plugins: [
      // uglify()
    ]
  }
  const outputOptions = {
    file: resolve('lib-global/dot.js'),
    format: 'umd',
    name: 'EscDot',
    exports: 'named',
    banner: outputBanner
    // sourcemap: true
  }
  const bundle = await rollup.rollup(inputOptions)
  await bundle.generate(outputOptions)
  await bundle.write(outputOptions)
  fs.removeSync(tmp)
})
