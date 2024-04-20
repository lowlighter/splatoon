//Imports
import {url, save, download, log} from "./tools.ts"

//Build data
export async function build(version:string) {
  const data = []
  for (const {type, link} of [
    {type:"clothes", link:url(`data/mush/${version}/GearInfoClothes.json`)},
    {type:"head", link:url(`data/mush/${version}/GearInfoHead.json`)},
    {type:"shoes", link:url(`data/mush/${version}/GearInfoShoes.json`)},
  ]) {
    //Fetch data
    log.debug(`processing: ${type} (${link})`)
    const fetched = await fetch(link).then(response => response.json())

    //Format data
    data.push(... fetched.map(({
      __RowId:id,
      Brand:brand,
      HowToGet:obtention,
      Price:price,
      Rarity:rarity,
      Skill:skill,
      UrokoPrice:{
        BronzeUrokoNum:bronze,
        SilverUrokoNum:silver,
        GoldUrokoNum:gold
      }
    }:raw) => ({id, type, brand, obtention:obtention.toLocaleLowerCase(), price, rarity, skill, scales:{bronze, silver, gold}}))
      .filter(({obtention}:{obtention:string}) => obtention !== "impossible")
    )
  }

  //Process obtentions
  data.forEach(gear => {
    if (gear.id === "Clt_HAP001")
      gear.obtention = "splatfest"
    if (["Hed_HAP016", "Hed_HAP017", "Hed_HAP018", "Hed_HAP019"].includes(gear.id))
      gear.obtention = "splatoween"
    if (["Hed_HAP020", "Hed_HAP021", "Hed_HAP022", "Hed_HAP023"].includes(gear.id))
      gear.obtention = "frostyfest"
    if (["Hed_HAP024", "Hed_HAP025", "Hed_HAP026", "Hed_HAP027", "Shs_HAP008", "Shs_HAP009", "Shs_HAP010", "Shs_HAP011", "Shs_HAP012", "Shs_HAP013", "Shs_HAP014", "Shs_HAP015", "Shs_HAP016"].includes(gear.id))
      gear.obtention = "springfest"
    if (["Hed_TRG000", "Clt_TRG000", "Shs_TRG000", "Clt_TRG001", "Shs_TRG001"].includes(gear.id))
      gear.obtention = "splatnet"
    if (["Clt_MSN306", "Hed_MSN109", "Hed_MSN306", "Shs_MSN306"].includes(gear.id))
      gear.obtention = "story"
    if (["Clt_SDODR200", "Hed_SDODR200", "Hed_SDODR201", "Hed_SDODR202", "Hed_SDODR203", "Hed_SDODR204", "Shs_SDODR200"].includes(gear.id))
      gear.obtention = "sideorder"
    if ((gear.brand === "B97") && (gear.obtention === "other"))
      gear.obtention = "salmonrun"
    if (gear.obtention === "uroko") {
      if (gear.scales.bronze > 0)
        gear.obtention = "bronzescales"
      if (gear.scales.silver > 0)
        gear.obtention = "silverscales"
      if (gear.scales.gold > 0)
        gear.obtention = "goldscales"
    }
    if ((gear.brand === "B99")||(["Clt_MSN000", "Hed_MSN000", "Shs_MSN000", "Clt_MSN004", "Hed_MSN004", "Shs_MSN004"].includes(gear.id)))
      gear.obtention = "amiibo"
  })

  //Download images
  await Promise.allSettled(data.map(({id}) => download(url(`images/gear/${id}.png`), `static/gear/${id}.png`)))
  await Promise.allSettled([...new Set(data.map(({brand}) => brand))].map(id => download(url(`images/brand/${id}.png`), `static/brand/${id}.png`)))
  await Promise.allSettled(["Unknown", ...new Set(data.map(({skill}) => skill))].map(id => download(url(`images/skill/${id}.png`), `static/skill/${id}.png`)))

  //Save data
  await save(`static/gear/list.json`, data)
}

//Raw gear data
type raw = {
  __RowId:string,
  Brand:string,
  HowToGet:string,
  Price:number,
  Rarity:number,
  Skill:string,
  UrokoPrice:{
    BronzeUrokoNum:number,
    SilverUrokoNum:number,
    GoldUrokoNum:number
  }
}