import test from "node:test";
import assert from "node:assert/strict";
import { mobilePurchasePose, mobileRejectedPose } from "../src/landing-budget-mobile-flight.js";

const near = (actual, expected, tolerance = .00001) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} should be near ${expected}`);
const scenes = [320, 360, 390, 430, 760].map((screen) => {
  const width = Math.min(480, screen - 32);
  const book = Math.min(134, Math.max(104, screen * .31));
  const parcel = Math.min(154, Math.max(128, screen * .36));
  const wallet = Math.min(198, Math.max(180, screen * .48));
  return {
    screen, width, book, parcel, wallet,
    shop: width * .20, gate: width * .50, stack: width * .80,
    emerge: 236 + parcel * .22 - 220 - book * .5 - 12,
    gateY: 24 + wallet * .36 - 220,
    stopY: 24 + wallet * .64 - 220,
  };
});
const purchasePoint = (scene, t) => {
  const p = mobilePurchasePose(t);
  return {
    x: scene.shop + (scene.gate - scene.shop) * p.gate + (scene.stack - scene.shop) * p.stack,
    y: 220 + scene.emerge * p.rise + scene.gateY * p.wallet - 8 * p.lift + p.pixels,
  };
};
const rejectedPoint = (scene, t) => {
  const p = mobileRejectedPose(t);
  return {
    x: scene.shop + (scene.gate - scene.shop - scene.wallet * .18) * p.approach + p.recoil,
    y: 220 + scene.emerge * p.rise + scene.stopY * p.wallet + p.pixels,
  };
};

for (const scene of scenes) {
  test(`mobile budget at ${scene.screen}px lifts vertically and reaches the wallet at debit`, () => {
    for (let i = 0; i <= 24; i++) near(purchasePoint(scene, i / 100).x, scene.shop);
    near(purchasePoint(scene, .60).x, scene.gate);
    near(purchasePoint(scene, .60).y, 24 + scene.wallet * .36);
    near(purchasePoint(scene, 1).x, scene.stack);
    near(purchasePoint(scene, 1).y, 220);
  });

  test(`mobile budget at ${scene.screen}px has two contacts and a vertical return into the parcel`, () => {
    const first = rejectedPoint(scene, .40);
    const second = rejectedPoint(scene, .58);
    near(first.x, second.x); near(first.y, second.y);
    assert.ok(rejectedPoint(scene, .48).x < first.x - 17);
    assert.ok(rejectedPoint(scene, .66).x < second.x - 21);
    assert.ok(rejectedPoint(scene, .48).y > first.y + 9);
    for (let i = 88; i <= 100; i++) near(rejectedPoint(scene, i / 100).x, scene.shop);
    near(rejectedPoint(scene, 1).y, 260);
    assert.equal(mobileRejectedPose(1).opacity, 0);
  });

  test(`mobile budget at ${scene.screen}px keeps the flight above the collection-value area`, () => {
    for (let i = 0; i <= 1000; i++) {
      for (const point of [purchasePoint(scene, i / 1000), rejectedPoint(scene, i / 1000)]) {
        assert.ok(point.y + scene.book * .5 < 354 - 12, `flight must not enter value label at ${i / 1000}`);
        assert.ok(Number.isFinite(point.x) && Number.isFinite(point.y));
      }
    }
    assert.ok(scene.stack - scene.book * .5 >= 0);
    assert.ok(scene.stack + scene.book * .5 <= scene.width);
  });
}

test("mobile flight joins keep continuous velocity without a frame-by-frame controller", () => {
  const scene = scenes[2];
  const epsilon = .000001;
  for (const [sample, joins] of [[purchasePoint, [.24,.60]], [rejectedPoint, [.22,.40,.48,.58,.66,.88]]]) {
    for (const t of joins) {
      const before = sample(scene, t - epsilon), point = sample(scene, t), after = sample(scene, t + epsilon);
      for (const axis of ["x", "y"]) {
        const left = (point[axis] - before[axis]) / epsilon;
        const right = (after[axis] - point[axis]) / epsilon;
        assert.ok(Math.abs(left - right) < .1, `velocity discontinuity at ${t}/${axis}: ${left} vs ${right}`);
      }
    }
  }
});
