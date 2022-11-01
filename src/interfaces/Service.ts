// Services
export interface Lesson {
    title: string,
    description: string,
    videoUrl: string,
    points: string[],
    dateCreated: Date,
    id: string
}

export interface Service {
    name: string,
    titleImage: string,
    createdOn: string,
    orders: number,
    description: string,
    price: number,
    lessons: Lesson[]
    points: string[]
}

export interface MongooseService extends Service {
    _id: string
}