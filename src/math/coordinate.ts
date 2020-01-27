import { HMath } from './math';

export class Coordinate {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public clone() {
        return new Coordinate(this.x, this.y)
    }

    public toString() {
        return `(${this.x}, ${this.y})`;
    }

    static equals(a: Coordinate, b: Coordinate) {
        if (a === b) return true;
        return a.x == b.x && a.y == b.y;
    }

    static distance(a: Coordinate, b: Coordinate) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static magnitude(a: Coordinate) {
        return Math.sqrt(a.x * a.x + a.y * a.y);
    }

    static azimuth(a: Coordinate) {
        return HMath.angle(0, 0, a.x, a.y);
    }

    static squareDistance(a: Coordinate, b: Coordinate) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return dx * dx + dy * dy;
    }

    static difference(a: Coordinate, b: Coordinate) {
        return new Coordinate(a.x - b.x, a.y - b.y);
    }

    static sum(a: Coordinate, b: Coordinate) {
        return new Coordinate(a.x + b.x, a.y + b.y);
    }

    // add more
    static zero() {
        return new Coordinate(0, 0);
    }

    public ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }

    public floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    public round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    public translate(tx: number | Coordinate, opt_ty?: number) {
        if (tx instanceof Coordinate) {
            this.x += tx.x;
            this.y += tx.y;
        } else {
            this.x += tx;
            if (typeof opt_ty == 'number') {
                this.y += opt_ty
            }
        }
        return this;
    }

    public scale(sx: number, opt_sy?: number) {
        const sy = typeof opt_sy === 'number' ? opt_sy : sx;
        this.x *= sx;
        this.y *= sy;
        return this;
    }

    public rotateRadians(radians: number, opt_center?: Coordinate) {
        const center = opt_center || Coordinate.zero();

        const x = this.x;
        const y = this.y;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        this.x = (x - center.x) * cos - (y - center.y) * sin + center.x;
        this.y = (x - center.x) * sin + (y - center.y) * cos + center.y;
    }

    public rotateDegrees(degrees: number, opt_center?: Coordinate) {
        this.rotateRadians(HMath.toRadians(degrees), opt_center);
    }
}