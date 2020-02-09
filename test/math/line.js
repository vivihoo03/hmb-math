const { Line, Coordinate } = require('../../build/main.min');

test('length', () => {
    const l = new Line(0, 0, 1, 1);

    expect(l.getSegmentLengthSquared()).toBe(2)
})

test('getClosestPoint', () => {
    const l = new Line(0, 0, 1, 1);
    const pt = new Coordinate(1, 0);

    const closePt = l.getClosestPoint(pt);
    expect(closePt.x).toBe(0.5);
    expect(closePt.y).toBe(0.5);
})

test('getClosestSegmentPoint', () => {
    const l = new Line(0, 0, 1, 1);
    const pt = new Coordinate(10, 0);

    const closePt = l.getClosestSegmentPoint(pt);
    expect(closePt.x).toBe(1);
    expect(closePt.y).toBe(1);
})


