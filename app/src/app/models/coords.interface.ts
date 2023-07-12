export interface Coord {
    name: string
    local_names: LocalNames
    lat: number
    lon: number
    country: string
    state: string
  }
  
  export interface LocalNames {
    el: string
    zh: string
    ur: string
    ar: string
    ru: string
    it: string
    fa: string
    sr: string
    la: string
  }