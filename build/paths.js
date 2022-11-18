const path = require('path')

const root = process.cwd()

module.exports = {
  SRC: path.join(root, 'src'),
  DIST: path.join(root, 'dist'),
  REPORTS: path.join(root, 'reports'),
  ROOT: root,
  i18n: path.join(root, 'i18n')
}
