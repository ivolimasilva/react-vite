addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const OWN_URL = 'https://f1.ivolimasilva.workers.dev';
const BASE_URL = 'https://csr.ivolimasilva.xyz';

const getUrl = (year) => `https://ergast.com/api/f1/${year}/driverStandings/1.json`;

class ElementHandler {
  constructor(year, winner) {
    this.year = year;
    this.winner = winner;
  }
  element(element) {
    // An incoming element, such as `div`
    element.append(`<meta property="og:title" content="And the winner for ${this.year} is ${this.winner.givenName} ${this.winner.familyName}" />`, { html: true });
    element.append(`<meta property="twitter:title" content="And the winner for ${this.year} is ${this.winner.givenName} ${this.winner.familyName}" />`, { html: true });
    element.append(`<meta property="twitter:card" content="summary" />`, { html: true });
  }
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname.slice(1); // Removing the `/`
  const year = parseInt(path, 10);

  if (!Number.isInteger(year)) {
    const response = await fetch(`${BASE_URL}/${path}`);

    return response;
  }

  const apiUrl = getUrl(year);

  const apiResponse = await fetch(apiUrl);
  const body = await apiResponse.json();
  const winner = body['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][0]['Driver'];

  const htmlResponse = await fetch(`${BASE_URL}/${path}`);

  const rewriter = new HTMLRewriter().on("head", new ElementHandler(year, winner));
  const newReponse = rewriter.transform(htmlResponse);

  return newReponse;
}

// Get year from URL:
  // If:
    // doesn't have year nor is HTML, pass through
    // has year:
      // Request API with year
      // Request response from server
      // Add SEO meta tags
      // Respond with response + meta tags
