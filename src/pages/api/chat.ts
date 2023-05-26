import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi, Configuration } from 'openai'

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
    const config = new Configuration({
      apiKey: process.env.CHAT_API_KEY
    })
    const openai = new OpenAIApi(config)

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],

      max_tokens: 200,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1

    })

    if (completion.data.choices[0].message) { return res.status(200).json({ response: completion.data.choices[0].message?.content }) } else throw new Error('No response')
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Internal Error' })
  }
}
