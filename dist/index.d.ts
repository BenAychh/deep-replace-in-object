export interface anyObject {
    [key: string]: any;
}
export default function deepReplaceInObject(currentValue: string | number, newValue: string | number, objectToReplaceIn: anyObject | any[]): typeof objectToReplaceIn;
