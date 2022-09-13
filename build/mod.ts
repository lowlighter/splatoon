//Imports
import * as languages from "./languages.ts"
import * as gears from "./gears.ts"
import * as images from "./images.ts"
import * as weapons from "./weapons.ts"

//Build
const version = "110"
await languages.build()
await images.build()
await gears.build(version)
await weapons.build(version)
