import { Coordinate } from './coordinate';


export class Box {
    public top: number;
    public right: number;
    public bottom: number;
    public left: number;

    constructor(top: number, right: number, bottom: number, left: number) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }

    static boundingBox(...args: Coordinate[]) {
        const len = args.length;
        if (!len) return;
        const first = args[0];
        const box = new Box(first.y, first.x, first.y, first.x);
        for (let i = 1; i < len; i++) {
            const coord = args[i];
            box.top = Math.min(box.top, coord.y);
            box.right = Math.max(box.right, coord.x);
            box.bottom = Math.max(box.bottom, coord.y);
            box.left = Math.min(box.left, coord.x);
        }
        return box;
    }

    getWidth() {
        return this.right - this.left;
    }

    getHeight() {
        return this.bottom - this.top;
    }

    clone() {
        return new Box(this.top, this.right, this.bottom, this.left);
    }

    contains(other: Box | Coordinate) {
        return Box.contains(this, other)
    }

    expand(
        top: number | Box,
        opt_right: number = 0,
        opt_bottom: number = 0,
        opt_left: number = 0
    ) {
        if (top instanceof Box) {
            this.top -= top.top;
            this.right += top.right;
            this.bottom += top.bottom;
            this.left -= top.left;
        } else {
            this.top -= top;
            this.right += opt_right;
            this.bottom += opt_bottom;
            this.left -= opt_left;
        }
    }

    expandToInclude(box: Box) {
        this.left = Math.min(this.left, box.left);
        this.top = Math.min(this.top, box.top);
        this.right = Math.max(this.right, box.right);
        this.bottom = Math.max(this.bottom, box.bottom);
    }

    static equals(a: Box, b: Box) {
        if (a == b) {
            return true;
        }

        return a.top == b.top && a.right == b.right &&
            a.bottom == b.bottom && a.left == b.left;
    }

    static contains(box: Box, other: Box | Coordinate) {
        if (other instanceof Box) {
            return other.left >= box.left && other.right <= box.right &&
                other.top >= box.top && other.bottom <= box.bottom;
        }
        return other.x >= box.left && other.x <= box.right &&
            other.y >= box.top && other.y <= box.bottom;
    }

    static relativePositionX(box: Box, coord: Coordinate) {
        if (coord.x < box.left) {
            return coord.x - box.left
        } else if (coord.x > box.right) {
            return coord.x - box.right
        }
        return 0;
    }

    static relativePositionY(box: Box, coord: Coordinate) {
        if (coord.y < box.top) {
            return coord.y - box.top;
        } else if (coord.y > box.bottom) {
            return coord.y - box.bottom;
        }
        return 0;
    }

    static distance(box: Box, coord: Coordinate) {
        const x = this.relativePositionX(box, coord);
        const y = this.relativePositionY(box, coord);
        return Math.sqrt(x * x + y * y);
    }

    static intersects(a: Box, b: Box) {
        return (a.left <= b.right && b.left <= a.right &&
            a.top <= b.bottom && b.top <= a.bottom);
    }

    static intersectsWithPadding(a: Box, b: Box, padding: number) {
        return (a.left <= b.right + padding && b.left <= a.right + padding &&
            a.top <= b.bottom + padding && b.top <= a.bottom + padding);
    }

    ceil() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this;
    }

    floor() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this;
    }

    round() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this;
    }

    translate(tx: Coordinate | number, opt_ty?: number) {
        if (tx instanceof Coordinate) {
            this.left += tx.x;
            this.right += tx.x;
            this.top += tx.y;
            this.bottom += tx.y;
        } else {
            this.left += tx;
            this.right += tx;
            if (typeof opt_ty === 'number') {
                this.top += opt_ty;
                this.bottom += opt_ty;
            }
        }
        return this;
    }

    scale(sx: number, opt_sy?: number) {
        var sy = typeof opt_sy === 'number' ? opt_sy : sx;
        this.left *= sx;
        this.right *= sx;
        this.top *= sy;
        this.bottom *= sy;
        return this;
    }

}