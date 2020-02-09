import { Coordinate } from './coordinate';
import { HMath } from './math';

export class Line {

    constructor(
        public x0: number,
        public y0: number,
        public x1: number,
        public y1: number) {     
    }

    clone() {
        const { x0, x1, y0, y1} = this;
        return new Line(x0, y0, x1, y1);
    }

    equals(other: Line) {
        return this.x0 == other.x0 && this.y0 == other.y0 &&
         this.x1 == other.x1 && this.y1 == other.y1;
    }

    getSegmentLengthSquared() {
        const xdist = this.x1 - this.x0;
        const ydist = this.y1 - this.y0;
        return xdist * xdist + ydist * ydist;
    }

    getSegmentLength() {
        return Math.sqrt(this.getSegmentLengthSquared());
    }

    getClosestLinearInterpolation_(x: Coordinate | number, opt_y?: number) {
        let y;
        if (x instanceof Coordinate) {
            y = x.y;
            x = x.x;
        } else {
            y = opt_y;
        }

        const { x0, y0, x1, y1 } = this;

        const xChange = x1 - x0;
        const yChange = y1 - y0;

        return ((x - x0) * xChange + (y - y0) * yChange) / this.getSegmentLengthSquared();
    }

    getInterpolatedPoint(t: number) {
        const { x0, x1, y0, y1} = this;
        return new Coordinate(
            HMath.lerp(x0, x1, t),
            HMath.lerp(y0, y1, t)
        )
    }

    getClosestPoint(x: Coordinate | number, opt_y?: number) {
        return this.getInterpolatedPoint(
            this.getClosestLinearInterpolation_(x, opt_y)
        )
    }
    
    getClosestSegmentPoint(x: Coordinate | number, opt_y?: number) {
        return this.getInterpolatedPoint(
            HMath.clamp(this.getClosestLinearInterpolation_(x, opt_y), 0, 1)
        );
    }
}