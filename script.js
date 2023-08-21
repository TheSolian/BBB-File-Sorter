const fs = require('fs')
const path = require('path')

const downloadPath = path.resolve('download path here')
const bbbPath = path.resolve(
  'bbb path here'
)

const files = fs.readdirSync(downloadPath)

const bbbFiles = files.filter((file) => {
  file.startsWith('LA_') || file.startsWith('PR_')
})

if (bbbFiles.length === 0) console.log('No files found')

bbbFiles.forEach((file) => {
  if (file.startsWith('LA_')) {
    const fileWithoutEnding = file.slice(0, -'.docx'.length)
    const filePath = path.resolve(downloadPath, file)

    const module = file.substring(3, 6)
    if (module === 'ILA') return
    const modulePath = path.resolve(bbbPath, module)

    if (!fs.existsSync(modulePath)) fs.mkdirSync(modulePath)
    if (fs.existsSync(path.resolve(modulePath, fileWithoutEnding))) return

    fs.mkdirSync(path.resolve(modulePath, fileWithoutEnding))

    fs.renameSync(filePath, path.resolve(modulePath, fileWithoutEnding, file))
  } else if (file.startsWith('PR_')) {
    const filePath = path.resolve(downloadPath, file)

    const module = file.substring(3, 6)
    if (module === 'ILA') return
    const modulePath = path.resolve(bbbPath, module)

    if (!fs.existsSync(path.resolve(modulePath, 'Theorie')))
      fs.mkdirSync(path.resolve(modulePath, 'Theorie'))
    if (fs.existsSync(path.resolve(modulePath, 'Theorie', file))) return

    fs.renameSync(filePath, path.resolve(modulePath, 'Theorie', file))
  }
})
