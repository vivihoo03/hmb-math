
export interface IPoint2d {
    x: number;
    y: number;
    [k: string]: any;
}

export interface IPoint3d extends IPoint2d {
    z: number;
}

export type IPolygon = IPoint2d[];

export type IPolyline = IPoint2d[];

