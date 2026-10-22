// Mobile closes with scroll position; desktop keeps its original timed sequence.
export const LANDING_MOBILE_LOCK_STYLES = `
.mobile-lock-glimmers {display:none}
@media(max-width:760px) {
  .privacy-lock.is-mobile-lock .lock-shackle {animation:none;transform:translateY(var(--mobile-lock-lift,-18px)) rotate(var(--mobile-lock-turn,-18deg))}
  .privacy-lock.is-mobile-lock .lock-white {animation:none;opacity:var(--mobile-lock-white,1)}
  .privacy-lock.is-mobile-lock .lock-whole {animation:none}
  .privacy-lock.is-mobile-lock .lock-snap-lines {animation:none;opacity:0}
  .privacy-lock.is-mobile-lock .mobile-lock-glimmers {display:block;opacity:0;pointer-events:none}
  .mobile-lock-glimmer {opacity:0;transform-box:fill-box;transform-origin:center}
  .is-mobile-lock-snapped .mobile-lock-glimmers {animation:mobile-lock-glimmer-fade .56s linear 1 both paused}
  .is-mobile-lock-snapped .mobile-lock-glimmer {animation:mobile-lock-glimmer-drift .5s cubic-bezier(.15,.7,.35,1) 1 both paused}
  .is-mobile-lock-glimmer-playing .mobile-lock-glimmers,.is-mobile-lock-glimmer-playing .mobile-lock-glimmer {animation-play-state:running}
  .privacy-lock.is-mobile-lock.is-mobile-lock-snapped .lock-whole {animation:mobile-lock-settle .26s ease-out 1 both paused}
  .privacy-lock.is-mobile-lock.is-mobile-lock-glimmer-playing .lock-whole {animation-play-state:running}
  @keyframes mobile-lock-settle {0%,100% {transform:translateY(0)}35% {transform:translateY(2px)}70% {transform:translateY(-1px)}}
  @keyframes mobile-lock-glimmer-fade {0% {opacity:0}10%,65% {opacity:1}100% {opacity:0}}
  @keyframes mobile-lock-glimmer-drift {
    0% {opacity:0;transform:translate(0,0) scale(.3)}
    15% {opacity:.9}
    100% {opacity:0;transform:translate(var(--glimmer-x),var(--glimmer-y)) scale(.15)}
  }
}
@media(prefers-reduced-motion:reduce) {.mobile-lock-glimmers {display:none!important}}
`;
