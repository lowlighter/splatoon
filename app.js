Vue.createApp({
  //Data
  data() {
    return {
      _gears:[],
      _weapons:[],
      _texts:null,
      _cached:{
        skills:[],
        brands:[],
        types:[],
        texts:{},
      },
      filters:{
        brands:new Set(),
        skills:new Set(),
        types:new Set(),
        name:"",
        owned:null,
      },
      sort:{
        mode:"a-z",
      },
      dialog:{
        help:false,
        reset:false,
        exported:false,
        imported:false,
        importable:false,
      },
      languages:null,
      language:"EUen",
      importable:"",
    }
  },
  //Watchers
  watch: {
    //Language change data reloader
    async language(current) {
      if (!(current in this._cached.texts))
        this._cached.texts[current] = await fetch(`/static/language/${current}.json`).then(response => response.json())
      this._texts = this._cached.texts[current] || this._cached.texts["EUen"]
      localStorage.setItem(".language", current)
    },
    //Sorting preference saver
    sort:{
      handler(current) {
        localStorage.setItem(".sort", current.mode)
      },
      deep: true
    },
    //Dialog handler
    dialog:{
      handler(current) {
        if (!current.help)
          localStorage.setItem(".help", "1")
      },
      deep: true
    }
  },
  //Computed properties
  computed:{
    //Text
    text() {
      return this._texts?.text
    },
    //Weapons list
    weapons() {
      return this._weapons.map(({id, special, ...data}) => ({
        id,
        icon:`/static/weapon/${id}.webp`,
        name:this._texts.weapons.main[id],
        special:{
          id:special,
          name:this._texts.weapons.special[special].name,
          description:this._texts.weapons.special[special].description,
          icon:`static/weapon/special/${special}.webp`,
        },
        ...data,
      })).sort((a, b) => {
        switch (this.sort.mode) {
          case "a-z":
            return a.name.localeCompare(b.name)
          case "z-a":
            return b.name.localeCompare(a.name)
          case "owned":
            return a.owned === b.owned ? a.name.localeCompare(b.level) : a.owned - b.owned
          default:
            return a.level - b.level
        }
      })
    },
    //Gears list
    gears() {
      return this._gears.filter(({id, type, brand, skill}) =>
        ((!this.filters.types.size)||(this.filters.types.has(type)))&&
        ((!this.filters.brands.size)||(this.filters.brands.has(brand)))&&
        ((!this.filters.skills.size)||(this.filters.skills.has(skill)))&&
        ((!this.filters.name)||(this._texts.gears[id].toLocaleLowerCase().includes(this.filters.name.toLocaleLowerCase()))||(this._texts.gears[id].toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(this.filters.name.toLocaleLowerCase())))
      ).map(({id, brand, skill, ...data}) => ({
        id,
        name:this._texts.gears[id],
        icon:`/static/gear/${id}.webp`,
        brand:{
          id:brand,
          name:this._texts.brands[brand],
          icon:`/static/brand/${brand}.webp`,
        },
        skill:{
          id:skill,
          name:this._texts.skills[skill].name,
          description:this._texts.skills[skill].description,
          icon:`static/skill/${skill}.webp`,
        },
        ...data
      })).sort((a, b) => {
        switch (this.sort.mode) {
          case "type":
            return this._cached.types.indexOf(a.type) - this._cached.types.indexOf(b.type)
          case "brand":
            return this._cached.brands.indexOf(a.brand.id) - this._cached.brands.indexOf(b.brand.id)
          case "skill":
            return this._cached.skills.indexOf(a.skill.id) - this._cached.skills.indexOf(b.skill.id)
          case "z-a":
            return b.name.localeCompare(a.name)
          case "owned":
            return a.owned === b.owned ? a.name.localeCompare(b.name) : a.owned - b.owned
          default:
            return a.name.localeCompare(b.name)
        }
      })
    },
    //Skills list
    skills() {
      return this._cached.skills.map(skill => ({
        id:skill,
        name:this._texts.skills[skill].name,
        description:this._texts.skills[skill].description,
        icon:`static/skill/${skill}.webp`,
      }))
    },
    //Brands list
    brands() {
      return this._cached.brands.map(brand => ({
        id:brand,
        name:this._texts.brands[brand],
        icon:`static/brand/${brand}.webp`,
      }))
    },
    //Current progress
    progress() {
      return {
        current:this.gears.filter(gear => gear.owned).length + this.weapons.filter(weapon => weapon.owned).length,
        total:this.gears.length + this.weapons.length,
      }
    },
  },
  //Methods
  methods:{
    //Has item
    has(item) {
      return localStorage.getItem(item.id) === "1"
    },
    //Toggle item owned status
    toggle(item) {
      this.has(item) ? localStorage.removeItem(item.id) : localStorage.setItem(item.id, "1")
      switch (item.type) {
        case "head":
        case "clothes":
        case "shoes":
          return this._gears.filter(({id}) => id === item.id).at(0).owned = this.has(item)
        case "weapon":
          return this._weapons.filter(({id}) => id === item.id).at(0).owned = this.has(item)
      }
    },
    //Toggle menu expansion
    menu() {
      document.querySelector("nav").classList.toggle("expanded")
    },
    //Display help
    help(event) {
      event.preventDefault()
      this.dialog.help = true
    },
    //Reset progress
    reset(event) {
      event.preventDefault()
      for (const key in localStorage) {
        if (!key.startsWith("."))
          localStorage.removeItem(key)
      }
      this._gears.forEach(gear => gear.owned = this.has(gear))
      this.dialog.reset = true
    },
    //Export progress
    exporter(event) {
      event.preventDefault()
      const exported = {}
      for (const key in localStorage) {
        const value = localStorage.getItem(key)
        if (value)
          exported[key] = value
      }
      this.importable = JSON.stringify(exported)
      this.dialog.exported = true
    },
    //Import progress
    importer(event) {
      event.preventDefault?.()
      if (event === true) {
        this.dialog.importable = false
        try {
          const imported = JSON.parse(this.importable)
          for (const key in imported)
            localStorage.setItem(key, imported[key])
          this._gears.forEach(gear => gear.owned = this.has(gear))
          this.dialog.imported = true
        } catch (error) {
          this.dialog.imported = error
        }
      }
      else
        this.dialog.importable = true
    },
  },
  //Mounting hook
  async mounted() {
    //Start loading
    const progress = document.querySelector(".loading .progress .inner").style
    progress.width = "0%"

    //Load language
    this.language = localStorage.getItem(".language") || "EUen"
    this.languages = await fetch("/static/language/list.json").then(response => response.json())
    for (const language of [localStorage.getItem(".language"), "EUen"]) {
      try {
        if (!language)
          continue
        this._texts = this._cached.texts[language] = await fetch(`/static/language/${language}.json`).then(response => response.json())
        break
      }
      catch {
        continue
      }
    }
    progress.width = "20%"

    //Load gears
    this._gears =[...await fetch("/static/gear/list.json").then(response => response.json())].map(gear => ({...gear, owned:this.has(gear)}))
    progress.width = "40%"
    this._cached.skills = [...new Set(this._gears.map(({skill}) => skill))].filter(skill => skill !== "None")
    this._cached.brands = [...new Set(this._gears.map(({brand}) => brand))]
    this._cached.types = [...new Set(this._gears.map(({type}) => type))]
    progress.width = "50%"

    //Load weapons
    this._weapons =[...await fetch("/static/weapon/list.json").then(response => response.json())].map(weapon => ({...weapon, owned:this.has(weapon)}))
    progress.width = "70%"

    //Load previous settings
    this.sort.mode = localStorage.getItem(".sort") || "a-z"
    progress.width = "80%"

    //Help message
    if (!localStorage.getItem(".help"))
      this.dialog.help = true

    //Complete loading
    progress.width = "100%"
    await new Promise(resolve => setTimeout(resolve, 400))
    document.querySelector(".loading").remove()
  }
}).mount("main")
