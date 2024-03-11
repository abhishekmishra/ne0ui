import chai from "chai";
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

import { allocateSizes, NuSizeHint } from "../index.mjs";

describe("DimHint", function () {
    it("create and test ok", function () {
        const dh = new NuSizeHint(100, 0, Infinity);
        should.exist(dh);
        dh.should.be.an("object");
        expect(dh.ok(50)).to.be.true;
    });
});

describe("allocateSizes()", function () {
    it("check when min is greater than available", function () {
        var hints = [
            new NuSizeHint(10, 10, 10),
            new NuSizeHint(10, 10, 10),
            new NuSizeHint(10, 10, 10),
        ];

        expect(allocateSizes(hints, 25)).to.be.null;
    });

    it("check when min is equal to available", function () {
        var hints = [
            new NuSizeHint(10, 10, 10),
            new NuSizeHint(10, 10, 10),
            new NuSizeHint(10, 10, 10),
        ];
        var sz = allocateSizes(hints, 30);
        sz.should.be.an("array");
        sz.should.have.lengthOf(3);
        assert.equal(sz[0], 10);
        assert.equal(sz[1], 10);
        assert.equal(sz[2], 10);
    });

    it("check when actual is <= to available", function () {
        var hints = [
            new NuSizeHint(20, 10, 20),
            new NuSizeHint(30, 10, 30),
            new NuSizeHint(40, 10, 40),
        ];
        var sz = allocateSizes(hints, 100);
        sz.should.be.an("array");
        sz.should.have.lengthOf(3);
        assert.equal(sz[0], 20);
        assert.equal(sz[1], 30);
        assert.equal(sz[2], 40);
    });

    it("check when actual is <= to available, addl claims greater than available", function () {
        var hints = [
            new NuSizeHint(20, 10, 24),
            new NuSizeHint(30, 10, 34),
            new NuSizeHint(40, 10, 44),
        ];
        var sz = allocateSizes(hints, 100);
        sz.should.be.an("array");
        sz.should.have.lengthOf(3);
        sz[0].should.be.closeTo(23.333, 0.001);
        sz[1].should.be.closeTo(33.333, 0.001);
        sz[2].should.be.closeTo(43.333, 0.001);
    });

    it("check when actual is <= to available, addl claims less than available", function () {
        var hints = [
            new NuSizeHint(20, 10, 21),
            new NuSizeHint(30, 10, 31),
            new NuSizeHint(40, 10, 41),
        ];
        var sz = allocateSizes(hints, 100);
        sz.should.be.an("array");
        sz.should.have.lengthOf(3);
        assert.equal(sz[0], 21);
        assert.equal(sz[1], 31);
        assert.equal(sz[2], 41);
    });

    it("check when actual is <= to available, addl claims infinity", function () {
        var hints = [
            new NuSizeHint(20, 10, 24),
            new NuSizeHint(30, 10, Infinity),
            new NuSizeHint(40, 10, Infinity),
        ];
        var sz = allocateSizes(hints, 100);
        sz.should.be.an("array");
        sz.should.have.lengthOf(3);
        assert.equal(sz[0], 20);
        assert.equal(sz[1], 35);
        assert.equal(sz[2], 45);
    });
});
