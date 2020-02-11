import { DefaultDisTorlance } from '../constants';
import { HMath } from '../math/math';

export function nearlyEqual(a: number, b: number, torlance = DefaultDisTorlance) {
    return HMath.nearlyEqual(a, b, torlance);
}