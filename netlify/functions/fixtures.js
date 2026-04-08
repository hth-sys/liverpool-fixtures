exports.handler = async function() {
  const API_KEY = '792e4e6cd1eab9103b6d748131372325';
  const url = 'https://v3.football.api-sports.io/fixtures?team=40&season=2024';

  try {
    const res = await fetch(url, {
      headers: { 'x-apisports-key': API_KEY }
    });
    const data = await res.json();
    const all = data.response || [];

    const now = new Date();

    let matches = all.filter(m => new Date(m.fixture.date) > now);

    if (matches.length === 0) {
      matches = all
        .filter(m => m.fixture.status.short === 'FT' || m.fixture.status.short === 'AET' || m.fixture.status.short === 'PEN')
        .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date))
        .slice(0, 10);
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ response: matches })
    };
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
