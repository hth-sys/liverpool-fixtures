exports.handler = async function() {
  const API_KEY = '792e4e6cd1eab9103b6d748131372325';
  const url = 'https://v3.football.api-sports.io/fixtures?team=40&season=2025';

  try {
    const res = await fetch(url, {
      headers: { 'x-apisports-key': API_KEY }
    });
    const data = await res.json();
    const now = new Date();
    const upcoming = (data.response || []).filter(m => new Date(m.fixture.date) > now);

    if (upcoming.length > 0) {
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ response: upcoming })
      };
    }

    const recent = (data.response || [])
      .filter(m => m.fixture.status.short === 'FT')
      .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date))
      .slice(0, 10);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ response: recent, mode: 'recent' })
    };
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
