export type Role = 'user'|'admin'

export type UserData = {
    first_name: string,
    username: string,
    role: Role,
    authenticated: boolean,
    whatsapp_number?: string,
    profile_picture: string,
}

export type SigninData = {
    identifier: string,
    password: string
}

export type SignupData = {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    whatsapp_number: string,
    password: string
}

export type ErrorData = {
    response: {
        data: {
            error: string
        }
    }
} | any

export type KlosetType = 'retail'|'custom'|'digital'|'books'

export type KlosetFormData = {
    name: string,
    slogan: string,
    type: KlosetType,
    category: string|undefined,
    shopNo: string|undefined,
    building: string|undefined,
    street: string|undefined,
    delivery: boolean|undefined,
    delivery_time: number|undefined
}

export type KlosetData = {
    data: KlosetData,
    address: string|undefined,
    user: number,
    dp: File|null,
}

export type Kloset = {
    id: number,
    name: string,
    slogan: string,
    dp: string,
    type: KlosetType,
    followers: UserData[]
}

export type Category = 'apparel'|'jewellery'|'shoes'|'decor'|'digital'|'books'
export type Condition = 'brand new'|'used'|'thrifted'
export type Genre = 'fiction'|'non-fiction'|'fantasy'|'mystery'|'sci-fi'

export type ProductFormData = {
    name: string,
    author?: string,
    cost: number,
    type: KlosetType,
    production_time? : number,
    quantity?: number,
    category?: Category,
    sub_category?: string,
    condition?: Condition,
    genres: Genre[],
    path: string,
    description?: string,
    summary?: string,
    [key: `product_photo_${number}`]: File; 
}

export type Product = {
    id: number,
    name: string,
    author?: string,
    description?: string,
    summary?: string,
    cost: number,
    category?: Category,
    sub_category?: string,
    condition?: Condition,
    genres: Genre[],
    path: string,
    quantity?: number,
    sold_out: boolean
}