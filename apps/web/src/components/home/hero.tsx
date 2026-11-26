import { useEffect, useRef } from "react";
import { vehicles } from "@/data/vehicles";
import { SiteLanguageMenu } from "@/i18n/site-language";
import { CONTACT_EMAIL } from "@/constants/site";
import { NICE_AIRPORT_TO_CANNES_PATH } from "@/constants/transfer-routes";
import { airportTransfers } from "@/data/airport-transfers";
// Set your real reservation email, then activate it with FormSubmit before publishing.
const BOOKING_EMAIL = CONTACT_EMAIL;

const markup = "\n<main id=\"main-content\"><section class=\"hero\" id=\"accueil\"><div class=\"hero-shade\"></div><div class=\"container hero-content\"><div class=\"eyebrow\">PRIVATE CHAUFFEUR \u00b7 FRENCH RIVIERA & ALPS</div><h1>C\u00f4te d\u2019Azur <em>&</em> Alps</h1><p>NICE <span>\u00b7</span> MONACO <span>\u00b7</span> CANNES <span>\u00b7</span> SAINT-TROPEZ <span>\u00b7</span> COURCHEVEL</p><div class=\"hero-line\"></div></div></section>\n<span id=\"reservations\"></span><section class=\"booking-zone\" id=\"booking\"><div class=\"container\"><div class=\"booking-card\"><div class=\"tabs\" role=\"tablist\" aria-label=\"Service type\"><button id=\"transferTab\" class=\"tab active\" type=\"button\" role=\"tab\" aria-selected=\"true\">\u2197 &nbsp; Transfer</button><button id=\"hourlyTab\" class=\"tab\" type=\"button\" role=\"tab\" aria-selected=\"false\">\u25f7 &nbsp; Hourly Service</button></div><form id=\"quoteForm\"><div class=\"fields\"><label class=\"field pickup\">Pickup Location<input id=\"pickup\" name=\"pickup\" list=\"locations\" placeholder=\"Address, airport, hotel...\" autocomplete=\"street-address\" required maxlength=\"180\"></label><button class=\"swap\" id=\"swap\" type=\"button\" aria-label=\"Swap pickup and drop-off\">\u21c4</button><label class=\"field drop\" id=\"dropField\">Drop-off Location<input id=\"dropoff\" name=\"dropoff\" list=\"locations\" placeholder=\"Address, city, resort...\" required maxlength=\"180\"></label><label class=\"field duration\" id=\"durationField\" hidden>Duration<select id=\"duration\" name=\"duration\"><option value=\"4\">4 hours</option><option value=\"6\">6 hours</option><option value=\"8\">8 hours</option><option value=\"10\">10 hours</option><option value=\"12\">12 hours</option></select></label><label class=\"field date-field\">Date<input id=\"date\" name=\"date\" type=\"date\" required></label><label class=\"field time-field\">Time<input id=\"time\" name=\"time\" type=\"time\" required></label><label class=\"field pax-field\">Passengers<select id=\"pax\" name=\"passengers\"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option></select></label><button class=\"primary getquote\" type=\"submit\">Get a Quote <span>\u2192</span></button></div><datalist id=\"locations\"><option value=\"Nice C\u00f4te d\u2019Azur Airport (NCE)\"><option value=\"Nice\"><option value=\"Monaco\"><option value=\"Cannes\"><option value=\"Saint-Tropez\"><option value=\"Geneva Airport (GVA)\"><option value=\"Lyon Airport (LYS)\"><option value=\"Grenoble Airport (GNB)\"><option value=\"Chamb\u00e9ry Airport (CMF)\"><option value=\"Courchevel\"><option value=\"M\u00e9ribel\"><option value=\"Val Thorens\"><option value=\"Val d\u2019Is\u00e8re\"><option value=\"Meg\u00e8ve\"></datalist><p class=\"form-note\">Request a personalised quote \u00b7 All journeys subject to confirmation</p><div id=\"formError\" class=\"error\" role=\"alert\" hidden></div></form></div>\n<div class=\"benefits\" id=\"services\"><div><span>\u25c7</span><strong>Premium Vehicles</strong><small>Comfort & elegance</small></div><div><span>\u2662</span><strong>Professional Drivers</strong><small>Discreet & multilingual</small></div><div><span>\u2708</span><strong>Airport Transfers</strong><small>Meet & greet service</small></div><div><span>\u2744</span><strong>Alps Transfers</strong><small>Winter-ready fleet</small></div></div></div></section>\n<span id=\"vehicules\"></span>" +
  buildFleetMarkup() +
  "\n<span id=\"galerie\"></span><section class=\"section destinations\" id=\"destinations\"><div class=\"container\"><div class=\"section-title\"><span>ICONIC DESTINATIONS</span><h2>Where can we take you?</h2></div><div class=\"destination-grid\"><button data-destination=\"Nice\">Nice <span>\u2197</span></button><button data-destination=\"Monaco\">Monaco <span>\u2197</span></button><button data-destination=\"Cannes\">Cannes <span>\u2197</span></button><button data-destination=\"Saint-Tropez\">Saint-Tropez <span>\u2197</span></button><button data-destination=\"Courchevel\">Courchevel <span>\u2197</span></button></div></div></section>\n<section class=\"cta\" id=\"contact\"><div class=\"container cta-inner\"><div><span class=\"eyebrow\">YOUR JOURNEY STARTS HERE</span><h2>Arrive exceptionally.</h2><p>Private transfers, airport arrivals and bespoke chauffeur service.</p></div><a class=\"primary\" href=\"#booking\">Request Your Transfer \u2192</a></div></section></main>\n<footer><div class=\"container footer-inner\"><span>\u00a9 <span id=\"year\"></span> Luxury-Chauffeur.com</span><span>Premium private chauffeur service \u00b7 France</span><a href=\"/monaco\">Monaco</a><a href=\"/cannes\">Cannes</a><a href=\"/about\">About</a><a href=\"/contact\">Contact</a><a href=\"/terms\">Terms & Privacy</a><a href=\"mailto:⟪email⟫\">⟪email⟫</a></div><p class=\"disclaimer container\">Vehicle images are AI-generated illustrations, not photographs of the actual fleet. Vehicle model, capacity, availability and final fare must be confirmed before booking.</p></footer>\n<dialog id=\"quoteDialog\" aria-labelledby=\"quoteTitle\"><div class=\"dialog-content\"><button class=\"close\" id=\"closeDialog\" type=\"button\" aria-label=\"Close\">\u00d7</button><span class=\"eyebrow\">YOUR PRIVATE TRANSFER</span><h2 id=\"quoteTitle\">Your Quote</h2><p id=\"quoteSummary\"></p><div id=\"priceBox\" class=\"pricebox\"></div><form id=\"requestForm\"><input name=\"company_website\" id=\"companyWebsite\" tabindex=\"-1\" autocomplete=\"off\" aria-hidden=\"true\" style=\"position:absolute;left:-10000px;width:1px;height:1px\"><label>Your name<input id=\"customerName\" autocomplete=\"name\" required maxlength=\"100\" placeholder=\"Full name\"></label><label>Email address<input id=\"customerEmail\" type=\"email\" autocomplete=\"email\" required placeholder=\"name@example.com\"></label><label>Phone / WhatsApp<input id=\"customerPhone\" type=\"tel\" autocomplete=\"tel\" placeholder=\"+44 ...\"></label><label>Special requests (optional)<textarea id=\"notes\" rows=\"2\" maxlength=\"800\" placeholder=\"Flight number, luggage, child seats...\"></textarea></label><label class=\"check\"><input id=\"consent\" type=\"checkbox\" required> I agree to send my details through FormSubmit to request a quote. See <a href=\"/terms#privacy\" target=\"_blank\" rel=\"noopener noreferrer\">privacy notice</a>.</label><div class=\"dialog-actions\"><button class=\"primary\" id=\"sendRequest\" type=\"submit\">Send Booking Request \u2192</button><button class=\"secondary\" id=\"copyRequest\" type=\"button\">Copy Details</button></div><p class=\"request-hint\" id=\"requestHint\" role=\"status\">Your request will be sent to our team. Your booking is confirmed separately.</p></form></div></dialog>";
