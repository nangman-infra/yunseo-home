export type Project = {
    title: string;
    period: string;
    description: string;
    org: string;
    role?: string;
    stack?: string[];
};

// 최신순
export const PROJECTS: Project[] = [
    {
        title: "Mobi:ON",
        period: "2026.06 ~ 2026.09",
        description: "모바일컴퓨팅 연구실 홈페이지와 로그인 기반 연구실 워크스페이스, 데스크톱 트레이 앱",
        org: "MOBICOM 연구실",
        role: "실시간 재실 현황, 업무 보드, 출결 집계, 트레이 알림",
        stack: ["Next.js", "PostgreSQL", "Electron"],
    },
    {
        title: "FreeWay",
        period: "2026.08 ~ 2026.09",
        description: "교통약자를 위한 철도역사 내부 이동 경로 안내 서비스",
        org: "2026 공공데이터 활용 공모전 (국가철도공단)",
        role: "Vercel · Render 배포",
        stack: ["React", "FastAPI", "Docker", "Vercel", "Render"],
    },
    {
        title: "NCP–GCP 멀티클라우드 재해복구(DR)",
        period: "2026.01",
        description: "NCP를 Active, GCP를 Warm Standby로 두고 장애 시 Cloudflare DNS로 트래픽을 넘기는 멀티클라우드 DR 팀 프로젝트",
        org: "네이버클라우드 NCP 특강 (5인 팀)",
        role: "팀원이 맡긴 GCP Standby 리소스를 찾아보고 적용하며 멀티클라우드 DR 구조 학습",
        stack: ["NCP", "GCP", "Terraform", "Kubernetes"],
    },
    {
        title: "온결",
        period: "2025.04 ~ 2025.12",
        description: "구청 담당자가 분기마다 수작업으로 하던 주민 조회 · 세대원 집계 · 엑셀 작성을 자동화한 리빙랩 프로젝트",
        org: "2025 유성 데이터 기반 실증 리빙랩",
        role: "macOS · Windows 자동 감지, 조회 분기 로직, 결과 저장 기능",
        stack: ["Python", "OpenCV", "PyAutoGUI", "pandas"],
    },
    {
        title: "InTheLab",
        period: "2025.09 ~ 2025.12",
        description: "Bluetooth Beacon 기반 연구실 출입 및 출석 관리 앱",
        org: "마이크로프로세서",
        role: "UI/UX 설계, 초기 환경 구성, 로그인 · 회원가입 · 메인 · 알림 화면",
        stack: ["React Native", "Expo", "TypeScript"],
    },
    {
        title: "IEUM",
        period: "2025.09 ~ 2025.12",
        description: "보행자 위험 요소를 고려한 안전 경로 추천 지도 애플리케이션",
        org: "오픈소스SW프로그래밍",
        stack: ["React Native", "Expo", "TypeScript"],
    },
    {
        title: "Medigo",
        period: "2025.10",
        description: "이동 약자를 위한 병원 이동 및 진료 동행 서비스 플랫폼",
        org: "2025 소중한 오픈소스 활용 SW경진대회",
        role: "프론트엔드 — 로그인 · 회원가입, 온보딩, 동행자 인증 흐름",
        stack: ["React Native", "Expo", "TypeScript"],
    },
    {
        title: "소담",
        period: "2025.07 ~ 2025.09",
        description: "소상공인시장진흥공단 공공데이터 기반 상권 분석 및 전략 수립 지원 플랫폼",
        org: "공공데이터 활용 공모전 (소상공인시장진흥공단)",
        role: "팀 대표 · 발표, iOS 앱 전체 화면 구현",
        stack: ["SwiftUI", "MapKit", "KakaoMapsSDK"],
    },
    {
        title: "Timemate",
        period: "2025.08",
        description: "개인 시간표 통합 시각화 기반 그룹 일정 관리 플랫폼",
        org: "크래프톤 정글 웹개발 집중캠프",
        role: "프론트엔드 — 지도, 학사일정 · 급식 API 연동, 반응형 UI",
        stack: ["Flask", "MongoDB", "JavaScript"],
    },
    {
        title: "Legal Guide",
        period: "2025.05",
        description: "근로계약서를 OCR로 인식해 번역하고 법률 요소를 짚어주는 외국인 노동자 지원 앱",
        org: "2025 소중한 SW/AI 경진대회",
        role: "iOS 앱 — 로그인 · 회원가입, 계약서 스캔, 홈 화면",
        stack: ["SwiftUI"],
    },
];
