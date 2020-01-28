import { Box } from './box';
import { Coordinate } from './coordinate';
import { Size } from './size';


export class Rect {
    constructor(
        public left: number,
        public top: number,
        public width: number,
        public height: number
    ) { }

    clone() {
        return new Rect(this.left, this.top, this.width, this.height);
    }

    toBox() {
        const right = this.left + this.width;
        const bottom = this.top + this.height;
        return new Box(this.top, right, bottom, this.left);
    }

    static createFromBox(box: Box) {
        return new Rect(box.left, box.top, box.right - box.left, box.bottom - box.top);
    }

    equals(a: Rect, b: Rect) {
        if (a == b) return true;
        return a.left == b.left && a.width == b.width &&
            a.top == b.top && a.height == b.height;
    }

    intersection(rect: Rect) {
        const x0 = Math.max(this.left, rect.left);
        const x1 = Math.min(this.left + this.width, rect.left + rect.width);

        if (x0 <= x1) {
            const y0 = Math.max(this.top, rect.top);
            const y1 = Math.min(this.top + this.height, rect.top + rect.height);

            if (y0 <= y1) {
                this.left = x0;
                this.top = y0;
                this.width = x1 - x0;
                this.height = y1 - y0;
                return true;
            }
        }
        return false;
    }

    static intersection(a: Rect, b: Rect) {
        const x0 = Math.max(a.left, b.left);
        const x1 = Math.min(a.left + a.width, b.left + b.width);

        if (x0 <= x1) {
            const y0 = Math.min(a.top, b.top);
            const y1 = Math.min(a.top + a.height, b.top + b.height);

            if (y0 <= y1) {
                return new Rect(x0, y0, x1 - x0, y1 - y0);
            }
        }
    }

    static intersects(a: Rect, b: Rect) {
        return a.left <= b.left + b.width && b.left <= a.left + a.width &&
            a.top <= b.top + b.height && b.top <= a.top + a.height;
    }

    intersects(rect: Rect) {
        return Rect.intersects(this, rect);
    }

    static difference(a: Rect, b: Rect) {
        const intersection = Rect.intersection(a, b);
        if (!intersection || !intersection.height || !intersection.width) {
            return [a.clone()];
        }

        const result = [];
        let top = a.top;
        let height = a.height;

        const ar = a.left + a.width;
        const ab = a.top + a.height;

        const br = b.left + b.width;
        const bb = b.top + b.height;

        if (b.top > a.top) {
            result.push(
                new Rect(a.left, a.top, a.width, b.top - a.top)
            );
            top = b.top;
            height -= b.top - a.top;
        }

        if (bb < ab) {
            result.push(
                new Rect(a.left, bb, a.width, ab - bb)
            )
            height = bb - top;
        }

        if (b.left > a.left) {
            result.push(
                new Rect(a.left, top, b.left - a.left, height)
            )
        }

        if (br < ar) {
            result.push(
                new Rect(br, top, ar - br, height)
            )
        }

        return result;
    }

    difference(rect: Rect) {
        return Rect.difference(this, rect);
    }

    boundingRect(rect: Rect) {
        const right = Math.max(this.left + this.width, rect.left + rect.width);
        const bottom = Math.max(this.top + this.height, rect.top + rect.height);

        this.left = Math.min(this.left, rect.left);
        this.top = Math.min(this.top, rect.top);

        this.width = right - this.left;
        this.height = bottom - this.top;
    }

    static boundingRect(a: Rect, b: Rect) {
        if (!a || !b) {
            return null;
        }
        const clone = a.clone();
        clone.boundingRect(b);
        return clone;
    }

    contains(another: Rect | Coordinate) {
        if (another instanceof Rect) {
            return this.left <= another.left &&
                this.left + this.width >= another.left + another.width &&
                this.top <= another.top &&
                this.top + this.height >= another.top + another.height;
        } else {
            return another.x >= this.left &&
                another.x <= this.left + this.width &&
                another.y >= this.top &&
                another.y <= this.top + this.height;
        }
    }

    squaredDistance(point: Coordinate) {
        const dx = point.x < this.left ?
            this.left - point.x : Math.max(point.x - (this.left + this.width), 0);
        const dy = point.y < this.top ?
            this.top - point.y : Math.max(point.y - (this.top + this.height), 0);
        return dx * dx + dy * dy;
    }

    distance(point: Coordinate) {
        return Math.sqrt(this.squaredDistance(point));
    }

    getSize() {
        return new Size(this.width, this.height);
    }

    getTopLeft() {
        return new Coordinate(this.left, this.top);
    }

    getCenter() {
        return new Coordinate(this.left + this.width / 2, this.top + this.height / 2);
    }

    getBottomRight() {
        return new Coordinate(
            this.left + this.width,
            this.top + this.height
        )
    }

    ceil() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this;
    }

    floor() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this;
    }

    round() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    }

    translate = function (tx: number | Coordinate, opt_ty?: number) {
        if (tx instanceof Coordinate) {
            this.left += tx.x;
            this.top += tx.y;
        } else {
            this.left += tx;
            if (typeof opt_ty === 'number') {
                this.top += opt_ty;
            }
        }
        return this;
    }

    scale(sx: number, opt_sy?: number) {
        const sy = typeof opt_sy === 'number' ? opt_sy : sx;
        this.left *= sx;
        this.width *= sx;
        this.top *= sy;
        this.height *= sy;
        return this;
    };
}