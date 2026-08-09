import Image from "next/image";
import { content } from "../config/content";
import { site } from "../config/site";

const photos = Array.from({ length: 33 }, (_, i) => `/photos/instagram-${String(i + 3).padStart(2, "0")}.jpg`);
const hero = photos[0];
const gallery = photos.slice(1, 13);
const categories = [
  { title: "Sanitaryware", image: photos[1], text: "Basins, toilets and bathroom essentials." },
  { title: "Bath fittings", image: photos[4], text: "Faucets, showers and fittings from leading brands." },
  { title: "Tiles and surfaces", image: photos[7], text: "Surfaces that bring the whole room together." },
  { title: "Kitchen sinks", image: photos[10], text: "Practical sink options for modern kitchens." },
];

function WaButton({ label = "WhatsApp enquiry" }: { label?: string }) {
  return <a className="button button-dark" href={site.whatsappLink} target="_blank" rel="noreferrer">{label}</a>;
}

export default function Home() {
  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav container">
          <a href="#top" className="brand"><Image src="/jagnath-logo.png" alt="Jagnath Sanitaries" width={54} height={54} /><span>JAGNATH<br /><b>SANITARIES</b></span></a>
          <div className="nav-links"><a href="#collections">Collections</a><a href="#brands">Brands</a><a href="#showroom">Showroom</a><a href="#contact">Contact</a></div>
          <WaButton label="Enquire on WhatsApp" />
        </nav>
      </header>

      <section id="top" className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">RAJKOT · EST. 1981</p>
          <h1>Bathroom spaces,<br /><em>made beautifully.</em></h1>
          <p className="lead">{content.hero}</p>
          <div className="actions"><WaButton /><a className="button button-light" href={site.phoneLink}>Call {site.phoneDisplay}</a></div>
          <div className="hero-note"><span>45+ years</span><span>Leading brands</span><span>Rajkot showroom</span></div>
        </div>
        <div className="hero-image image-frame"><Image src={hero} alt="Jagnath Sanitaries product collection" fill priority sizes="(max-width: 900px) 100vw, 52vw" /></div>
      </section>

      <section id="collections" className="section container">
        <div className="section-head"><div><p className="eyebrow">EXPLORE</p><h2>What we stock.</h2></div><p>Real products and showroom moments from Jagnath Sanitaries. Ask us about availability and current options.</p></div>
        <div className="category-grid">{categories.map((c) => <article className="category-card" key={c.title}><div className="card-image"><Image src={c.image} alt={c.title} fill sizes="(max-width: 700px) 100vw, 25vw" /></div><div className="card-copy"><h3>{c.title}</h3><p>{c.text}</p><a href={site.whatsappLink} target="_blank" rel="noreferrer">Ask about this <span>↗</span></a></div></article>)}</div>
      </section>

      <section className="statement"><div className="container statement-inner"><p className="eyebrow">THE JAGNATH APPROACH</p><h2>Good bathrooms start with good choices.</h2><p>We bring sanitaryware, bath fittings, tiles, sinks and bathroom accessories together in one showroom, so you can compare the details that matter before you buy.</p></div></section>

      <section id="brands" className="section container brands"><div className="section-head"><div><p className="eyebrow">BRANDS</p><h2>Names you know.</h2></div><p>A selection of brands represented on our business materials. Ask us about current ranges and availability.</p></div><div className="brand-list">{site.brands.map((b) => <span key={b}>{b}</span>)}</div></section>

      <section className="media-section container"><div className="section-head"><div><p className="eyebrow">FROM INSTAGRAM</p><h2>See what we are showing.</h2></div><a className="text-link" href={site.instagram} target="_blank" rel="noreferrer">View Instagram ↗</a></div><div className="media-grid">{gallery.map((src, i) => <div className={`media-tile tile-${i % 5}`} key={src}><Image src={src} alt="Jagnath Sanitaries showroom and product" fill sizes="(max-width: 700px) 50vw, 25vw" /></div>)}</div></section>

      <section className="video-band"><div className="container video-layout"><div><p className="eyebrow">A LOOK INSIDE</p><h2>From the showroom floor.</h2><p>Watch a recent Jagnath Sanitaries reel and get a feel for the products and displays before you visit.</p><a className="button button-light" href={site.instagram} target="_blank" rel="noreferrer">More on Instagram</a></div><div className="video-frame"><video src="/videos/instagram-02.mp4" muted autoPlay loop playsInline controls preload="metadata" /></div></div></section>

      <section id="showroom" className="showroom container"><div className="showroom-photo image-frame"><Image src={photos[18]} alt="Jagnath Sanitaries showroom" fill sizes="(max-width: 900px) 100vw, 55vw" /></div><div className="showroom-copy"><p className="eyebrow">VISIT US</p><h2>Come see the collection in Rajkot.</h2><p>{site.address}</p><div className="actions"><a className="button button-dark" href={site.mapLink} target="_blank" rel="noreferrer">Get directions</a><WaButton /></div><div className="hours"><b>Showroom hours</b><br />{site.hours}</div></div></section>

      <section id="contact" className="contact"><div className="container contact-inner"><div><p className="eyebrow">START A CONVERSATION</p><h2>Tell us what you need.</h2><p>{content.contact}</p></div><div className="contact-actions"><WaButton label="WhatsApp us" /><a className="button button-light" href={site.phoneLink}>Call now</a><a className="button button-outline" href={site.instagram} target="_blank" rel="noreferrer">Instagram</a></div></div></section>

      <footer><div className="container footer-inner"><div className="brand footer-brand"><Image src="/jagnath-logo.png" alt="" width={46} height={46} /><span>JAGNATH<br /><b>SANITARIES</b></span></div><p>Sanitaryware, bath fittings, tiles, sinks and bathroom accessories in Rajkot.</p><div><a href={site.phoneLink}>Call</a><a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={site.whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a></div></div></footer>
      <a className="floating-wa" href={site.whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp Jagnath Sanitaries">WA</a>
    </main>
  );
}
