import test from "node:test";
import assert from "node:assert/strict";
import { purchasePose, rejectedPose } from "../src/landing-budget-flight.js";

const scenes = [
  { name:"desktop", width:1216, shop:.17, gate:.50, stack:.83, rise:-104.92, lift:-20, lean:-2, rejectGap:193 },
  { name:"tablet", width:704, shop:.17, gate:.50, stack:.83, rise:-104.92, lift:-20, lean:1, rejectGap:193 },
  { name:"mobile", width:343, shop:.14, gate:.52, stack:.85, rise:-64.6, lift:-40, lean:-2, rejectGap:106 },
  { name:"small mobile", width:296, shop:.14, gate:.52, stack:.86, rise:-51.36, lift:-40, lean:1, rejectGap:90 },
];
const near = (actual, expected, tolerance = 1e-6) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} differs from ${expected}`);
function position(pose, scene, rejected = false) {
  return {
    x: rejected
      ? ((scene.gate - scene.shop) * scene.width - scene.rejectGap) * pose.gate + pose.recoil
      : (scene.gate - scene.shop) * scene.width * pose.gate + (scene.stack - scene.shop) * scene.width * pose.stack + scene.lean * pose.lean,
    y: scene.rise * pose.rise + (rejected ? 0 : scene.lift * pose.lift) + pose.pixels,
  };
}

test("a purchased book lifts vertically, crosses the budget once and meets the new stack top exactly", () => {
  for (const scene of scenes) {
    let previous = -Infinity;
    for (let step = 0; step <= 1000; step += 1) {
      const t = step / 1000;
      const pose = purchasePose(t);
      const point = position(pose, scene);
      if (t <= .24) near(point.x, 0);
      assert.ok(point.x >= previous - 1e-6, `${scene.name}: a purchased book must never hesitate or reverse in transit`);
      previous = point.x;
    }
    const atGate = position(purchasePose(.60), scene);
    near(atGate.x, (scene.gate - scene.shop) * scene.width);
    near(atGate.y, 0);
    const landed = purchasePose(1);
    const point = position(landed, scene);
    near(point.x, (scene.stack - scene.shop) * scene.width + scene.lean);
    near(point.y, 0);
    near(landed.rotation, 0);
    near(landed.scale, 1);
    near(landed.opacity, 1);
  }
});

test("purchase flight joins preserve position and speed, including the debit milestone", () => {
  const delta = 1e-5;
  for (const scene of scenes) {
    for (const t of [.24, .60]) {
      const before = position(purchasePose(t - delta), scene);
      const middle = position(purchasePose(t), scene);
      const after = position(purchasePose(t + delta), scene);
      for (const axis of ["x", "y"]) {
        const incoming = (middle[axis] - before[axis]) / delta;
        const outgoing = (after[axis] - middle[axis]) / delta;
        near(incoming, outgoing, .3);
      }
    }
    const beforeGate = position(purchasePose(.599), scene).x;
    const afterGate = position(purchasePose(.601), scene).x;
    assert.ok(afterGate > beforeGate, "charging the budget must not stop or restart the book");
  }
});

test("the rejected book touches the budget twice and clears the carton before returning vertically", () => {
  for (const scene of scenes) {
    const stop = (scene.gate - scene.shop) * scene.width - scene.rejectGap;
    for (const t of [.40, .58]) {
      const point = position(rejectedPose(t), scene, true);
      near(point.x, stop);
      near(point.y, 0);
    }
    assert.ok(position(rejectedPose(.48), scene, true).x < stop);
    assert.ok(position(rejectedPose(.66), scene, true).x < stop);
    for (let step = 22; step <= 100; step += 1) {
      const pose = rejectedPose(step / 100);
      const point = position(pose, scene, true);
      assert.ok(point.x <= stop + 1e-6, "an empty budget never lets the book pass");
      if (step >= 76 && step <= 88) {
        near(point.y, scene.rise);
        near(pose.scale, 1);
      }
      if (step >= 88) near(point.x, 0);
    }
    near(rejectedPose(1).opacity, 0);
  }
});

test("the two recoil attempts and carton return have no pose jumps", () => {
  const delta = 1e-8;
  for (const scene of scenes) {
    for (const t of [.22, .40, .48, .58, .66, .76, .88, .95]) {
      const before = rejectedPose(t - delta);
      const after = rejectedPose(t + delta);
      const a = position(before, scene, true), b = position(after, scene, true);
      near(a.x, b.x, .001);
      near(a.y, b.y, .001);
      for (const property of ["rotation", "scale", "opacity"]) near(before[property], after[property], .001);
    }
  }
});
