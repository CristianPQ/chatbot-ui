import {
  BACKEND_HOST,
  BACKEND_API_KEY,
  DEFAULT_RECOMMENDATIONS_MODEL,
} from '@/utils/app/const';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { query, recommedations_model_name } = (await req.json()) as {
      query: string;
      recommedations_model_name: string;
    };

    const response = await fetch(
      `${BACKEND_HOST}/recommendations?` +
        new URLSearchParams({
          num_recommendations: '5',
          api_key: BACKEND_API_KEY,
          recommedations_model_name:
            recommedations_model_name || DEFAULT_RECOMMENDATIONS_MODEL,
        }).toString(),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      },
    );

    if (response.status === 401) {
      return new Response(response.body, {
        status: 500,
        headers: response.headers,
      });
    } else if (response.status !== 200) {
      console.error(
        `Backend API returned an error ${
          response.status
        }: ${await response.text()}`,
      );
      throw new Error('Backend API returned an error');
    }

    const json = await response.json();

    let recommendationsMessage = '';

    for (let i = 0; i < json.length; i++) {
      // FORMATTING how to send this data to the OpenAI API
      const message =
        `- TOP ${i + 1}:\n` +
        `Title: ${json[i].title}\n` +
        `Subtitle: ${json[i].subtitle}\n` +
        `url: ${json[i].url}\n` +
        `tag: ${json[i].tag}\n` +
        `text: ${json[i].text}\n`;
      recommendationsMessage += message;
    }

    return new Response(JSON.stringify({ recommendationsMessage }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
