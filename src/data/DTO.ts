export interface Point {
    x: number,
    y: number
}

export interface ClientDTO {
    id?: string,
    name: string,
    email: string,
    phone: string,
    location: Point
}