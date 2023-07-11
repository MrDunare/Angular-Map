

export interface Fact {
  status: Status
  _id: string
  user: string
  text: string
  __v: number
  source: string
  updatedAt: string
  type: string
  createdAt: string
  deleted: boolean
  used: boolean
}

export interface Status {
  verified: boolean
  sentCount: number
}