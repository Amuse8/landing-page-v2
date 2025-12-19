import type { VercelRequest, VercelResponse } from "@vercel/node";

type InquiryType = "ceep" | "wallwall" | "custom";
type CustomAiCategory =
    | "data_business"
    | "vision_video"
    | "recommend_personalize"
    | "nlp_voice"
    | "robotics"
    | "multimodal"
    | "app_web"
    | "crm_erp"
    | "etc";

    const INQUIRY_TYPE_LABEL: Record<InquiryType, string> = {
    ceep: "Ceep AI 문의",
    wallwall: "WallWall AI 문의",
    custom: "Custom AI 문의",
    };

    const CUSTOM_AI_CATEGORY_LABEL: Record<CustomAiCategory, string> = {
    data_business: "1. 데이터/비즈니스",
    vision_video: "2. 비전/영상",
    recommend_personalize: "3. 추천/개인화",
    nlp_voice: "4. 자연어/음성",
    robotics: "5. 로보틱스",
    multimodal: "6. 멀티모달",
    app_web: "7. APP/WEB",
    crm_erp: "8. CRM/ERP",
    etc: "9. 기타(직접 입력)",
    };

    const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

    try {
        const {
        agree,
        email,
        phone,
        message,
        turnstileToken,
        hp,
        inquiryType,
        customAiCategory,
        customAiEtcText,
        } = req.body ?? {};

        if (hp) return res.status(400).json({ message: "Bad request" });

        if (!agree) return res.status(400).json({ message: "개인정보 수집·이용 동의가 필요합니다." });

        if (!email || !phone || !message) {
        return res.status(400).json({ message: "필수 항목을 입력해 주세요." });
        }

        if (!isValidEmail(String(email))) {
        return res.status(400).json({ message: "올바른 이메일 형식으로 입력해 주세요." });
        }

        if (String(message).length > 100) {
        return res.status(400).json({ message: "문의 내용은 100자 이내로 입력해 주세요." });
        }

        if (!turnstileToken) return res.status(400).json({ message: "봇 방지 인증이 필요합니다." });

        const it = String(inquiryType || "") as InquiryType;
        if (!it || !INQUIRY_TYPE_LABEL[it]) {
        return res.status(400).json({ message: "문의 유형을 선택해 주세요." });
        }

        let customCategoryLabel: string | null = null;
        let customEtcFinal: string | null = null;

        if (it === "custom") {
        const cat = String(customAiCategory || "") as CustomAiCategory;
        if (!cat || !CUSTOM_AI_CATEGORY_LABEL[cat]) {
            return res.status(400).json({ message: "Custom AI 문의 항목을 선택해 주세요." });
        }

        customCategoryLabel = CUSTOM_AI_CATEGORY_LABEL[cat];

        if (cat === "etc") {
            const etc = String(customAiEtcText || "").trim();
            if (!etc) return res.status(400).json({ message: "기타 항목을 입력해 주세요." });
            customEtcFinal = etc;
        }
        }

        // ===== Turnstile verify =====
        const secret = process.env.TURNSTILE_SECRET_KEY;
        if (!secret) return res.status(500).json({ message: "Missing TURNSTILE_SECRET_KEY" });

        const ip = (req.headers["x-forwarded-for"]?.toString().split(",")[0] ?? "").trim();
        const form = new URLSearchParams();
        form.append("secret", secret);
        form.append("response", String(turnstileToken));
        if (ip) form.append("remoteip", ip);

        const verifyResp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: form.toString(),
        });

        const verifyData = await verifyResp.json();
        if (!verifyData?.success) return res.status(400).json({ message: "봇 방지 검증 실패" });

        // ===== Resend send =====
        const resendKey = process.env.RESEND_API_KEY;
        if (!resendKey) return res.status(500).json({ message: "Missing RESEND_API_KEY" });

        const to = "supports@amuse8.kr";

        const typeLabel = INQUIRY_TYPE_LABEL[it];

        const subject = `[랜딩페이지-문의] ${typeLabel} / ${String(email)}`;

        const textLines: string[] = [
        `문의 유형: ${typeLabel}`,
        ];

        if (it === "custom") {
        textLines.push(`Custom AI 항목: ${customCategoryLabel ?? "-"}`);
        if (customEtcFinal) textLines.push(`Custom AI 기타 내용: ${customEtcFinal}`);
        }

        textLines.push(
        "",
        `담당자 이메일: ${String(email)}`,
        `담당자 연락처: ${String(phone)}`,
        "",
        "문의 내용:",
        String(message),
        ""
        );

        const sendResp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "Amuse8 LandingPage Contact <supports@amuse8.kr>",
            to: [to],
            subject,
            text: textLines.join("\n"),
            reply_to: String(email),
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
