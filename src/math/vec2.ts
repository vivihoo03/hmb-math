import { Coordinate } from './coordinate';


export class Vec2 extends Coordinate {

    static randomUnit() {
        const angle = Math.random() * Math.PI * 2;
        return new Vec2(Math.cos(angle), Math.sin(angle));
    }

    static random() {
        var mag = Math.sqrt(Math.random());
        var angle = Math.random() * Math.PI * 2;

        return new Vec2(Math.cos(angle) * mag, Math.sin(angle) * mag);
    }

    static fromCoordinate(a: Coordinate) {
        return new Vec2(a.x, a.y);
    }

    clone() {
        return new Vec2(this.x, this.y);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    squaredMagnitude() {
        return this.x * this.x + this.y * this.y;
    }

    invert() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    normalize() {
        return this.scale(1 / this.magnitude());
    }

    add(b: Coordinate) {
        this.x += b.x;
        this.y += b.y;
        return this;
    }

    subtract(b: Coordinate) {
        this.x -= b.x;
        this.y -= b.y;
        return this;
    }

    rotate(angle: number) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const newX = this.x * cos - this.y * sin;
        const newY = this.y * cos + this.x * sin;
        this.x = newX;
        this.y = newY;
        return this;
    }

    static rotateAroundPoint(v: Vec2, axisPoint: Vec2, angle: number) {
        const res = v.clone();
        return res.subtract(axisPoint).rotate(angle).add(axisPoint);
    }

    equals(b: Vec2) {
        return this == b || !!b && this.x == b.x && this.y == b.y;
    }

    sum(a: Vec2, b: Vec2) {
        return new Vec2(a.x + b.x, a.y + b.y);
    };


}