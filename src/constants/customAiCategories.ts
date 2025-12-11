export type ExampleItem = {
    title: string;
    description: string;
};

export type Category = {
    id: string;
    label: string;
    examples: ExampleItem[];
};

export const CATEGORIES: Category[] = [
    {
        id: "data-business",
        label: "데이터/비즈니스",
        examples: [
            {
                title: "대량 데이터 자동 수집·정제",
                description: "여러 소스의 데이터를 자동으로 모아 정리해, 바로 활용 가능한 형태를 제공합니다."
            },
            {
                title: "비즈니스 지표 예측",
                description: "패턴을 분석해 주요 지표를 예측하고 의사결정에 필요한 인사이트를 제공합니다."
            },
            {
                title: "업무 프로세스 자동화",
                description: "반복 업무를 자동 처리해 효율을 높이고 작업 시간을 줄여줍니다."
            },
        ],
    },
    {
        id: "vision-video",
        label: "비전/영상",
        examples: [
            {
                title: "이미지·영상 품질 보정",
                description: "저해상도나 노이즈가 있는 영상·이미지를 자동으로 개선해 선명한 품질로 복원합니다."
            },
            {
                title: "영상 분석",
                description: "영상 속 주요 장면, 패턴, 이벤트를 자동으로 분석해 필요한 정보를 추출합니다."
            },
            {
                title: "객체/행동 인식",
                description: "사람·사물·행동을 정확하게 인식해 상황 파악과 자동화된 처리에 활용할 수 있습니다."
            },
            {
                title: "자동 자막 생성",
                description: "음성을 분석해 빠르고 정확하게 자막을 생성하며, 편집에 필요한 후처리까지 지원합니다."
            },
        ],
    },
    {
        id: "recommendation",
        label: "추천/개인화",
        examples: [
            {
                title: "개인화 상품 추천 시스템",
                description: "사용자의 구매 기록, 검색 패턴, 관심 카테고리를 분석해 가장 관련성 높은 상품을 자동으로 추천합니다."
            },
            {
                title: "콘텐츠 개인화 추천 엔진",
                description: "이용자의 시청·읽기 습관을 기반으로 선호 콘텐츠를 파악해, 개별 사용자에게 최적화된 콘텐츠를 우선 노출합니다."
            },
            {
                title: "상황·시간대 기반 추천 모델",
                description: "사용자의 시간대, 위치, 사용 맥락을 반영해 상황에 맞는 상품·콘텐츠·기능을 제안합니다."
            },
        ],
    },
    {
        id: "nlp-audio",
        label: "자연어/음성",
        examples: [
            {
                title: "문서 자동 작성·요약",
                description: "긴 문서나 대화 내용을 자동으로 정리해 핵심만 빠르게 파악할 수 있도록 작성·요약합니다."
            },
            {
                title: "상담·QA 챗봇",
                description: "반복되는 문의를 자동으로 응답하며, 필요한 정보를 정확하게 안내하는 상담형 챗봇을 제공합니다."
            },
            {
                title: "음성 인식(STT)·음성 생성(TTS)",
                description: "음성을 텍스트로 전환하거나 자연스러운 음성으로 생성해, 다양한 서비스에서 음성 기반 인터페이스를 구현할 수 있습니다."
            },
        ],
    },
    {
        id: "robotics",
        label: "로보틱스",
        examples: [
            {
                title: "경로 최적화",
                description: "주어진 환경에서 가장 효율적인 이동 경로를 계산해 이동 시간과 비용을 최소화합니다."
            },
            {
                title: "로봇 제어 모델",
                description: "로봇의 움직임과 작업 수행을 안정적으로 제어할 수 있는 모델을 구축해 정밀한 동작을 구현합니다."
            },
            {
                title: "작업 자동화 및 위치 기반 판단 알고리즘",
                description: "로봇이 주변 환경을 파악해 필요한 작업을 자동으로 수행하고, 상황에 맞는 판단을 내릴 수 있도록 지원합니다."
            },
        ]  
    },
    {
        id: "multimodal",
        label: "멀티모달",
        examples: [
            {
                title: "텍스트·이미지·영상 융합 분석",
                description: "여러 형태의 데이터를 함께 분석해, 단일 데이터로는 파악하기 어려운 패턴과 의미를 도출합니다."
            },
            {
                title: "검색·추천 고도화",
                description: "텍스트, 이미지, 영상 정보를 동시에 활용해 더 정확하고 정교한 검색·추천 결과를 제공합니다."
            },
            {
                title: "상황 기반 응답 생성",
                description: "사용자의 입력 유형과 상황을 함께 고려해, 가장 적합한 형태의 응답을 생성합니다."
            },
        ],
    },
    {
        id: "app-web",
        label: "APP/WEB",
        examples: [
            {
                title: "UI 자동 생성",
                description: "요구사항과 디자인 가이드를 기반으로 화면 요소를 자동으로 구성해 개발 속도를 높입니다."
            },
            {
                title: "사용자 행동 분석",
                description: "사용자의 클릭, 이동 경로, 이용 패턴을 분석해 서비스 개선에 필요한 인사이트를 제공합니다."
            },
            {
                title: "서비스 운영 자동화 및 A/B 테스트 최적화",
                description: "운영 작업을 자동화하고, 실험 결과를 분석해 가장 효과적인 서비스 버전을 빠르게 검증합니다."
            },
        ],
    },
    {
        id: "crm-erp",
        label: "CRM/ERP",
        examples: [
            {
                title: "고객 세그먼트 분석",
                description: "고객의 행동과 특성을 기반으로 그룹을 자동 분류해, 타겟 마케팅과 맞춤 전략 수립을 지원합니다."
            },
            {
                title: "판매·수요 예측",
                description: "과거 데이터와 패턴을 분석해 향후 매출과 수요를 예측하고, 재고·생산 계획을 효율적으로 세울 수 있도록 돕습니다.",
            },
            {
                title: "재고·운영 자동화 및 의사결정 보조",
                description: "재고 관리와 운영 업무를 자동화하고, 의사결정에 필요한 핵심 지표를 실시간으로 제공합니다."
            }
        ]
    }
];