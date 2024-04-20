//Imports
import {url, download} from "./tools.ts"

//Build data
export async function build() {
  for (const {id, link} of [
    //Obtention
    {id:"salmonrun.webp", link:"images/badge/Badge_CoopClearDangerRateMax.webp"},
    {id:"bronzescales.webp", link:"images/coop/UrocoIcon_02.webp"},
    {id:"silverscales.webp", link:"images/coop/UrocoIcon_01.webp"},
    {id:"goldscales.webp", link:"images/coop/UrocoIcon_00.webp"},
    {id:"splatfest.webp", link:"images/badge/Badge_FestRankMax.webp"},
    {id:"splatoween.webp", link:"images/badge/Badge_FestRankMax.webp"},
    {id:"frostyfest.webp", link:"images/badge/Badge_FestRankMax.webp"},
    {id:"springfest.webp", link:"images/badge/Badge_FestRankMax.webp"},
    {id:"story.webp", link:"images/badge/Badge_Mission_Lv01.webp"},
    {id:"sideorder.webp", link:"images/badge/Badge_Achievement_Sdodr_Lv03.webp"},
    {id:"splatnet.webp", link:"images/badge/Badge_OrderVendor_Lv00.webp"},
    {id:"catalog.webp", link:"images/badge/Badge_CatalogueLevel_Lv00.webp"},
    {id:"amiibo.webp", link:"images/brand/B99.webp"},
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