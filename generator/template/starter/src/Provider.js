import { version, name } from '../package.json'

const pages = null // require.context('./pages', true, /\.vue$/)

export default () => {
  return {
    name,
    pages,
    layouts: null,
    store: { },
    version
  }
}
