export type Role = 'user'|'admin'

export type User = {
    id: number,
    first_name: string,
    username: string,
    profile_picture: string,
    role: Role,
    authenticated: boolean,

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
            message: string
        }
    }
} | any

export type E = {
    target: {
      value: string,
      files: FileList|null
    },
}

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
    dp: File|null
}