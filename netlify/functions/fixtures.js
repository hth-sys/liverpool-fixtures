exports.handler = async function() {
  const API_KEY = '792e4e6cd1eab9103b6d748131372325';
  const url = 'https://v3.football.api-sports.io/fixtures?team=40&next=20';

  try {
    const res = await fetch(url, {
      headers: {
        'x-apisports-key': API_KEY
      }
    });
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
