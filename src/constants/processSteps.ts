export type ProcessStep = {
    id: string;
    title: string;
    desc: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
    { id: "01", title: "문의/신청", desc: "문의하기를 통해 어떤 서비스가 필요한지 신청합니다." },
    { id: "02", title: "상담/컨설팅", desc: "전문가를 통해 우리 기업, 브랜드의 특성과 니즈에 맞춤 제작을 위해 상담 및 컨설팅 합니다." },
    { id: "03", title: "상세 견적 안내", desc: "고객 니즈를 반영한 상세 견적을 안내 드립니다." },
    { id: "04", title: "계약", desc: "발송드린 전자계약서에 서명 후 입금 절차를 진행합니다." },
    { id: "05", title: "개발", desc: "고객사의 특성과 니즈에 맞춰 전문인력이 투입되어 개발합니다." },
    { id: "06", title: "피드백 및 수정", desc: "주 1회 개발 보고와 실시간 개발 진행 상황을 확인하고 피드백을 반영해 수정합니다." },
    { id: "07", title: "프로젝트 완료", desc: "프로젝트를 종료하거나 추가 계약 여부를 조율합니다." },
];
