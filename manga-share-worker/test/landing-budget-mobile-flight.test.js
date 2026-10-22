import test from "node:test";
import assert from "node:assert/strict";
import { mobilePurchasePose, mobileRejectedPose, MOBILE_PURCHASE_FLIGHT_FRAMES } from "../src/landing-budget-mobile-flight.js";

const near = (actual, expected, tolerance = .00001) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} should be near ${expected}`);
function sceneAt(screen, owned = 8) {
  const width = Math.min(440, screen - 64);
  const book = Math.min(116, Math.max(90, screen * .26));
  const parcel = Math.min(144, Math.max(112, screen * .32));
  const floor = 128 + parcel * (209 / 240);
  const bookY = floor - book * .45 - 24;
  return {
    screen, owned, width, book, parcel, floor, bookY,
    valueTop: floor + 20,
    shop: width * .22, gate: width * .50, stack: width * .78,
    layer: 12, parcelTop: 128,
    emerge: 128 + parcel * .22 - bookY - book * .5 - 12,
    gateY: 112 - bookY, stopY: 122 - bookY,
    land: (7 - owned) * 12,
    lean: [0, 3, -2, 1, -3, 2][owned % 6],
  };
}
const purchasePoint = (scene, t) => {
  const p = mobilePurchasePose(t);
  return {
    x: scene.shop + (scene.gate - scene.shop) * p.gate + (scene.stack - scene.shop) * p.stack + scene.lean * p.lean,
    y: scene.bookY + scene.emerge * p.rise + scene.gateY * p.wallet + scene.land * p.stack - 8 * p.lift + p.pixels,
  };
};
const rejectedPoint = (scene, t) => {
  const p = mobileRejectedPose(t);
  return {
    x: scene.shop + (scene.gate - scene.shop) * p.approach + p.recoil,
    y: scene.bookY + scene.emerge * p.rise + scene.stopY * p.wallet + p.pixels,
  };
};
// The CSS transform origin is the middle of the book at 70% of its height.
// Include its rotation and scale when testing painted space around labels.
function paintedBounds(scene, point, pose) {
  const width = scene.book, height = width * .5;
  const originX = width * .5, originY = height * .7;
  const radians = pose.rotation * Math.PI / 180;
  const sin = Math.sin(radians), cos = Math.cos(radians);
  const corners = [[0,0],[width,0],[width,height],[0,height]].map(([x,y]) => {
    const dx = (x - originX) * pose.scale, dy = (y - originY) * pose.scale;
    return {
      x: point.x - width * .5 + originX + dx * cos - dy * sin,
      y: point.y + originY + dx * sin + dy * cos,
    };
  });
  return {
    left: Math.min(...corners.map((p) => p.x)), right: Math.max(...corners.map((p) => p.x)),
    top: Math.min(...corners.map((p) => p.y)), bottom: Math.max(...corners.map((p) => p.y)),
  };
}

test("each mobile width lifts books vertically and crosses the budget at the unchanged debit milestone", () => {
  for (let screen = 320; screen <= 760; screen++) {
    for (const owned of [8,9]) {
      const scene = sceneAt(screen, owned);
      for (let i = 0; i <= 24; i++) near(purchasePoint(scene, i / 100).x, scene.shop);
      near(purchasePoint(scene, .60).x, scene.gate);
      near(purchasePoint(scene, .60).y, 112);
      const landed = purchasePoint(scene, 1);
      near(landed.x, scene.stack + scene.lean);
      near(landed.y, scene.bookY - (owned - 7) * scene.layer);
      near(mobilePurchasePose(1).rotation, 0);
      near(mobilePurchasePose(1).scale, 1);
    }
  }
});

test("the landing book meets its next stack layer and the lower existing layers stay fixed", () => {
  for (let screen = 320; screen <= 760; screen++) {
    for (const owned of [8,9]) {
      const scene = sceneAt(screen, owned);
      const after = owned + 1;
      const stackTopAfter = scene.bookY - (after - 8) * scene.layer;
      const addedBookIndex = owned;
      const addedBookOffset = (after - 1 - addedBookIndex) * scene.layer;
      near(purchasePoint(scene, 1).y, stackTopAfter + addedBookOffset);
      for (const index of [5,6,7]) {
        const beforeY = scene.bookY - (owned - 8) * scene.layer + (owned - 1 - index) * scene.layer;
        const afterY = stackTopAfter + (after - 1 - index) * scene.layer;
        near(beforeY, afterY);
        assert.ok(afterY + scene.book * .5 < scene.valueTop - 12, "the collection must clear its value zone");
        if (index === 5) near(afterY + scene.book * .45, scene.floor);
      }
    }
  }
});

test("rejection makes two center contacts below the budget and returns vertically into the parcel", () => {
  for (let screen = 320; screen <= 760; screen++) {
    const scene = sceneAt(screen, 10);
    const first = rejectedPoint(scene, .40), second = rejectedPoint(scene, .58);
    near(first.x, scene.gate); near(first.y, 122);
    near(first.x, second.x); near(first.y, second.y);
    assert.ok(rejectedPoint(scene, .48).x < first.x - 17);
    assert.ok(rejectedPoint(scene, .66).x < second.x - 21);
    assert.ok(rejectedPoint(scene, .48).y > first.y + 9);
    for (let i = 88; i <= 100; i++) near(rejectedPoint(scene, i / 100).x, scene.shop);
    near(rejectedPoint(scene, 1).y, scene.bookY + 40);
    assert.equal(mobileRejectedPose(1).opacity, 0);
  }
});

test("all mobile widths keep rotated flights below the budget bar and above the collection value", () => {
  for (let screen = 320; screen <= 760; screen++) {
    for (const [sample, position, owned, emerged] of [
      [mobilePurchasePose, purchasePoint, 8, .24],
      [mobilePurchasePose, purchasePoint, 9, .24],
      [mobileRejectedPose, rejectedPoint, 10, .22],
    ]) {
      const scene = sceneAt(screen, owned);
      for (let i = 0; i <= 200; i++) {
        const t = i / 200, pose = sample(t), point = position(scene, t);
        const bounds = paintedBounds(scene, point, pose);
        const label = `${screen}px/${owned} books/${t}`;
        if (t >= emerged && t <= .88) assert.ok(bounds.top >= 84, `budget bar overlap: ${label}, ${bounds.top}`);
        assert.ok(bounds.bottom <= scene.valueTop - 8, `collection-value overlap: ${label}, ${bounds.bottom}`);
        assert.ok(bounds.left >= 0 && bounds.right <= scene.width, `horizontal overflow: ${label}`);
      }
    }
  }
});

test("mobile flight joins preserve position and velocity through debit, recoil, and return", () => {
  const epsilon = .000001;
  for (const screen of [320,360,390,430,504,760]) {
    for (const owned of [8,9]) {
      const scene = sceneAt(screen, owned);
      for (const [position, joins] of [[purchasePoint, [.24,.60]], [rejectedPoint, [.22,.40,.48,.58,.66,.88]]]) {
        for (const t of joins) {
          const before = position(scene, t - epsilon), point = position(scene, t), after = position(scene, t + epsilon);
          for (const axis of ["x", "y"]) {
            const left = (point[axis] - before[axis]) / epsilon;
            const right = (after[axis] - point[axis]) / epsilon;
            assert.ok(Math.abs(left - right) < .1, `velocity discontinuity at ${screen}/${t}/${axis}: ${left} vs ${right}`);
          }
        }
      }
    }
  }
});

test("the generated mobile CSS includes the upward-growing landing offset at full arrival", () => {
  const finalFrame = MOBILE_PURCHASE_FLIGHT_FRAMES.split("\n").at(-1);
  assert.match(finalFrame, /var\(--mobile-land-offset\) \* 1/);
  assert.match(finalFrame, /^100%/);
});
