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
      "CommonMsg/Weapon/WeaponName_Main":_weapons_main,
      "CommonMsg/Weapon/WeaponName_Special":_weapons_special,
      "CommonMsg/Weapon/WeaponExp_Special":_weapons_special_desc,
      "CommonMsg/Weapon/WeaponName_Sub": _weapons_sub,
      "CommonMsg/Weapon/WeaponExp_Sub": _weapons_sub_desc,
      "CommonMsg/Weapon/WeaponTypeName":_weapons_type,
      "CommonMsg/Glossary":_glossary,
      "LayoutMsg/Cmn_Menu_00":_menu,
      "LayoutMsg/Cmn_CstBase_00":_menu2,
      "LayoutMsg/Plz_ItemMenu_00":_menu3,
      "LayoutMsg/Cmn_ManualAll_00":_menu4,
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
      weapons:{
        main:_weapons_main,
        special:Object.fromEntries(Object.keys(_weapons_special).map(k => [k, {name:_weapons_special[k], description:_weapons_special_desc[k]?.replaceAll("\n", " ")}])),
        sub:Object.fromEntries(Object.keys(_weapons_sub).map(k => [k, {name:_weapons_sub[k], description:_weapons_sub_desc[k]?.replaceAll("\n", " ")}])),
        type:_weapons_type,
      },
      skills:Object.fromEntries(Object.keys(_skill).map(k => [k, {name:_skill[k], description:_skill_desc[k]?.replaceAll("\n", " ")}])),
      text:{
        story:_glossary.ModeMission,
        splatfest:_glossary.FesPhase_01,
        splatoween:"Splatoween",
        frostyfest:"Frostyfest",
        amiibo:brands.B99,
        splatnet:_glossary.SDServiceName,
        salmonrun:_menu["L_BtnFestStage_02-T_BlackText_00"],
        catalog:_menu["L_Player_01-T_BlackText_00"],
        owned:`✔️ ${_menu2["L_BtnList_08-T_SoldOut_00"]}`,
        sort:{
          type:_menu["L_Player_00-T_BlackText_00"],
          level:_menu["L_Rank_00-T_RankHeader_00"],
          skill:_menu2["001"],
          brand:_menu2["002"],
          owned:_menu2["006"],
          reverse:_menu2["L_BtnOption_00-T_BtnR_00"],
        },
        filter:{
          skill:_menu2["001"],
          brand:_menu2["002"],
          owned:_menu2["006"],
          weapons:_menu2["L_MySetBtnCategory_00-T_Category_00"],
          head:_menu2["L_MySetBtnCategory_01-T_Category_00"],
          clothes:_menu2["L_MySetBtnCategory_02-T_Category_00"],
          shoes:_menu2["L_MySetBtnCategory_03-T_Category_00"],
          empty:_menu3["T_NoSort_00"],
        },
        ok:_menu4["L_ContentsB_09-T_Note_06"],
      }
    }

    //Save data
    await save(`static/language/${id}.json`, data)
    await save("static/language/list.json", languages)
  }
}