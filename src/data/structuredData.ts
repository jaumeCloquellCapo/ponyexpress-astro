import type { Lang } from './i18n';

const SITE_URL = 'https://ponyexpressmallorca.com';

function baseBusiness(lang: Lang) {
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'LocalBusiness' as const,
    name: 'Pony Express Mallorca',
    description:
      lang === 'es'
        ? 'Alquiler de ponis en Mallorca para fiestas de cumpleaños y eventos. Los niños disfrutan de un día montando ponis en Palma y toda la isla. Servicio a domicilio o en nuestra finca.'
        : 'Pony hire in Mallorca for birthday parties and events. Children enjoy a day riding ponies in Palma and across the island. Home service or at our farm.',
    url: SITE_URL,
    telephone: '+34619861880',
    image: `${SITE_URL}/images/bk.jpeg`,
    logo: `${SITE_URL}/images/logo.ico`,
    sameAs: ['https://www.facebook.com/ponyexpressmallorca/'],
    address: {
      '@type': 'PostalAddress' as const,
      addressLocality: 'Palma de Mallorca',
      addressRegion: 'Mallorca',
      addressCountry: 'ES',
    },
    areaServed: { '@type': 'Place' as const, name: 'Mallorca' },
    priceRange: '€€',
  };
}

/** JSON-LD para la página principal (WebSite + Organization) */
export function getWebSiteJsonLd(lang: Lang, canonicalUrl: string): Record<string, unknown> {
  const inLanguage = lang === 'es' ? 'es' : 'en';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Pony Express Mallorca',
    url: canonicalUrl,
    description:
      lang === 'es'
        ? 'Alquiler de ponis en Mallorca para fiestas de cumpleaños y eventos. Disfruta de un día montando ponis en Palma y Mallorca.'
        : 'Pony hire in Mallorca for birthday parties and events. Enjoy a day riding ponies in Palma and Mallorca.',
    inLanguage,
    publisher: {
      '@type': 'LocalBusiness',
      name: 'Pony Express Mallorca',
      url: SITE_URL,
      telephone: '+34619861880',
    },
    potentialAction: {
      '@type': 'ContactAction',
      target: {
        '@type': 'EntryPoint',
        url: `${SITE_URL}${lang === 'en' ? '/en/contact' : '/contact'}`,
      },
      description: lang === 'es' ? 'Contactar con Pony Express Mallorca' : 'Contact Pony Express Mallorca',
    },
  };
}

/** JSON-LD para página de contacto (ContactPage) */
export function getContactPageJsonLd(lang: Lang, canonicalUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: lang === 'es' ? 'Contacto | Pony Express Mallorca' : 'Contact | Pony Express Mallorca',
    url: canonicalUrl,
    description:
      lang === 'es'
        ? 'Reserva alquiler de ponis en Mallorca: fiestas de cumpleaños, día montando ponis o eventos. Teléfono 619 86 18 80.'
        : 'Book pony hire in Mallorca: birthday parties, day riding ponies or events. Phone 619 86 18 80.',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Pony Express Mallorca',
      telephone: '+34619861880',
      url: SITE_URL,
      areaServed: { '@type': 'Place', name: 'Mallorca' },
    },
  };
}

/** JSON-LD para página de cumpleaños (Service) */
export function getBirthdayServiceJsonLd(lang: Lang, canonicalUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: lang === 'es' ? 'Fiestas de cumpleaños con ponis en Mallorca' : 'Birthday parties with ponies in Mallorca',
    url: canonicalUrl,
    description:
      lang === 'es'
        ? 'Fiesta de cumpleaños con ponis en Mallorca: los niños disfrutan de un día montando ponis. Alquiler a domicilio o en nuestra finca.'
        : 'Birthday party with ponies in Mallorca: children enjoy a day riding ponies. Hire at your venue or at our farm.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Pony Express Mallorca',
      url: SITE_URL,
    },
    areaServed: { '@type': 'Place', name: 'Mallorca' },
  };
}

/** Entrada de imagen para JSON-LD con título y descripción indexables */
export interface GalleryImageEntry {
  url: string;
  name: string;
  description: string;
}

/** JSON-LD para galería (ImageGallery) con cada foto indexable por title y description */
export function getGalleryJsonLd(
  lang: Lang,
  canonicalUrl: string,
  imageEntries: GalleryImageEntry[] = []
): Record<string, unknown> {
  const defaultEntries: GalleryImageEntry[] = [
    { url: `${SITE_URL}/images/bk.jpeg`, name: 'Pony Express Mallorca', description: lang === 'es' ? 'Ponis en la finca. Alquiler de ponis Mallorca, fiestas de cumpleaños y día montando ponis.' : 'Ponies at the farm. Pony hire Mallorca, birthday parties and day riding ponies.' },
    { url: `${SITE_URL}/images/finca.webp`, name: 'Pony Express Mallorca', description: lang === 'es' ? 'Finca Pony Express Mallorca. Alquiler de ponis para fiestas de cumpleaños.' : 'Pony Express Mallorca farm. Pony hire for birthday parties.' },
  ];
  const entries = imageEntries.length ? imageEntries : defaultEntries;
  const imageList = entries.map((e) => ({
    '@type': 'ImageObject' as const,
    contentUrl: e.url.startsWith('http') ? e.url : `${SITE_URL}${e.url.startsWith('/') ? e.url : `/${e.url}`}`,
    name: e.name,
    description: e.description,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: lang === 'es' ? 'Galería | Pony Express Mallorca' : 'Gallery | Pony Express Mallorca',
    url: canonicalUrl,
    description:
      lang === 'es'
        ? 'Fotos de nuestros ponis y fiestas de cumpleaños en Mallorca. Niños disfrutando de un día montando ponis.'
        : 'Photos of our ponies and birthday parties in Mallorca. Kids enjoying a day riding ponies.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Pony Express Mallorca',
      url: SITE_URL,
    },
    image: imageList,
  };
}

export { SITE_URL, baseBusiness };
