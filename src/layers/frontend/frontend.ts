import { Layer } from '@/types'
import { makeCode } from '@/layers/code/code'
import { getPackage, getCompilerOptions } from '@/tools/dissect-layer'
import { wrapHtml } from '@/tools/wrap-html'
import arraySumTxt from '@/layers/code/templates/src/array-sum.txt'
import arraySumSpecTxt from '@/layers/code/templates/src/array-sum-spec.txt'

import indexDTxt from './templates/basic/index-d.txt'
import webpackDevTxt from './templates/basic/webpack-dev.txt'
import webpackProdTxt from './templates/basic/webpack-prod.txt'
import webpackTxt from './templates/basic/webpack-config.txt'
import faviconTxt from './templates/src/favicon.txt'
import indexTxt from './templates/src/index.txt'
import mainScssTxt from './templates/src/main-scss.txt'
import mainTsTxt from './templates/src/main-ts.txt'
import readmeTxt from './templates/readme.txt'

export const makeFrontend = (): Layer => {
  const code = makeCode()
  const co = getCompilerOptions(code)
  const codePackage = getPackage(code)
  const { scripts, devDependencies } = codePackage

  co.lib.push('dom')

  code.scaffold['index.d.ts'] = indexDTxt

  scripts['format-scss'] = 'prettier **/*.scss --write'
  scripts.build = 'webpack'
  scripts.serve = 'webpack serve'

  codePackage.devDependencies = {
    ...devDependencies,

    'webpack': '^5.28.0',
    'webpack-cli': '^4.6.0',
    'webpack-dev-server': '^3.11.2',
    'babel-loader': '^8.2.2',
    'css-loader': '^5.2.0',
    'sass-loader': '^11.0.1',
    'style-loader': '^2.0.0',
    'mini-css-extract-plugin': '^1.4.0',
    'sass': '^1.32.8',
    'html-webpack-plugin': '^5.3.1',
    'clean-webpack-plugin': '^3.0.0',
    'copy-webpack-plugin': '^8.1.0',
    '@types/mini-css-extract-plugin': '^1.4.1',
    '@types/copy-webpack-plugin': '^6.4.1',
  }

  return {
    scaffold: {
      ...code.scaffold,

      'dev-helpers/webpack-dev.ts': webpackDevTxt,
      'dev-helpers/webpack-prod.ts': webpackProdTxt,
      'webpack.config.ts': webpackTxt,
    },
    getSrc() {
      return {
        'favicon.svg': faviconTxt,
        'index.html': wrapHtml('Frontend', indexTxt),
        'main.scss': mainScssTxt,
        'main.ts': mainTsTxt,
        'array-sum.ts': arraySumTxt,
        'array-sum.spec.ts': arraySumSpecTxt,
      }
    },
    getReadme() {
      return readmeTxt
    },
  }
}
