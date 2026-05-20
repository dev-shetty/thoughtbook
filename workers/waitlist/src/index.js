const ALLOWED_ORIGINS = [
  "https://thoughtbook.shetty.me",
  "http://127.0.0.1:5500",
]

function getCorsHeaders(request) {
  const origin = request.headers.get("Origin")
  if (ALLOWED_ORIGINS.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  }
  return {}
}

function json(data, status, corsHeaders) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  })
}

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request)

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, corsHeaders)
    }

    const form = await request.formData()
    const email = form.get("email")?.trim().toLowerCase()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Invalid email" }, 400, corsHeaders)
    }

    const existing = await env.WAITLIST.get(email)
    if (existing) {
      return json(
        { ok: true, message: "You're already on the waitlist!" },
        200,
        corsHeaders,
      )
    }

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Deveesh from Thoughtbook <dev@shetty.me>",
        to: email,
        subject: "Your Thoughtbook invite is here!",
        html: `<p>Hey!</p>
<p>Your thoughts deserve a place to live - and now they have one.</p>
<p>Thoughtbook is a private, encrypted journal that stays on your device. No accounts, no cloud, no compromise.</p>
<p><a href="https://testflight.apple.com/join/T9SKyVmX"><strong>Join the iOS beta on TestFlight &rarr;</strong></a></p>
<p>Feel free to reply with any feedback.</p>
<p>Happy writing!<br><br>- Deveesh</p>`,
      }),
    })
    const emailData = await emailRes.json()
    console.log("Resend response:", emailRes.status, JSON.stringify(emailData))

    if (!emailRes.ok) {
      return json(
        {
          ok: false,
          message: "Something went wrong. Please try again.",
          error: emailData,
        },
        200,
        corsHeaders,
      )
    }

    await env.WAITLIST.put(
      email,
      JSON.stringify({
        joinedAt: new Date().toISOString(),
        source: request.headers.get("Referer") || "direct",
      }),
    )

    return json(
      {
        ok: true,
        message: "You're in. Check your email for the TestFlight invite.",
      },
      200,
      corsHeaders,
    )
  },
}
