export interface IPaginacao<T> {//array com tipo T generico
    count: number
    next: string
    previous: string
    results: T[] //array com tipo T generico
}