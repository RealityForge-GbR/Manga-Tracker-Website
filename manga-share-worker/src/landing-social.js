const instagram = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>`;
const tiktok = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h3c.3 2.6 1.7 4 4 4.3v3a9 9 0 0 1-4-1.2v7.3A5.6 5.6 0 1 1 11 11v3.2a2.5 2.5 0 1 0 3 2.4Z" fill="currentColor"/></svg>`;

export const LANDING_SOCIAL_MARKUP = `<section class="social-links wrap" aria-labelledby="social-title">
  <div class="social-copy"><h2 id="social-title">Noch mehr Manga Tracker.</h2><p>Folge uns auf Instagram und TikTok.</p></div>
  <nav class="social-buttons" aria-label="Manga Tracker auf Social Media">
    <a href="https://www.instagram.com/mangatracker.app/" target="_blank" rel="noopener noreferrer" aria-label="Manga Tracker auf Instagram (neuer Tab)">${instagram}<span>Instagram</span></a>
    <a href="https://www.tiktok.com/@mangatracker.app" target="_blank" rel="noopener noreferrer" aria-label="Manga Tracker auf TikTok (neuer Tab)">${tiktok}<span>TikTok</span></a>
  </nav>
</section>`;

// Desktop is previewed separately until approved; only phones show this live.
export const LANDING_SOCIAL_STYLES = `
.social-links {display:none}
@media(max-width:760px) {
  .download.wrap {margin-bottom:0}
  .social-links.wrap {display:grid;gap:18px;width:calc(100% - 40px);max-width:520px;margin:0 auto;padding:28px 0 30px;text-align:center}
  .social-copy h2 {font-size:20px;line-height:1.25;font-weight:600;letter-spacing:-.035em;margin:0 0 6px}
  .social-copy p {font-size:13px;line-height:1.5;color:var(--muted);margin:0}
  .social-buttons {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
  .social-buttons a {display:flex;align-items:center;justify-content:center;gap:9px;min-height:48px;padding:12px 10px;border:1px solid var(--bordeaux);border-radius:12px;background:var(--surface);color:var(--text);text-decoration:none;font-size:14px;font-weight:600}
  .social-buttons svg {width:21px;height:21px;flex:none;color:var(--rose)}
  .social-buttons a:hover {background:var(--secondary);border-color:var(--rose)}
  .social-buttons a:focus-visible {outline:2px solid var(--rose);outline-offset:4px}
}
@media(max-width:359px) {.social-links.wrap {width:calc(100% - 32px)}}
`;
