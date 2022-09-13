//Imports
import {url, save, log} from "./tools.ts"

//Languages list
const languages = {
  CNzh:{name:"汉语", flag:"🇨🇳"},
  EUde:{name:"Deutsch", flag:"🇩🇪"},
  EUen:{name:"English", flag:"🇬🇧"},
  EUes:{name:"Español", flag:"🇪🇸"},
  EUfr:{name:"Français", flag:"🇫🇷"},
  EUit:{name:"italiano ", flag:"🇮🇹"},
  EUnl:{name:"Nederlands", flag:"🇳🇱"},
  EUru:{name:"Русский язык", flag:"🇷🇺"},
  JPja:{name:"日本語", flag:"🇯🇵"},
  KRko:{name:"한국어", flag:"🇰🇷"},
  TWzh:{name:"國語", flag:"🇹🇼"},
  USen:{name:"English (US)", flag:"🇺🇸"},
  USes:{name:"Español (US)", flag:"🇪🇸"},
  USfr:{name:"Français (US)", flag:"🇫🇷"},
}

//Build data
export async function build() {
  for (const [id, {name, flag}] of Object.entries(languages)) {
    //Fetch data
    log.debug(`processing: ${name} (${id})`)
    const {
      "CommonMsg/Gear/GearBrandName":brands,
      "CommonMsg/Gear/GearName_Clothes":_clothes,
      "CommonMsg/Gear/GearName_Head":_head,
      "CommonMsg/Gear/GearName_Shoes":_shoes,
      "CommonMsg/Gear/GearPowerName":_skill,
      "CommonMsg/Gear/GearPowerExp":_skill_desc,
      "CommonMsg/Glossary":_glossary,
      "LayoutMsg/Cmn_Menu_00":_menu,
    } =  await fetch(url(`data/language/${id}.json`)).then(response => response.json())

    //Format data
    const data = {
      name,
      flag,
      brands,
      gears:Object.fromEntries([
        ...Object.entries(_clothes).map(([k, v]) => [`Clt_${k}`, v]),
        ...Object.entries(_head).map(([k, v]) => [`Hed_${k}`, v]),
        ...Object.entries(_shoes).map(([k, v]) => [`Shs_${k}`, v]),
      ]),
      skills:Object.fromEntries(Object.keys(_skill).map(k => [k, {name:_skill[k], description:_skill_desc[k]}])),
      text:{
        story:_glossary.ModeMission,
        splatfest:_glossary.FesPhase_01,
        amiibo:brands.B99,
        splatnet:_glossary.SDServiceName,
        salmonrun:_menu["L_BtnFestStage_02-T_BlackText_00"],
        catalog:_menu["L_Player_01-T_BlackText_00"],
        weapon:_menu["L_BtnMap_05-T_Text_00"],
        head:_menu["L_BtnMap_06-T_Text_00"],
        clothes:_menu["L_BtnMap_07-T_Text_00"],
        shoes:_menu["L_BtnMap_08-T_Text_00"],
        locker:_menu["L_BtnMap_09-T_Text_00"],
        owned:"✔️",
      }
    }

    //Save data
    await save(`static/language/${id}.json`, data)
  }
}