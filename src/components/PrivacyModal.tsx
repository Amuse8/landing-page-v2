import { useEffect } from "react";

export default function PrivacyModal({
    open,
    onClose,
    }: {
    open: boolean;
    onClose: () => void;
    }) {
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
        <button
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
            aria-label="닫기"
        />

        <div className="absolute left-1/2 top-1/2 w-[min(720px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold">개인정보 수집·이용 동의</h2>
            <button
                onClick={onClose}
                className="rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
            >
                닫기
            </button>
            </div>

            <div className="max-h-[70vh] overflow-auto px-6 py-5 text-sm leading-6 text-gray-700">
            <div className="space-y-6">
                <section className="space-y-2">
                <h3 className="text-base font-semibold text-gray-900">
                    1. 수집하는 개인정보 항목
                </h3>
                <p>회사는 문의 접수를 위해 아래와 같은 개인정보를 수집합니다.</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                    <span className="font-medium">필수 항목</span> : 담당자 이메일,
                    담당자 연락처, 문의 내용
                    </li>
                </ul>
                </section>

                <hr className="border-gray-200" />

                <section className="space-y-2">
                <h3 className="text-base font-semibold text-gray-900">
                    2. 개인정보의 수집·이용 목적
                </h3>
                <p>수집된 개인정보는 다음의 목적을 위해 이용됩니다.</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>문의 내용 확인 및 상담 응대</li>
                    <li>서비스 소개 및 관련 안내 제공</li>
                    <li>문의 이력 관리 및 고객 응대 품질 개선</li>
                </ul>
                </section>

                <hr className="border-gray-200" />

                <section className="space-y-2">
                <h3 className="text-base font-semibold text-gray-900">
                    3. 개인정보의 보유 및 이용 기간
                </h3>
                <p>
                    수집된 개인정보는{" "}
                    <span className="font-medium">문의 접수일로부터 최대 3년간</span>{" "}
                    보관되며, 목적 달성 후에는 지체 없이 파기됩니다.
                </p>
                <p>
                    단, 관계 법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간
                    동안 보관될 수 있습니다.
                </p>
                </section>

                <hr className="border-gray-200" />

                <section className="space-y-2">
                <h3 className="text-base font-semibold text-gray-900">
                    4. 동의 거부 권리 및 불이익 안내
                </h3>
                <p>
                    귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.
                    다만, 동의하지 않으실 경우 문의 접수 및 상담 제공이 제한될 수
                    있습니다.
                </p>
                </section>

                <hr className="border-gray-200" />

                <section className="space-y-2">
                <h3 className="text-base font-semibold text-gray-900">
                    5. 개인정보 보호 및 관리
                </h3>
                <p>
                    회사는 수집된 개인정보를 관련 법령 및 내부 관리 기준에 따라 안전하게
                    관리하며, 개인정보 보호를 위해 필요한 기술적·관리적 보호조치를
                    시행하고 있습니다.
                </p>
                </section>
            </div>
            </div>
        </div>
        </div>
    );
}
