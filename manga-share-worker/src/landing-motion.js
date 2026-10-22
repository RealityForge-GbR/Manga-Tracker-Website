import { LANDING_ACHIEVEMENT_SCRIPT } from "./landing-achievement-motion.js";
import { LANDING_BARCODE_MORPH_SCRIPT } from "./landing-barcode-morph-motion.js";
import { LANDING_SHELF_DIVIDER_SCRIPT } from "./landing-shelf-divider-motion.js";
import { LANDING_PRIVACY_SCRIPT } from "./landing-privacy-motion.js";
import { LANDING_BUDGET_SCRIPT } from "./landing-budget.js";
import { LANDING_CAT_SCRIPT } from "./landing-cat.js";
import { LANDING_MOBILE_PARALLAX_SCRIPT } from "./landing-mobile-parallax.js";

import { LANDING_HERO_FLOAT_SCRIPT } from "./landing-hero-float.js";

export const LANDING_MOTION_SCRIPT = `${LANDING_HERO_FLOAT_SCRIPT}\n${LANDING_BUDGET_SCRIPT}\n${LANDING_CAT_SCRIPT}\n${LANDING_MOBILE_PARALLAX_SCRIPT}\n${LANDING_PRIVACY_SCRIPT}\n${LANDING_SHELF_DIVIDER_SCRIPT}\n${LANDING_BARCODE_MORPH_SCRIPT}\n${LANDING_ACHIEVEMENT_SCRIPT}`;
