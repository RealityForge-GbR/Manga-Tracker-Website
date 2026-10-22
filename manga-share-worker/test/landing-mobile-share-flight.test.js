import test from "node:test";
import assert from "node:assert/strict";
import {
  MOBILE_SHARE_ARRIVAL,
  MOBILE_SHARE_BOOK_PHASES,
  MOBILE_SHARE_DEPARTURE,
  createMobileShareFlightKeyframes,
  mobileShareBookPose,
} from "../src/landing-mobile-share-flight.js";
import { LANDING_MOBILE_SHARE_SCENE, LANDING_MOBILE_SHARE_STYLES } from "../src/landing-mobile-share-scene.js";

test("sharing flight leaves and lands at rest without stops in the arc", () => {
  const departure = mobileShareBookPose(MOBILE_SHARE_DEPARTURE);
  const arrival = mobileShareBookPose(MOBILE_SHARE_ARRIVAL);
  assert.equal(departure.x, 0);
  assert.equal(departure.y, 0);
  assert.equal(arrival.x, 144);
  assert.equal(arrival.y, 0);
  const delta = .000001;
  for (const boundary of [MOBILE_SHARE_DEPARTURE, MOBILE_SHARE_ARRIVAL]) {
    for (const field of ["x", "y", "rotation", "scale"]) {
      const left = (mobileShareBookPose(boundary)[field] - mobileShareBookPose(boundary - delta)[field]) / delta;
      const right = (mobileShareBookPose(boundary + delta)[field] - mobileShareBookPose(boundary)[field]) / delta;
      assert.ok(Math.abs(left - right) < .002, `${field} velocity is continuous at ${boundary}`);
    }
  }
  let previous = departure.x;
  for (let index = 1; index < 100; index += 1) {
    const pose = mobileShareBookPose(MOBILE_SHARE_DEPARTURE + index / 100 * (MOBILE_SHARE_ARRIVAL - MOBILE_SHARE_DEPARTURE));
    assert.ok(pose.x > previous, "the arc progresses continuously without a waypoint pause");
    assert.ok(pose.y < 0, "the book travels above the phones' shelf cards");
    previous = pose.x;
  }
});

test("the alternating color is already on the left while the delivered book remains on the right", () => {
  for (const progress of [.27, .27 + 1 / 3, .27 + 2 / 3]) {
    const poses = MOBILE_SHARE_BOOK_PHASES.map((offset) => mobileShareBookPose(progress, offset));
    assert.ok(poses.some((pose) => pose.x === 0 && pose.opacity === 1), "the next color is ready on the source at every arrival");
    assert.ok(poses.some((pose) => Math.abs(pose.x - 144) < .000001 && pose.opacity === 1), "the arriving book is fully visible on the destination");
  }
  for (let index = 0; index <= 10000; index += 1) {
    const poses = MOBILE_SHARE_BOOK_PHASES.map((offset) => mobileShareBookPose(index / 10000, offset));
    assert.ok(poses.some((pose) => pose.x === 144 && pose.opacity === 1), "a fully visible delivered book stays on the right through every handoff");
  }
});

test("visible books stay inside the SVG and only reset while fully invisible", () => {
  const corners = [[29, 108], [64, 108], [64, 166], [29, 166]];
  for (const phaseOffset of MOBILE_SHARE_BOOK_PHASES) {
    let previous = mobileShareBookPose(0, phaseOffset);
    for (let index = 0; index <= 10000; index += 1) {
      const pose = mobileShareBookPose(index / 10000, phaseOffset);
      for (const value of Object.values(pose)) assert.ok(Number.isFinite(value));
      assert.ok(pose.opacity >= 0 && pose.opacity <= 1);
      if (pose.opacity > .001 || previous.opacity > .001) {
        assert.ok(Math.hypot(pose.x - previous.x, pose.y - previous.y) < .3, "no visible reset or sudden jump");
      }
      if (pose.opacity > 0) {
        const angle = pose.rotation * Math.PI / 180;
        for (const [x, y] of corners) {
          const localX = (x - 47) * pose.scale;
          const localY = (y - 138) * pose.scale;
          const worldX = 47 + pose.x + localX * Math.cos(angle) - localY * Math.sin(angle);
          const worldY = 138 + pose.y + localX * Math.sin(angle) + localY * Math.cos(angle);
          assert.ok(worldX >= 0 && worldX <= 240 && worldY >= 0 && worldY <= 260, "book corners fit the drawing bounds");
        }
      }
      previous = pose;
    }
  }
});

test("the CSS loop is deterministic with matching first and last poses", () => {
  for (const offset of MOBILE_SHARE_BOOK_PHASES) {
    const start = mobileShareBookPose(0, offset);
    const end = mobileShareBookPose(1, offset);
    for (const field of Object.keys(start)) assert.ok(Math.abs(start[field] - end[field]) < .000001);
    const keyframes = createMobileShareFlightKeyframes("test-flight", offset);
    assert.equal((keyframes.match(/% \{transform:/g) || []).length, 241);
    assert.ok(!/NaN|Infinity/.test(keyframes));
  }
  assert.equal((LANDING_MOBILE_SHARE_SCENE.match(/class="mobile-share-book /g) || []).length, 3);
  assert.ok(!LANDING_MOBILE_SHARE_SCENE.includes("mobile-share-link"));
  assert.ok(!LANDING_MOBILE_SHARE_SCENE.includes("stroke-dasharray"));
  assert.ok(LANDING_MOBILE_SHARE_STYLES.includes(".is-showcase-card-playing .mobile-share-book"));
  assert.ok(LANDING_MOBILE_SHARE_STYLES.includes("prefers-reduced-motion:reduce"));
});
