import { SourceMapConsumer } from 'source-map'
import * as sourceMapResolve from 'source-map-resolve'
import * as fs from 'fs'

export async function getOriginalPosition ({ codeUrl, line, column }) {
  try {
    const rawSourceMap = getSourceMap(codeUrl)
    const consumer = await new SourceMapConsumer(rawSourceMap.map)
    const info = consumer.originalPositionFor({ line, column })
    consumer.destroy()
    return info
  } catch (e) {
    return null
  }
}

function getSourceMap (codeUrl: string) {
  const code = fs.readFileSync(codeUrl, 'utf8')
  const result = sourceMapResolve.resolveSourceMapSync(code, codeUrl, fs.readFile)
  return result
}
