import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: string
  response?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          `Bearer ${process.env.CHAT_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Simula que eres la i.a de ChatGPT y da respuesta al siguiente prompt:\n\n${prompt}?`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })

    if (!response.ok) {
      return res.status(500).json({ message: 'OpenAI API Error' })
    }
    const json = await response.json()

    // const responseMessage = json.choices[0].text.replace(/(\r\n|\n|\r)/gm, ' ')
    const responseMessage = json.choices[0].text.trim()

    return res.status(200).json({ response: responseMessage })
  } catch (error) {
    return res.status(400).json({ message: 'Internal Error' })
  }
}
