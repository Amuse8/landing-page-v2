export type ReasonItem = {
    id: string;
    problem: string;
    solution: string;
};

export const REASONS: ReasonItem[] = [
    {
        id: "reason-1",
        problem: "고정 비용과 \n비효율적인 리소스 운영",
        solution: "유연한 비용 구조와\n 리소스 활용"
    },
    {
        id: "reason-2",
        problem: "느린 실행과 \n반복되는 시행착오",
        solution: "빠른 실행과 \n검증된 경험"
    },
    {
        id: "reason-3",
        problem: "기술 중심의 선택으로 인한 \n방향성 혼란",
        solution: "목적에 맞는 \n기술 조합"
    },
    {
        id: "reason-4",
        problem: "조직 확장에 따른 \n리스크 증가",
        solution: "조직 확장 없는 \n리스크 관리"
    },
    
]