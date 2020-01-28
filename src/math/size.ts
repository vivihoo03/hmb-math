
export class Size {
    constructor(public width: number, public height: number) { }

    static equals(a: Size, b: Size) {
        if (a == b) {
            return true;
        }

        return a.width === b.width && a.height == b.height;
    }

    clone() {
        return new Size(this.width, this.height);
    }

    getLongest() {
        return Math.max(this.width, this.height);
    }

    getShortest() {
        return Math.min(this.width, this.height);
    }

    area() {
        return this.width * this.height;
    }

    perimeter() {
        return (this.width + this.height) * 2;
    }

    aspectRatio() {
        return this.width / this.height;
    }

    isEmpty() {
        return !this.area();
    }

    ceil() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this;
    }

    fitsInside(target: Size) {
        return this.width <= target.width && this.height <= target.height;
    }

    floor() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this;
    }

    round() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    }

    scale(sx: number, opt_sy?: number) {
        const sy = typeof opt_sy ? opt_sy : sx;
        this.width *= sx;
        this.height *= sy;
        return this;
    }

    scaleToCover(target: Size) {
        const s = this.aspectRatio() <= target.aspectRatio() ?
            target.width / this.width :
            target.height / this.height;

        return this.scale(s);
    }

    scaleToFit(target: Size) {
        const s = this.aspectRatio() > target.aspectRatio() ?
            target.width / this.width :
            target.height / this.height;
        return this.scale(s);
    }


}