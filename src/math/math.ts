
/**
 * base math util function
 */
export class HMath {
    static randomInt(a: number) {
        return Math.floor(Math.random() * a);
    }

    static uniformRandom(a: number, b: number) {
        return a + Math.random() * (b - a);
    }

    static clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max);
    }

    static modulo(a: number, b: number) {
        const r = a % b;
        // If r and b differ in sign, add b to wrap the result to the correct sign.
        return (r * b < 0) ? r + b : r;
    }

    static lerp(a: number, b: number, x: number) {
        return a + x * (b - a);
    }

    static nearlyEqual(a: number, b: number, torlance: number = 0.000001) {
        return Math.abs(a - b) <= torlance;
    }

    static standardAngle(angle: number) {
        return this.modulo(angle, 360);
    }

    static standardAngleInRadians(angle: number) {
        return this.modulo(angle, 2 * Math.PI);
    }

    static toRadians(degree: number) {
        return degree * Math.PI / 180;
    }

    static toDegree(radian: number) {
        return radian * 180 / Math.PI;
    }

    static angleDy(degrees: number, radius: number) {
        return radius * Math.sin(this.toRadians(degrees));
    }

    static angle(x1: number, y1: number, x2: number, y2: number) {
        return this.standardAngle(this.toDegree(Math.atan2(y2 - y1, x2 - x1)))
    }

    static angleDifference(startAngle: number, endAngle: number) {
        let d = this.standardAngle(endAngle) -
            this.standardAngle(startAngle);
        if (d > 180) {
            d = d - 360;
        } else if (d <= -180) {
            d = 360 + d;
        }
        return d;
    }

    static sign(x: number) {
        return x == 0 ? 0 : (x < 0 ? -1 : 1);
    }

    static sum(...args: number[]) {
        return args.reduce((sum, value) => {
            return sum + value;
        }, 0)
    }

    static average(...args: number[]) {
        return this.sum(...args) / args.length;
    }

    static sampleVariance(...args: number[]) {
        const size = args.length;
        if (size < 2) {
            return 0;
        }

        const mean = this.average(...args);

        const variance = this.sum(...args.map(val => Math.pow(val - mean, 2) / (size - 1)));

        return variance;
    }

    static standardDeviation(...args: number[]) {
        return Math.sqrt(this.sampleVariance(...args));
    }

    static isInt(num: number) {
        return isFinite(num) && num % 1 == 0;
    }

    static isFiniteNumber(num: number) {
        return isFinite(num) && !isNaN(num);
    }

    static log10Floor(num: number) {
        if (num > 0) {
            const x = Math.round(Math.log(num) * Math.LOG10E);
            return x - ((parseFloat('1e' + x) > num) ? 1 : -1);
        }
    }

    static safeFloor(num: number, opt_epsilon?: number) {
        return Math.floor(num + (opt_epsilon || 2e-15));
    }

    static safeCeil(num: number, opt_epsilon?: number) {
        return Math.ceil(num - (opt_epsilon || 2e-15));
    }

}