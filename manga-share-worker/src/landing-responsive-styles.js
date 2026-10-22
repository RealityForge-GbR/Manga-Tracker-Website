// One shared content grid for the active desktop and tablet sections.
// The separate mobile stylesheet owns its viewport scene and stacked feature cards.
export const LANDING_RESPONSIVE_STYLES = `
@media(min-width:761px) {
  :root {
    --content-max:1560px;
    --content-gutters:clamp(64px,10vw,240px);
    --content-width:min(var(--content-max),calc(100% - var(--content-gutters)));
    --content-gap:clamp(36px,4vw,84px)
  }
  .wrap,.budget-details.wrap {
    width:var(--content-width);
    max-width:none
  }
  .header {gap:clamp(20px,2.2vw,32px)}
  .header nav {gap:clamp(16px,2.2vw,32px)}
  .cycle-stage {width:var(--content-width)}
  .budget-details.wrap {gap:var(--content-gap)}
  .showcase-gallery {
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:var(--content-gap);
    overflow:visible;
    padding-bottom:0
  }
  .showcase-card {height:650px}
  .showcase-card-copy {padding-inline:clamp(20px,2vw,32px)}
  .showcase-card h3 {font-size:clamp(22px,1.8vw,29px)}
  .showcase-device {width:clamp(210px,16vw,252px)}
  .trust {
    grid-template-columns:minmax(230px,.72fr) minmax(0,2.08fr);
    column-gap:var(--content-gap)
  }
  .privacy-lock {width:clamp(230px,20vw,300px);height:auto;aspect-ratio:1;max-width:100%}
  .trust-copy {min-width:0}
  .trust-copy>p {max-width:700px}
  .download {padding-inline:clamp(30px,3vw,48px)}
  .download h2 {font-size:clamp(24px,2.5vw,42px)}
  .footer {column-gap:clamp(20px,2vw,36px)}
  .footer nav {margin-left:auto}
}
/* Match the two-phone hero mode; preserve the short mobile landscape scene. */
@media(min-width:761px) and (min-height:501px), (min-width:1051px) {
  .hero.wrap {padding-inline:max(calc(var(--content-gutters) / 2),calc((100% - var(--content-max)) / 2))}
}
@media(min-width:1101px) {
  .hero {grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);gap:clamp(32px,3vw,64px)}
  .hero-copy {container-type:inline-size}
  .hero h1 {width:100%;max-width:640px;font-size:clamp(32px,min(3.9vw,5.9vh,10.4cqw),64px);line-height:1.16;margin-bottom:clamp(24px,3.2vh,44px);text-wrap:balance}
  .hero .store-download {min-height:clamp(70px,min(6.5vw,9.8vh),112px);padding:16px clamp(26px,2.4vw,46px);gap:clamp(14px,1.2vw,20px)}
  .hero .store-download>svg {width:clamp(26px,1.8vw,36px);height:clamp(26px,1.8vw,36px)}
  .hero .store-label strong {font-size:clamp(17px,min(1.35vw,2vh),23px)}
  .hero .store-label small {font-size:clamp(13px,min(.95vw,1.4vh),16px)}
  .hero-benefits {font-size:clamp(15px,min(1.25vw,2vh),22px);gap:clamp(9px,1.2vh,16px);margin-top:clamp(24px,3vh,38px)}
  .hero-benefits li {padding-left:clamp(25px,2vw,35px)}
  .hero-benefits li::before {width:clamp(7px,.5vw,10px);height:clamp(11px,.85vw,16px)}
  .hero-back-rig {left:calc(44% - var(--hero-back-width) * .9)}
  .hero-front-rig {left:calc(44% - var(--hero-front-width) * .18)}
}
@media(min-width:761px) and (max-width:1100px) and (min-height:501px) {
  .hero h1 {font-size:clamp(28px,min(3.4vw,4.4vh),36px);text-wrap:balance}
  .hero .store-download {min-height:66px}
  .hero .store-label strong {font-size:15px}
  .hero .store-label small {font-size:12px}
  .hero-benefits {font-size:14px}
}
@media(min-width:761px) and (max-width:1100px) {
  .budget-details.wrap {gap:30px clamp(28px,4vw,40px)}
  .cycle-stage {
    --book-width:clamp(124px,15vw,165px);
    --parcel-width:clamp(144px,18vw,198px);
    --budget-size:clamp(146px,17vw,187px)
  }
  .cycle-budget-amount>strong,.cycle-zero-alert {font-size:clamp(34px,4vw,44px)}
  .cycle-budget-amount>span {font-size:12px}
  .cycle-collection-value {width:180px}
  .cycle-collection-value>strong {font-size:clamp(36px,4vw,44px)}
  .showcase-gallery {gap:clamp(16px,2.5vw,28px)}
  .showcase-card {height:clamp(580px,60vw,650px)}
  .showcase-card-copy {padding:28px clamp(16px,2vw,24px) 0}
  .showcase-card h3 {font-size:clamp(20px,2.3vw,26px)}
  .showcase-card p {font-size:14px}
  .showcase-device {width:clamp(166px,20vw,220px)}
  .achievement-scene {inset:172px 12px 23px}
  .achievement-caption>strong {font-size:21px}
  .trust {grid-template-columns:minmax(190px,.72fr) minmax(0,2.08fr)}
  .privacy-lock {width:clamp(190px,24vw,230px)}
  .trust-copy h2 {font-size:clamp(42px,5.4vw,58px)}
}
`;
