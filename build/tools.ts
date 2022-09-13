//Imports
import {gray, cyan, yellow} from "https://deno.land/std@0.155.0/fmt/colors.ts"
import {ensureDir} from "https://deno.land/std@0.155.0/fs/mod.ts"
import {dirname} from "https://deno.land/std@0.155.0/path/mod.ts"
import {copy, readerFromStreamReader} from "https://deno.land/std@0.155.0/streams/conversion.ts"

//Logger
export const log = {
  debug(text:string) {
    console.debug(gray(text))
  },
  info(text:string) {
    console.debug(cyan(text))
  },
  warn(text:string) {
    console.debug(yellow(text))
  }
}

//Format URL to remote endpoint
export function url(path:string) {
  return `https://raw.githubusercontent.com/Leanny/leanny.github.io/master/splat3/${path}`
}

//Save JSON content to specified path
export async function save(path:string, content:Record<PropertyKey, unknown>|Array<unknown>) {
  try {
    log.debug(`saving: ${path}`)
    await ensureDir(dirname(path))
    await Deno.writeTextFile(path, JSON.stringify(content, null, 2))
  }
  catch (error) {
    log.warn(`error: ${error.message}`)
  }
}

//Save remote file to specified path
export async function download(source:string, destination:string) {
  try {
    log.debug(`saving: ${source} → ${destination}`)
    await ensureDir(dirname(destination))
    const file = await Deno.open(destination, { create: true, write: true })
    try {
      const reader = await fetch(source).then(response => response.body?.getReader())
      if (reader)
        await copy(readerFromStreamReader(reader), file)
    }
    finally {
      file.close()
    }
  }
  catch (error) {
    log.warn(`error: ${error.message}`)
  }
}
