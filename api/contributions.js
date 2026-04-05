export const config = { runtime: 'edge' };

export default async function handler(req) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: 'No token configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const now   = new Date();
  const since = new Date(now);
  since.setDate(since.getDate() - 29);

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const gqlRes = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        username: 'rcodeborg2311',
        from: since.toISOString(),
        to: now.toISOString(),
      },
    }),
  });

  if (!gqlRes.ok) {
    return new Response(JSON.stringify({ error: 'GitHub API error' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await gqlRes.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
