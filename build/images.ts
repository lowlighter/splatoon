//Imports
import {url, download} from "./tools.ts"

//Build data
export async function build() {
  for (const {id, link} of [
    //Obtention
    {id:"salmonrun.png", link:"images/badge/Badge_CoopClearDangerRateMax.png"},
    {id:"splatfest.png", link:"images/badge/Badge_FestRankMax.png"},
    {id:"splatoween.png", link:"images/badge/Badge_FestRankMax.png"},
    {id:"frostyfest.png", link:"images/badge/Badge_FestRankMax.png"},
    {id:"story.png", link:"images/badge/Badge_Mission_Lv01.png"},
    {id:"splatnet.png", link:"images/badge/Badge_OrderVendor_Lv00.png"},
    {id:"catalog.png", link:"images/badge/Badge_CatalogueLevel_Lv00.png"},
    {id:"amiibo.png", link:"images/brand/B99.png"},
    //Categories
    {id:"weapons.png", link:"images/badge/Badge_SpendShop_Weapons_Lv00.png"},
    {id:"gears.png", link:"images/badge/Badge_OrderVendor_Lv00.png"},
    {id:"shoes.png", link:"images/badge/Badge_SpendShop_Shoes_Lv00.png"},
    {id:"head.png", link:"images/badge/Badge_SpendShop_Head_Lv00.png"},
    {id:"clothes.png", link:"images/badge/Badge_SpendShop_Clothes_Lv00.png"},
    {id:"locker.png", link:"images/badge/Badge_SpendShop_Goods_Lv00.png"},
    {id:"cards.png", link:"images/badge/Badge_OrderFood_Lv00.png"},
    //Other
    {id:"favicon.png", link:"images/badge/Badge_SpendShop_Goods_Lv00.png"},
    {id:"icon.png", link:"images/badge/Badge_SpendShop_Goods_Lv00.png"},
    {id:"loading.png", link:"images/badge/Badge_SpendShop_Goods_Lv00.png"},
    {id:"controls.png", link:"images/badge/Badge_WinCount_Pnt_Lv00.png"},
  ])
  await download(url(link), `static/assets/${id}`)
}