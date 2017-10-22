

export interface Person {
    id:     number;
    name:   string;
    weight: number;
    height: number; 
    //the ? means optional.
    profession?: string;
}
