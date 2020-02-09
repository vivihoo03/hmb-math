"use strict"

const hMath = require('../../build/main.min');

test('test magnitude', () => {
    const v = new hMath.Vec2(1, 3)
    expect(v.magnitude().toFixed(2)).toBe(Math.pow(10, 1/2).toFixed(2))
})

test('test add', () => {
    const v1 = new hMath.Vec2(1, 1);
    const v2 = new hMath.Vec2(2, -2);

    v1.add(v2);

    expect(v1.x).toBe(3);
    expect(v1.y).toBe(-1);
})

test('rotate', () => {
    const v = new hMath.Vec2(1, 0);
    v.rotate(Math.PI / 2)
    expect(v.x.toFixed(0)).toBe('0')
    expect(v.y.toFixed(0)).toBe('1')
})