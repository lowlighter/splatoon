//Imports
import {url, save, download, log} from "./tools.ts"

//Build data
export async function build(version:string) {
  //Fetch data
  const type = "weapon"
  const link = url(`data/mush/${version}/WeaponInfoMain.json`)
  log.debug(`processing: ${type} (${link})`)
  const fetched = await fetch(link).then(response => response.json())

  //Format data
  const data = fetched.map(({
    __RowId:id,
    ShopUnlockRank:level,
    ShopPrice: price,
    SpecialWeapon: special,
    SubWeapon: sub,
  }:raw) => ({
    id,
    type,
    level,
    price,
    sub:sub.match(/\/(?<value>\w+)\.spl/)?.groups?.value,
    special:special.match(/\/(?<value>\w+)\.spl/)?.groups?.value,
  })).filter(({level}:{level:number}) => level >= 0)

  //Download images
  await Promise.allSettled(data.map(({id}:{id:string}) => download(url(`images/weapon_flat/Path_Wst_${id}.png`), `static/weapon/${id}.png`)))
  await Promise.allSettled(data.map(({sub}:{sub:string}) => download(url(`images/subspe/Wsb_${sub}00.png`), `static/weapon/sub/${sub}.png`)))
  await Promise.allSettled(data.map(({special}:{special:string}) => download(url(`images/subspe/Wsp_${special}00.png`), `static/weapon/special/${special}.png`)))

  //Save data
  await save(`static/weapon/list.json`, data)
}

//Raw gear data
type raw = {
  __RowId:string,
  ShopUnlockRank:number,
  ShopPrice:number,
  SpecialWeapon:string,
  SubWeapon:string,
}