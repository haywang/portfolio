import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages, model } = await req.json()

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000', // OpenRouter requested
          'X-Title': 'AI Chatbot' // your app name
        },
        body: JSON.stringify({
          model: model,
          messages: messages
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          error:
            errorData.error?.message ||
            `OpenRouter API 错误: ${response.statusText}`,
          code: response.status
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    // 添加响应数据的验证
    if (!data.choices || !data.choices.length) {
      const code = data?.error?.code || 500
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            'The API returned an invalid response format',
          code,
          data
        },
        { status: code }
      )
    }

    return NextResponse.json({
      message: data.choices[0].message.content
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'An error occurred while processing the request.',
        code: 500
      },
      { status: 500 }
    )
  }
}
