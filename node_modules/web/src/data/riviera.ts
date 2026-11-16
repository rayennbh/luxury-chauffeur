export const heroImage =
  "https://images.hostinger.com/57f3e56c-0f9b-4362-8b29-5f8e8ad7d73c/211c5f7f-4c85-4476-aaa2-a14215cfac97.png";
export const photos = [
  {
    src: "https://images.hostinger.com/57f3e56c-0f9b-4362-8b29-5f8e8ad7d73c/e268b586-0f7c-4444-b1ea-a7a6a05d59dd.png",
    title: "The spirit of the Riviera",
    caption: "Nice, between city and Mediterranean",
    width: 1216,
    height: 912,
  },
  {
    src: heroImage,
    title: "Blue horizons",
    caption: "Scenery of the French Riviera",
    width: 1472,
    height: 640,
  },
  {
    src: "https://images.hostinger.com/57f3e56c-0f9b-4362-8b29-5f8e8ad7d73c/aef3617c-5470-418b-88eb-bea30d7aff72.png",
    title: "Along the coast",
    caption: "A coastal road overlooking the sea",
    width: 1216,
    height: 912,
  },
];
export const services = [
  {
    number: "01",
    title: "Private Riviera transfers",
    text: "Travelling on the French Riviera? Tell us your pickup location, destination and preferred date. Let us arrange the details together.",
    link: "Request a transfer",
    href: "#reservations",
  },
  {
    number: "02",
    title: "Your journey, thoughtfully arranged",
    text: "Every journey starts with a conversation. Share your requirements so we can discuss the arrangements for your transfer.",
    link: "Contact us",
    href: "#contact",
  },
  {
    number: "03",
    title: "Arrange an appointment",
    text: "Prefer to discuss your plans before booking? Suggest a date and time for an appointment with our team.",
    link: "Request an appointment",
    href: "#reservations",
  },
];
export function imageSet(src: string, width: number) {
  return `${src}?width=375 375w, ${src}?width=768 768w, ${src}?width=1024 1024w, ${src} ${width}w`;
}