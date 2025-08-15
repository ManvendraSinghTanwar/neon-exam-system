import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { subject, difficulty, questionType, count } = await request.json()

    console.log("[v0] Question generation request:", { subject, difficulty, questionType, count })

    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY1 || "tgp_v1_KgbGMPx0dSxnPF1bbcerOrbtGX6JJSYLmgZ24nPNURU"}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        messages: [
          {
            role: "system",
            content: `You are an expert question generator. Generate exactly ${count} ${questionType} questions about ${subject} at ${difficulty} difficulty level. 

For multiple-choice questions, provide exactly 4 options (A, B, C, D) with one correct answer.
For descriptive questions, provide the question and expected key points for answers.

Return ONLY a valid JSON array in this exact format:
[
  {
    "question": "Question text here?",
    "type": "${questionType}",
    "difficulty": "${difficulty}",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "A",
    "explanation": "Brief explanation of the correct answer"
  }
]

For descriptive questions, use empty array for options and "N/A" for correctAnswer.`,
          },
          {
            role: "user",
            content: `Generate ${count} ${questionType} questions about ${subject} at ${difficulty} difficulty level.`,
          },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      console.log("[v0] Together API error:", response.status, response.statusText)
      throw new Error(`Together API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Together API response received")

    let questions
    try {
      const content = data.choices[0]?.message?.content?.trim()
      if (content) {
        // Try to extract JSON from the response
        const jsonMatch = content.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          questions = JSON.parse(jsonMatch[0])
        } else {
          questions = JSON.parse(content)
        }
      } else {
        throw new Error("No content in response")
      }

      console.log("[v0] Successfully parsed AI response")
    } catch (parseError) {
      console.log("[v0] Failed to parse AI response, using fallback questions")
      questions = Array.from({ length: count }, (_, i) => ({
        question: `Sample ${subject} question ${i + 1} (${difficulty} level)`,
        type: questionType,
        difficulty,
        options:
          questionType === "multiple-choice"
            ? [
                `Option A for question ${i + 1}`,
                `Option B for question ${i + 1}`,
                `Option C for question ${i + 1}`,
                `Option D for question ${i + 1}`,
              ]
            : [],
        correctAnswer: questionType === "multiple-choice" ? "A" : "N/A",
        explanation: `This is a sample explanation for ${subject} question ${i + 1}.`,
      }))
    }

    console.log("[v0] Returning questions:", questions.length)
    return NextResponse.json({ questions })
  } catch (error) {
    console.error("[v0] Question generation error:", error)
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 })
  }
}
