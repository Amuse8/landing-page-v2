import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PrivacyModal from "../components/PrivacyModal";
import companyImage from "@/assets/optimized/question-mark-1600.webp";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface Window { turnstile?: any; }
}

function TurnstileWidget({ onToken }: { onToken: (t: string) => void }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<string | null>(null);
    const onTokenRef = useRef(onToken);

    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

    useEffect(() => {
        onTokenRef.current = onToken;
    }, [onToken]);

    useEffect(() => {
    if (!document.querySelector('script[data-turnstile="1"]')) {
        const s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        s.async = true;
        s.defer = true;
        s.dataset.turnstile = "1";
        document.body.appendChild(s);
        }

        const timer = setInterval(() => {
            if (!ref.current || !window.turnstile) return;

            if (widgetIdRef.current) {
                clearInterval(timer);
                return;
            }

            ref.current.innerHTML = "";

            const widgetId = window.turnstile.render(ref.current, {
                sitekey: siteKey,
                callback: (token: string) => onTokenRef.current(token),
                "expired-callback": () => onTokenRef.current(""),
                "error-callback": () => onTokenRef.current(""),
            });

            widgetIdRef.current = widgetId;
            clearInterval(timer);
        }, 150);

        return () => {
            clearInterval(timer);

            if (widgetIdRef.current && window.turnstile?.remove) {
                window.turnstile.remove(widgetIdRef.current);
            }
            widgetIdRef.current = null;
            };
    }, [siteKey]);

    return <div ref={ref}/>;
}

type NoticeType = "success" | "error" | "info";
type NoticeState = { type: NoticeType; text: string } | null;

const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function InquiryPage() {
    const [openPrivacy, setOpenPrivacy] = useState(false);
    const [agree, setAgree] = useState(false);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [turnstileToken, setTurnstileToken] = useState("");
    const [hp, setHp] = useState("");

    const tokenRef = useRef<string>("");
    const [submitting, setSubmitting] = useState(false);

    const [notice, setNotice] = useState<NoticeState>(null);
    const noticeTimerRef = useRef<number | null>(null);

    const [emailError, setEmailError] = useState<string | null>(null);

    const showNotice = useCallback((type: NoticeType, text: string, ms = 2200) => {
        setNotice({ type, text });
        if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
        noticeTimerRef.current = window.setTimeout(() => setNotice(null), ms);
    }, []);

    useEffect(() => {
        return () => {
            if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
        };
    }, []);

    const remaining = useMemo(() => 100 - message.length, [message.length]);

    const handleTurnstileToken = useCallback((t: string) => {
        tokenRef.current = t; 
        setTurnstileToken(t);
    }, []);

    const canSubmit = useMemo(() => {
    return (
        agree &&
        email.trim().length > 0 &&
        phone.trim().length > 0 &&
        message.trim().length > 0 &&
        message.length <= 100 &&
        isValidEmail(email) &&
        turnstileToken.trim().length > 0 &&
        hp.trim().length === 0 &&
        !submitting
        );
    }, [agree, email, phone, message, turnstileToken, hp, submitting]);

    const validate = () => {
        if (!agree) return "개인정보 수집·이용에 동의해 주세요.";
        if (!email.trim()) return "이메일을 입력해 주세요.";
        if (!isValidEmail(email)) return "올바른 이메일 형식으로 입력해 주세요.";
        if (!phone.trim()) return "연락처를 입력해 주세요.";
        if (!message.trim()) return "문의 내용을 입력해 주세요.";
        if (message.length > 100) return "문의 내용은 100자 이내로 입력해 주세요.";
        if (!tokenRef.current) return "봇 방지 인증을 완료해 주세요.";
        return null;
    };

    const onSubmit = async () => {
        setNotice(null);

        const err = validate();
        if (err) return showNotice("error", err);

        if (hp) return showNotice("error", "요청을 처리할 수 없습니다.");

        setSubmitting(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    agree,
                    email,
                    phone,
                    message,
                    turnstileToken: tokenRef.current,
                    hp,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) return showNotice("error", data?.message ?? "전송 실패. 잠시 후 다시 시도해 주세요.");

            showNotice("success", "접수가 완료되었습니다. 빠르게 확인 후 연락드리겠습니다.");

            setEmail(""); setPhone(""); setMessage("");
            setTurnstileToken("");
            tokenRef.current = "";
        } finally {
            setSubmitting(false);
        }
    };

    return (
    <div className="min-h-screen bg-white">
        <PrivacyModal open={openPrivacy} onClose={() => setOpenPrivacy(false)} />
        {notice && (
            <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-2xl border bg-white/90 px-4 py-3 shadow-lg">
                <div className="text-sm font-semibold">{notice.text}</div>
            </div>
        )}
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <div className="relative hidden lg:block">
                <img src={companyImage} alt="회사 이미지" className="absolute inset-0 h-full w-full object-cover"/>
                <div className="absolute inset-0 bg-black/25" />
            </div>

            <div className="flex items-center justify-center px-6 py-14">
                <div className="w-full max-w-xl space-y-7">
                    <h1 className="mt-3 text-4xl font-extrabold">문의하기</h1>
                    

                    <div className="mt-10 space-y-7">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">
                            개인정보 수집동의 <span className="text-red-500">*</span>
                            </span>
                            <button
                            type="button"
                            onClick={() => setOpenPrivacy(true)}
                            className="text-sm text-gray-400 underline underline-offset-4"
                            >
                            전문보기
                            </button>
                        </div>

                        <label htmlFor="agree" className="flex items-center gap-3 text-sm text-gray-800">
                            <input
                            id="agree"
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            className="h-5 w-5 bg-white"
                            />
                            동의합니다.
                        </label>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                        이메일 <span className="text-red-500">*</span>
                        </label>
                        <input
                        value={email}
                        onChange={(e) => {
                        const v = e.target.value;
                        setEmail(v);
                        if (v && !isValidEmail(v)) setEmailError("올바른 이메일 형식으로 입력해 주세요.");
                        else setEmailError(null);
                        }}
                        className="w-full rounded-xl border bg-white text-black px-4 py-3 outline-none focus:ring"
                        />
                        {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p> }
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                        연락처 <span className="text-red-500">*</span>
                        </label>
                        <input
                        value={phone}
                        onChange={(e) => {
                            const filtered = e.target.value.replace(/[^0-9-]/g, "");
                            setPhone(filtered);
                        }}
                        className="w-full rounded-xl border bg-white text-black px-4 py-3 outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                        문의 내용 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value.slice(0, 100))}
                        rows={5}
                        className="w-full resize-none rounded-xl border bg-white text-black px-4 py-3 outline-none focus:ring"
                        placeholder="100자 이내로 입력해 주세요."
                        />
                        <div className="mt-2 text-right text-xs text-gray-400">{remaining}자 남음</div>
                    </div>

                    <div className="hidden">
                        <label>website</label>
                        <input value={hp} onChange={(e) => setHp(e.target.value)} />
                    </div>

                    {!turnstileToken && (
                    <div className="rounded-xl border p-4">
                        <TurnstileWidget onToken={handleTurnstileToken} />
                        <p className="mt-2 text-xs text-gray-500">
                        봇 방지를 위해 인증이 필요합니다.
                        </p>
                    </div>
                    )}

                    <button
                        type="button"
                        disabled={!canSubmit}
                        onClick={onSubmit}
                        className="w-full rounded-xl bg-black py-4 text-white disabled:opacity-60"
                    >
                        {submitting ? "전송 중..." : "제출하기"}
                    </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}