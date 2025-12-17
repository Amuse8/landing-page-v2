import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

    try {
        const { agree, email, phone, message, turnstileToken, hp } = req.body ?? {};

        if (hp) return res.status(400).json({ message: "Bad request" });

        if (!agree) return res.status(400).json({ message: "개인정보 수집·이용 동의가 필요합니다." });
        if (!email || !phone || !message) return res.status(400).json({ message: "필수 항목을 입력해 주세요." });
        if (String(message).length > 100) return res.status(400).json({ message: "문의 내용은 100자 이내로 입력해 주세요." });
        if (!turnstileToken) return res.status(400).json({ message: "봇 방지 인증이 필요합니다." });

        const secret = process.env.TURNSTILE_SECRET_KEY;
        if (!secret) return res.status(500).json({ message: "Missing TURNSTILE_SECRET_KEY" });

        const ip = (req.headers["x-forwarded-for"]?.toString().split(",")[0] ?? "").trim();
        const form = new URLSearchParams();
        form.append("secret", secret);
        form.append("response", turnstileToken);
        if (ip) form.append("remoteip", ip);

        const verifyResp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            body: form.toString(),
        });

        const verifyData = await verifyResp.json();
        if (!verifyData?.success) return res.status(400).json({ message: "봇 방지 검증 실패" });

        const resendKey = process.env.RESEND_API_KEY;
        if (!resendKey) return res.status(500).json({ message: "Missing RESEND_API_KEY" });

        const to = "supports@amuse8.kr";
        const subject = `[문의] ${String(email)}`;
        const text =
    `담당자 이메일: ${email}
    담당자 연락처: ${phone}

    문의 내용:
    ${message}
    `;

        const sendResp = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${resendKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Amuse8 Contact <onboarding@resend.dev>",
                /*from: "Amuse8 Contact <supports@amuse8.kr>", */
                to: [to],
                subject,
                text,
                    reply_to: email,
                }),
            });
            if (!sendResp.ok) {
                const errText = await sendResp.text().catch(() => "");
                return res.status(500).json({ message: "메일 전송 실패", detail: errText });
            }

            return res.status(200).json({ ok: true });
        } catch {
            return res.status(500).json({ message: "Server error" });
        }
}
