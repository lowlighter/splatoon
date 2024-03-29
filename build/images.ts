//Imports
import {url, download} from "./tools.ts"

//Build data
export async function build() {
  for (const {id, link} of [
    //Obtention
    {id:"salmonrun.webp", link:"images/badge/Badge_CoopClearDangerRateMax.webp"},
    {id:"splatfest.webp", link:"images/badge/Badge_FestRankMax.webp"},
    {id:"splatoween.webp", link:"images/badge/Badge_FestRankMax.webp"},
    {id:"frostyfest.webp", link:"images/badge/Badge_FestRankMax.webp"},
    {id:"story.webp", link:"images/badge/Badge_Mission_Lv01.webp"},
    {id:"splatnet.webp", link:"images/badge/Badge_OrderVendor_Lv00.webp"},
    {id:"catalog.webp", link:"images/badge/Badge_CatalogueLevel_Lv00.webp"},
    {id:"amiibo.webp", link:"images/brand/B99.webp"},
    //Categories
    {id:"weapons.webp", link:"images/badge/Badge_SpendShop_Weapons_Lv00.webp"},
    {id:"gears.webp", link:"images/badge/Badge_OrderVendor_Lv00.webp"},
    {id:"shoes.webp", link:"images/badge/Badge_SpendShop_Shoes_Lv00.webp"},
    {id:"head.webp", link:"images/badge/Badge_SpendShop_Head_Lv00.webp"},
    {id:"clothes.webp", link:"images/badge/Badge_SpendShop_Clothes_Lv00.webp"},
    {id:"locker.webp", link:"images/badge/Badge_SpendShop_Goods_Lv00.webp"},
    {id:"cards.webp", link:"images/badge/Badge_OrderFood_Lv00.webp"},
    //Other
    {id:"favicon.webp", link:"images/badge/Badge_SpendShop_Goods_Lv00.webp"},
    {id:"icon.webp", link:"images/badge/Badge_SpendShop_Goods_Lv00.webp"},
    {id:"loading.webp", link:"images/badge/Badge_SpendShop_Goods_Lv00.webp"},
    {id:"controls.webp", link:"images/badge/Badge_WinCount_Pnt_Lv00.webp"},
  ])
  await download(url(link), `static/assets/${id}`)
}