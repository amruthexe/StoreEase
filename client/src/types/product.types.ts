export type IProduct = {
  _id: string
  name: string
  description?: string
  category: ICategory
  brand?: IBrand
  size?: 'SMALL' | 'MEDIUM' | 'LARGE';
  price: number
  stock: number
  seller: ISeller
}

export interface ISeller {
  _id: string
  name: string
  email: string
  contactNo: string
}

export interface ICategory {
  _id: string
  name: string
}

export interface IBrand {
  _id: string
  name: string
}