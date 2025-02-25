const fs = require('fs')
const path = require('path')

// 读取 package.json
const packagePath = path.join(__dirname, '..', 'package.json')
const manifestSrcPath = path.join(__dirname, '..', 'src', 'manifest.json')

try {
  // 读取文件
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  const manifestJson = JSON.parse(fs.readFileSync(manifestSrcPath, 'utf8'))

  // 更新 manifest.json 的相关字段
  manifestJson.name = packageJson.name
  manifestJson.version = packageJson.version
  manifestJson.description = packageJson.description

  // 写回文件
  fs.writeFileSync(
    manifestSrcPath,
    JSON.stringify(manifestJson, null, 2) + '\n',
    'utf8'
  )
} catch (error) {
  console.error('Error synchronizing manifest.json:', error)
  process.exit(1)
}