const DEFAULT_VEHICLE = "Mercedes V-Class — Van";

function escapeHtml(value: string | number) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );
}

function buildFleetMarkup() {
  return `
    <section class="section fleet" id="fleet">
      <div class="container">
        <div class="section-title">
          <span>TRAVEL IN STYLE</span>
          <h2>Our Premium Fleet</h2>
          <p>Choose the vehicle that suits your journey.</p>
        </div>

        <div class="fleet-grid">
          ${vehicles
            .map(
              (vehicle) => `
                <article class="fleet-card">
                  <img
                    src="${escapeHtml(vehicle.image)}"
                    alt="${escapeHtml(vehicle.name)}"
                    loading="lazy"
                    width="800"
                    height="520"
                  >

                  <div class="fleet-image-fallback" hidden>
                    Photo coming soon
                  </div>

                  <div class="fleet-info">
                    <h3>${escapeHtml(vehicle.name)}</h3>
                    <p>Private chauffeur service</p>

                    <div>
                      <span>
                        Up to ${vehicle.passengers} passengers
                      </span>
                      <span>${vehicle.luggage} bags</span>
                    </div>

                    <button
                      type="button"
                      class="choose"
                      data-vehicle="${escapeHtml(vehicle.name)}"
                    >
                      Choose this vehicle ↗
                    </button>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>

        <p class="fleet-capacity-note">
          Photos and capacities are indicative. Availability,
          vehicle configuration and luggage space are confirmed
          before booking.
          <br>
Minibus photo:
<a
  href="https://commons.wikimedia.org/wiki/File:CKRBus_Sprinter,_Busworld_Europe_2025,_Brussels_(20251003-P1062566).jpg"
  target="_blank"
  rel="noopener noreferrer"
>
  Matti Blume
</a>
·
<a
  href="https://creativecommons.org/licenses/by-sa/4.0/"
  target="_blank"
  rel="noopener noreferrer"
>
  CC BY-SA 4.0
</a>
· Image cropped to fit.
        </p>
      </div>
    </section>
  `;
}
const destinationPaths: Record<string, string> = {
  Nice: "/nice",
  Monaco: "/monaco",
  Cannes: "/cannes",
  "Saint-Tropez": "/saint-tropez",
  Courchevel: "/courchevel",
};

const airportJourneys = new Map<string, { href: string; destination: string }[]>([
  ["Nice Airport", [{ href: NICE_AIRPORT_TO_CANNES_PATH, destination: "Cannes" }]],
]);
for (const { airportName, slug, destination } of airportTransfers) {
  const journeys = airportJourneys.get(airportName) ?? [];
  journeys.push({ href: `/${slug}`, destination });
  airportJourneys.set(airportName, journeys);
}

const hotelDestinations = [
  { name: "Carlton Cannes", place: "Cannes" },
  { name: "Hôtel de Paris Monte-Carlo", place: "Monaco" },
  { name: "Les Airelles Courchevel", place: "Courchevel" },
];

const journeyBoard = `
  <section class="section journey-board" id="journeys" aria-labelledby="journey-title">
    <div class="container">
      <div class="section-title"><h2 id="journey-title">Plan your journey</h2></div>
      <div class="journey-columns">
        <div class="journey-panel">
          <h3>Airport departures</h3>
          <p>Choose your route to see pickup and transfer details.</p>
          ${Array.from(airportJourneys, ([airport, journeys]) => `
            <div class="journey-group">
              <h4>${airport}</h4>
              <ul class="journey-airports">
                ${journeys.map(({ href, destination }) => `<li><a href="${href}">${destination}</a></li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
        <div class="journey-panel">
          <h3>Hotels and chalets</h3>
          <p>Choose an address to prefill the destination in your quote.</p>
          <ul class="journey-hotels">
            ${hotelDestinations.map(({ name, place }) => `
              <li>
                <a href="/?destination=${encodeURIComponent(name)}#booking">
                  <span>${name}</span><small>${place}</small>
                </a>
              </li>
            `).join("")}
          </ul>
        </div>
      </div>
    </div>
  </section>
`;

const pageMarkup = markup
  .replaceAll("⟪email⟫", CONTACT_EMAIL)
  .replace('<section class="cta" id="contact">', journeyBoard + '<section class="cta" id="contact">')
  .replace(
    /<div class="eyebrow">PRIVATE CHAUFFEUR[^<]*<\/div><h1>[\s\S]*?<\/h1>/,
    "<h1>Private Chauffeur<br>on the French Riviera <em>&amp;</em> in the Alps</h1>",
  )
  .replace(
    /<button data-destination="([^"]+)">([\s\S]*?)<\/button>/g,
    (_, name: string, content: string) =>
      '<a href="' +
      destinationPaths[name] +
      '">' +
      content +
      "</a>",
  )
  .replace(
    /(<select id="pax" name="passengers">)[\s\S]*?<\/select>/,
    (_, opening: string) =>
      opening +
      Array.from(
        { length: 20 },
        (_, index) =>
          `<option value="${index + 1}">${index + 1}</option>`,
      ).join("") +
      "</select>",
);
  function installPhotonAutocomplete(root: HTMLDivElement) {
  const doc = root.ownerDocument;
  const cache = new Map<string, string[]>();
  const events = new AbortController();
  const restorers: Array<() => void> = [];

  let timer: ReturnType<typeof setTimeout> | undefined;
  let activeRequest: AbortController | undefined;
  let version = 0;
  let disposed = false;

  // Attribution displayed below the booking form.
  const hint = doc.createElement("p");
  hint.className = "photon-hint";

  const osmLink = doc.createElement("a");
  osmLink.href = "https://www.openstreetmap.org/copyright";
  osmLink.textContent = "© OpenStreetMap contributors";
  osmLink.target = "_blank";
  osmLink.rel = "noopener noreferrer";

    hint.append(osmLink);
    root.querySelector("footer .footer-inner")?.append(hint);

  const stop = () => {
    version += 1;
    clearTimeout(timer);
    activeRequest?.abort();
  };

  for (const id of ["pickup", "dropoff"]) {
    const input = root.querySelector<HTMLInputElement>("#" + id);

    if (!input) continue;

    const originalList = input.getAttribute("list");
    const originalAutocomplete = input.getAttribute("autocomplete");

    const source = originalList
      ? doc.getElementById(originalList)
      : null;

    const presets = source
      ? Array.from(
          source.querySelectorAll("option"),
          (option) => option.value,
        )
      : [];

    // Each field gets its own suggestions.
    const list = doc.createElement("datalist");
    list.id = id + "-photon-locations";

    input.after(list);
    input.setAttribute("list", list.id);
    input.setAttribute("autocomplete", "off");

    const render = (labels: string[]) => {
      list.replaceChildren();

      const values = Array.from(
        new Set([...labels, ...presets]),
      );

      for (const label of values) {
        const option = doc.createElement("option");
        option.value = label;
        list.append(option);
      }
    };

    render([]);

    const search = () => {
      stop();

      const query = input.value.trim();
      const currentVersion = version;

      if (query.length < 3) {
        render([]);
        return;
      }

      // Do not search again after choosing a suggestion.
      if (
        Array.from(list.options).some(
          (option) => option.value === query,
        )
      ) {
        return;
      }

      const key = query.toLowerCase();
      const cached = cache.get(key);

      if (cached) {
        render(cached);
        return;
      }

      timer = setTimeout(async () => {
        const request = new AbortController();
        activeRequest = request;

        const timeout = setTimeout(
          () => request.abort(),
          8000,
        );

        try {
          const url = new URL(
            "https://photon.komoot.io/api/",
          );

          url.searchParams.set("q", query);
          url.searchParams.set("limit", "6");
          url.searchParams.set("lang", "en");

          // Prefer results near the French Riviera,
          // without excluding other destinations.
          url.searchParams.set("lat", "43.7");
          url.searchParams.set("lon", "7.26");

          const response = await fetch(url, {
            signal: request.signal,
            credentials: "omit",
          });

          if (!response.ok) {
            throw new Error("Location search unavailable");
          }

          const data = (await response.json()) as {
            features?: Array<{
              properties?: Record<
                string,
                string | undefined
              >;
            }>;
          };

          const labels = (data.features ?? [])
            .map((feature) => {
              const p = feature.properties ?? {};

              const street = [
                p.housenumber,
                p.street,
              ]
                .filter(Boolean)
                .join(" ");

              const city =
                p.city ||
                p.town ||
                p.village ||
                p.county;

              const parts = [
                p.name,
                street,
                city,
                p.country,
              ].filter(
                (value): value is string =>
                  Boolean(value?.trim()),
              );

              return Array.from(new Set(parts)).join(", ");
            })
            .filter(Boolean);

          // Ignore an outdated response.
          if (
            disposed ||
            currentVersion !== version ||
            input.value.trim() !== query
          ) {
            return;
          }

          cache.set(key, labels);

          if (cache.size > 40) {
            const oldest = cache.keys().next().value;

            if (oldest !== undefined) {
              cache.delete(oldest);
            }
          }

          render(labels);
        } catch {
          // Keep manual entry and the original suggestions.
          if (
            !disposed &&
            currentVersion === version
          ) {
            render([]);
          }
        } finally {
          clearTimeout(timeout);

          if (activeRequest === request) {
            activeRequest = undefined;
          }
        }
      }, 600);
    };

    input.addEventListener("input", search, {
      signal: events.signal,
    });

    input.addEventListener("blur", stop, {
      signal: events.signal,
    });

    restorers.push(() => {
      if (originalList === null) {
        input.removeAttribute("list");
      } else {
        input.setAttribute("list", originalList);
      }

      if (originalAutocomplete === null) {
        input.removeAttribute("autocomplete");
      } else {
        input.setAttribute(
          "autocomplete",
          originalAutocomplete,
        );
      }

      list.remove();
    });
  }

  return () => {
    disposed = true;
    stop();
    events.abort();
    restorers.forEach((restore) => restore());
    hint.remove();
  };
}
function initializeLuxuryHome(
 root: HTMLDivElement,
 sendBooking: (payload: Record<string, unknown>) => Promise<void>
) {
  const cleanup: Array<() => void> = [];
cleanup.push(installPhotonAutocomplete(root));
const listen = (element: HTMLElement, event: string, handler: (event: Event) => void) => { element.addEventListener(event, handler); cleanup.push(() => element.removeEventListener(event, handler)); };
const document = {
  getElementById: (id: string) => root.querySelector("#" + id) as HTMLInputElement & HTMLFormElement & HTMLDialogElement,
  querySelector: (selector: string) => root.querySelector<HTMLElement>(selector)!,
  querySelectorAll: (selector: string) => root.querySelectorAll<HTMLElement>(selector),
  createElement: (tag: "textarea") => window.document.createElement(tag),
  body: root,
  execCommand: (command: string) => window.document.execCommand(command)
};

  const $ = (id: string) => document.getElementById(id); let mode = "transfer", preferred = DEFAULT_VEHICLE;
  const bookingParams = new URLSearchParams(window.location.search);
  const requestedPickup = bookingParams.get("pickup");
  const requestedDestination = bookingParams.get("destination");

  if (requestedPickup && requestedPickup.length <= $("pickup").maxLength) {
    $("pickup").value = requestedPickup;
  }
  if (
    requestedDestination &&
    requestedDestination.length <= $("dropoff").maxLength
  ) {
    $("dropoff").value = requestedDestination;
  }
type Quote = {mode:string;pickup:string;dropoff:string;date:string;time:string;pax:number;vehicle:string;duration:string;amount:null};
let lastQuote: Quote | null = null;
root.querySelector<HTMLElement>(".form-note")?.remove();$('year').textContent=String(new Date().getFullYear());const today=new Date();const local=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);$('date').min=local;
root.querySelectorAll<HTMLButtonElement>(".choose").forEach((button) => {
  button.classList.toggle(
    "selected",
    button.dataset.vehicle === preferred,
  );
});

root.querySelectorAll<HTMLImageElement>(".fleet-card img").forEach((image) => {
  const showFallback = () => {
    image.hidden = true;

    const fallback = image.nextElementSibling as HTMLElement | null;

    if (fallback) {
      fallback.hidden = false;
    }
  };

  listen(image, "error", showFallback);

  if (image.complete && image.naturalWidth === 0) {
    showFallback();
  }
});const nav=$('nav');listen($('menu'),'click',()=>{const open=nav.classList.toggle('open');$('menu').setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>listen(a,'click',()=>{nav.classList.remove('open');$('menu').setAttribute('aria-expanded','false')}));
listen($('transferLink'),'click',()=>setMode('transfer'));
function setMode(m: string){mode=m;const hourly=m==='hourly';$('transferTab').classList.toggle('active',!hourly);$('hourlyTab').classList.toggle('active',hourly);$('transferTab').setAttribute('aria-selected',String(!hourly));$('hourlyTab').setAttribute('aria-selected',String(hourly));$('dropField').hidden=hourly;$('durationField').hidden=!hourly;$('swap').hidden=hourly;$('dropoff').required=!hourly;$('formError').hidden=true}
$('transferTab').onclick=()=>setMode('transfer');$('hourlyTab').onclick=()=>setMode('hourly');listen($('hourlyLink'),'click',()=>setMode('hourly'));$('swap').onclick=()=>{const a=$('pickup').value;$('pickup').value=$('dropoff').value;$('dropoff').value=a};
function showError(message: string){$('formError').textContent=message;$('formError').hidden=false}
listen($('quoteForm'),'submit',e=>{e.preventDefault();$('formError').hidden=true;const pickup=$('pickup').value.trim(),dropoff=$('dropoff').value.trim(),date=$('date').value,time=$('time').value,pax=Number($('pax').value);if(!pickup||mode==='transfer'&&!dropoff||!date||!time){showError('Please complete pickup, destination (if applicable), date and time.');return}if(!Number.isFinite(new Date(date+'T'+time).getTime()) || new Date(date+'T'+time).getTime()<=Date.now()){showError('Please choose a future date and time.');return}const amount = null;lastQuote={mode,pickup,dropoff,date,time,pax,vehicle:preferred,duration:$('duration').value,amount};
const summary = $("quoteSummary");
summary.replaceChildren();
const journey = root.ownerDocument.createElement("bdi");
journey.translate = false;
journey.textContent = mode === "transfer" ? `${pickup} → ${dropoff}` : pickup;
summary.append(journey);
const details = mode === "transfer"
  ? [["Date", date], ["Time", time], ["Passengers", pax]]
  : [["Duration", $("duration").value], ["Date", date], ["Time", time], ["Passengers", pax]];
for (const [label, value] of details) {
  const term = root.ownerDocument.createElement("span");
  term.textContent = String(label);
  summary.append(" · ", term, ": " + value);
}
const priceBox = $("priceBox");
const priceMessage = root.ownerDocument.createElement("span");
const capacity = vehicles.find((vehicle) => vehicle.name === preferred)?.passengers ?? 0;
priceMessage.textContent = pax > capacity
  ? "Your group exceeds this vehicle’s listed capacity. Please choose a larger vehicle or request multiple vehicles."
  : "Custom quotation required";
priceBox.replaceChildren(priceMessage, " · " + preferred);
$('requestHint').textContent='Your request will be sent to our team. Your booking is confirmed separately.';$('sendRequest').disabled=false;$('sendRequest').textContent='Send Booking Request →';$('quoteDialog').showModal()});
$('closeDialog').onclick=()=>$('quoteDialog').close();listen($('quoteDialog'),'click',e=>{if(e.target===$('quoteDialog'))$('quoteDialog').close()});
function requestText(){if(!lastQuote)return "";const q=lastQuote;return `Luxury Chauffeur — Quote Request\n\nService: ${q.mode==='transfer'?'Transfer':'Hourly service'}\nPickup: ${q.pickup}\n${q.mode==='transfer'?`Drop-off: ${q.dropoff}\n`:`Duration: ${q.duration} hours\n`}Date: ${q.date}\nTime: ${q.time}\nPassengers: ${q.pax}\nPreferred vehicle: ${q.vehicle}\n${q.amount===null?'Price: Custom quote requested':`Indicative price: €${q.amount} (subject to confirmation)`}\n\nName: ${$('customerName').value.trim()}\nEmail: ${$('customerEmail').value.trim()}\nPhone: ${$('customerPhone').value.trim()}\nNotes: ${$('notes').value.trim()}\n\nPlease confirm availability and final price.`}
listen($('requestForm'),'submit',async e=>{
e.preventDefault();
if (!$('requestForm').reportValidity() || !lastQuote || $('sendRequest').disabled) return;
if ($('companyWebsite').value) { $('requestHint').textContent='Please leave the hidden field empty.'; return; }
const button=$('sendRequest'); button.disabled=true; button.textContent='Sending…';
try {
 await sendBooking({
   mode:lastQuote.mode, pickup:lastQuote.pickup, dropoff:lastQuote.dropoff,
   date:lastQuote.date, time:lastQuote.time, passengers:lastQuote.pax,
   vehicle:lastQuote.vehicle, duration:Number(lastQuote.duration),
   timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,
   requestedAt:new Date(lastQuote.date+'T'+lastQuote.time).toISOString(),
   name:$('customerName').value.trim(), email:$('customerEmail').value.trim(),
   phone:$('customerPhone').value.trim(), notes:$('notes').value.trim(),
   consent:$('consent').checked, company_website:$('companyWebsite').value,
 });
 $('requestHint').textContent = 'Your request has been submitted. Our team will contact you to confirm availability and price.';
 button.textContent='Request received';
} catch {
 $('requestHint').textContent='Your request could not be submitted. Please try again or contact our team.';
 button.disabled=false; button.textContent='Send Booking Request →';
}
});$('copyRequest').onclick=async()=>{if(!lastQuote)return;const t=requestText();try{await navigator.clipboard.writeText(t);$('requestHint').textContent='Quote details copied.'}catch{const el=document.createElement('textarea');el.value=t;document.body.append(el);el.select();document.execCommand('copy');el.remove();$('requestHint').textContent='Quote details copied (if your browser allows copying).'}};
document.querySelectorAll('.choose').forEach(b=>listen(b,'click',()=>{preferred = b.dataset.vehicle || DEFAULT_VEHICLE;document.querySelectorAll('.choose').forEach(x=>x.classList.toggle('selected',x===b));document.querySelector('#booking').scrollIntoView({behavior:'smooth'});$('pickup').focus({preventScroll:true})}));document.querySelectorAll('[data-destination]').forEach(b=>listen(b,'click',()=>{$('dropoff').value=b.dataset.destination || '';setMode('transfer');$('booking').scrollIntoView({behavior:'smooth'});$('pickup').focus({preventScroll:true})}));
return () => {
  cleanup.forEach(dispose => dispose());
  ['transferTab','hourlyTab','swap','closeDialog','copyRequest'].forEach(id => { $(id).onclick=null; });
};
}

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    return initializeLuxuryHome(root.current, async (payload: Record<string, unknown>) => {
      const email = BOOKING_EMAIL.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Reservation email is not configured.");
      }

      const response = await fetch(
        "https://formsubmit.co/ajax/" + encodeURIComponent(email),
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...payload,
            _subject: "Luxury Chauffeur — Booking request",
            _template: "table",
            _url: window.location.href,
            _honey: String(payload.company_website || ""),
          }),
        },
      );
      const result: { success?: boolean | string; message?: string } = await response.json();
      if (!response.ok || !(result.success === true || result.success === "true")) {
        throw new Error("The request could not be submitted.");
      }
    });
  }, []);
  return (
    <div className="luxury-home" ref={root}>
      <a className="skip" href="#booking">Skip to booking</a>
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="/#accueil" aria-label="Luxury Chauffeur home">
            <span className="monogram">LC</span>
            <span className="brand-text">
              LUXURY-CHAUFFEUR<span className="domain">.com</span>
              <small>PREMIUM CHAUFFEUR SERVICE</small>
            </span>
          </a>
          <nav className="nav" id="nav" aria-label="Main navigation">
            <a href="#booking" id="transferLink">Transfers</a>
            <a href="#booking" id="hourlyLink">Hourly Service</a>
            <a href="#fleet">Our Fleet</a>
            <a href="#destinations">Destinations</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="book-top" href="#booking">
            Book Now <span aria-hidden="true">↗</span>
          </a>
          <SiteLanguageMenu />
          <button
            type="button"
            className="menu"
            id="menu"
            aria-label="Open navigation"
            aria-controls="nav"
            aria-expanded="false"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>
      <div className="luxury-home-content" dangerouslySetInnerHTML={{ __html: pageMarkup }} />
    </div>
  );
}
