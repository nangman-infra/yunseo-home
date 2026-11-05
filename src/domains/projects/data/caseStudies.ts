export type Diagram = {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
};

export type StackGroup = {
    label: string;
    items: string[];
};

export type CaseSection = {
    title: string;
    diagrams?: Diagram[];
    items: string[];
};

export type RoleItem = { label: string; detail: string };

export type CaseStudy = {
    slug: string;
    title: string;
    subtitle: string;
    period: string;
    org: string;
    team?: string;
    award?: string;
    roleSummary: string;
    role: RoleItem[];
    highlights: string[];
    stack: StackGroup[];
    sections: CaseSection[];
};

export const CASE_STUDIES: CaseStudy[] = [
    {
        slug: "ncp-guestbook-3tier",
        title: "방명록 서비스 NCP 3-Tier 구축",
        subtitle: "WEB · WAS · DB를 나누고 이중화해, 서버 1대가 죽어도 끊기지 않는 서비스를 Terraform으로 구축",
        period: "2026.01 ~ 2026.02",
        org: "클라우드스퀘어 인턴십 1차 과제",
        team: "개인 과제",
        roleSummary: "아키텍처 설계부터 Terraform 코드화, CI/CD, 장애 검증, 발표까지 전 과정",
        role: [
            {
                label: "아키텍처 설계",
                detail: "WEB · WAS · DB를 Public / Private Subnet으로 나누고, WEB · WAS를 각 2대로 이중화한 뒤 외부 · 내부 Load Balancer와 Auto Scaling을 붙이는 구조를 설계",
            },
            {
                label: "보안",
                detail: "DB를 Private Subnet에 격리하고 ACG로 필요한 포트 · 출처만 허용해 외부에서 직접 접근할 수 없게 구성",
            },
            {
                label: "IaC",
                detail: "VPC, Subnet 6개, NAT, Load Balancer, ACG 등 리소스 42개를 Terraform 코드로 작성",
            },
            {
                label: "CI/CD",
                detail: "GitHub Actions로 main 브랜치에 push하면 Bastion을 거쳐 Private 서버까지 자동 배포되는 파이프라인 구성",
            },
            {
                label: "성능 측정",
                detail: "Object Storage 앞에 Global CDN을 적용하고, 동시 50명 · 총 500회 요청으로 전후를 비교해 처리량 +11%, 평균 응답 138 → 124ms 확인",
            },
            {
                label: "모니터링 · 장애 검증",
                detail: "Grafana · Slack · Email 알림을 연결하고, CPU 100% 부하 · 서버 장애 · 파일 삭제를 직접 일으켜 Auto Scaling, 자동 절체, 백업 복원이 동작하는지 확인",
            },
            {
                label: "발표",
                detail: "설계 근거, 측정 결과, 장애 검증 과정을 정리해 발표",
            },
        ],
        highlights: ["처리량 +11% (Global CDN)", "리소스 42개 Terraform", "서버 1대 장애 무중단"],
        stack: [
            { label: "NCP", items: ["VPC", "Application Load Balancer", "Auto Scaling", "Cloud DB for PostgreSQL", "Object Storage", "Global CDN", "KMS", "NAT Gateway", "ACG"] },
            { label: "IaC · CI/CD", items: ["Terraform", "GitHub Actions"] },
            { label: "운영", items: ["Cloud Insight", "Web Service Monitoring System", "Grafana", "Prometheus", "Backup", "Slack Webhook"] },
        ],
        sections: [
            {
                title: "아키텍처",
                diagrams: [
                    {
                        src: "/projects/cloudsquare-guestbook.png",
                        alt: "NCP 방명록 서비스 3-Tier 아키텍처: 외부 ALB, WEB 2대, 내부 ALB, WAS 2대, Cloud DB for PostgreSQL, Bastion, Global CDN, Object Storage",
                        caption: "외부·내부 ALB 뒤에 WEB·WAS 각 2대, 정적 파일은 Object Storage + Global CDN",
                        width: 2400,
                        height: 1325,
                    },
                ],
                items: [
                    "WEB · WAS를 각 2대로 이중화하고 외부 · 내부 Load Balancer와 Auto Scaling을 붙여, 서버 1대가 죽어도 서비스가 끊기지 않게 했다.",
                    "DB는 Private Subnet에 두고 ACG로 필요한 포트 · 출처만 열어 외부에서 직접 접근할 수 없게 했다.",
                    "VPC, Subnet 6개, NAT, LB, ACG 등 리소스 42개를 Terraform으로 코드화했다.",
                    "GitHub Actions로 main 브랜치 push 시 Bastion을 거쳐 Private 서버까지 자동 배포되도록 구성했다.",
                ],
            },
            {
                title: "Global CDN 적용 효과 측정",
                items: [
                    "이미지 요청이 WEB 서버와 스토리지에 몰리는 것을 줄이려고 Object Storage 앞에 Global CDN을 붙였다.",
                    "동시 50명 · 총 500회 요청으로 적용 전후를 비교해 처리량 360 → 400 req/s(+11%), 평균 응답 138 → 124ms를 확인했다.",
                ],
            },
            {
                title: "장애 시나리오 검증",
                items: [
                    "CPU 100% 부하 → Auto Scaling으로 서버 증설, Grafana가 감지해 Slack · Email 알림 발송",
                    "서버 장애 → Load Balancer가 남은 서버로 자동 절체",
                    "파일 삭제 → Backup(일 증분 + 주간 전체)에서 특정 파일 복원",
                ],
            },
        ],
    },
    {
        slug: "geopark-architecture",
        title: "지질공원 통합관리시스템 아키텍처 설계",
        subtitle: "나라장터 과업지시서의 보안 · 운영 요건과 예산 사이에서 균형을 잡은 NCP 3-Tier 설계",
        period: "2026.02",
        org: "클라우드스퀘어 인턴십 2차 과제",
        team: "개인 과제",
        roleSummary: "과업지시서 요건 분석, 아키텍처 설계, 구축 · 시연",
        role: [
            {
                label: "요구사항 분석",
                detail: "국립공원공단 과업지시서에서 서버 사양과 보안 · 운영 요건(웹 방화벽, 서버 백신, ACG, SSL VPN, 모니터링, 로그 분석, 계정 관리 · 감시, 리소스 관리)을 뽑아 NCP 서비스에 대응",
            },
            {
                label: "과제용 아키텍처",
                detail: "WEB을 KR1 · KR2 두 Zone에 이중화하고 WAS · DB를 Private Subnet에 격리, 관리자 접근은 SSL VPN으로 받는 구조를 예산 기준에 맞춰 설계",
            },
            {
                label: "실무용 아키텍처",
                detail: "같은 요건을 실제 기관에 적용한다고 보고 WAF 서버 계층, 기관용 IPsec VPN, Certificate Manager를 더한 안을 따로 설계",
            },
            {
                label: "운영 구성",
                detail: "NAS · Object Storage 스토리지와 Cloud Insight · Cloud Log Analytics · Backup · Cloud Activity Tracer · Sub Account · Resource Manager로 운영 · 감사 체계 구성",
            },
            {
                label: "구축 · 시연",
                detail: "과제용 구성을 직접 구축하고 WEB 서버 1대를 내려 Load Balancer가 남은 서버로 넘기는 것을 시연",
            },
        ],
        highlights: ["Multi-Zone 이중화", "보안 · 관리 서비스 요건 반영", "WEB 장애 무중단 시연"],
        stack: [
            { label: "NCP", items: ["VPC", "Application Load Balancer", "NAT Gateway", "SSL VPN", "NAS", "Object Storage", "MySQL"] },
            { label: "보안", items: ["ACG", "Basic Security", "Anti-Virus", "WAF", "Certificate Manager"] },
            { label: "관리 · 운영", items: ["Cloud Insight", "Cloud Log Analytics", "Backup", "Sub Account", "Cloud Activity Tracer", "Resource Manager"] },
        ],
        sections: [
            {
                title: "요구사항",
                items: [
                    "국립공원공단 「지질공원 통합관리시스템 디지털 서비스 용역」 과업지시서를 실제 고객 요구사항으로 가정했다.",
                    "서버 사양(WEB · WAS · DB)과 함께 웹 방화벽, 서버 백신, 방화벽(ACG), SSL VPN, 모니터링, 로그 분석, 계정 관리 · 감시, 리소스 관리가 요건으로 명시되어 있었다.",
                    "Private Subnet 격리, ACG 최소 권한, 소산 백업을 보안 · 운영 기준으로 잡았다.",
                ],
            },
            {
                title: "아키텍처 — 과제용과 실무용",
                diagrams: [
                    {
                        src: "/projects/cloudsquare-geopark-basic.png",
                        alt: "지질공원 통합관리시스템 과제용 아키텍처: KR1/KR2 Zone 이중화 WEB, Private WAS·DB, SSL VPN, Basic Security, Anti-Virus",
                        caption: "과제용 — 과업지시서 요건과 예산 기준",
                        width: 2400,
                        height: 1257,
                    },
                    {
                        src: "/projects/cloudsquare-geopark-production.png",
                        alt: "지질공원 통합관리시스템 실무용 아키텍처: WAF 서버 계층, IPsec VPN, Certificate Manager 추가",
                        caption: "실무용 — WAF 계층, 기관 IPsec VPN, 인증서 관리 추가",
                        width: 2400,
                        height: 1257,
                    },
                ],
                items: [
                    "WEB은 KR1 · KR2 두 Zone에 나눠 두고, WAS · DB는 Private Subnet에 격리했다. 관리자 접근은 SSL VPN으로 받는다.",
                    "실무용 안에는 WAF 서버 계층, 기관용 IPsec VPN, Certificate Manager를 더했다.",
                    "스토리지는 NAS와 Object Storage, 운영은 Cloud Insight · Cloud Log Analytics · Backup · Cloud Activity Tracer로 구성했다.",
                ],
            },
            {
                title: "검증",
                items: ["WEB 서버 1대를 내려도 Load Balancer가 남은 서버로 넘겨 서비스가 정상 동작하는 것을 시연으로 확인했다."],
            },
            {
                title: "배운 것",
                items: [
                    "처음에는 정해진 요건대로 만들면 되는 단순한 일로 보였지만, 예산과 요구사항 사이에서 어디까지 넣을지 정하는 것이 실무의 고민이라는 걸 알게 됐다.",
                ],
            },
        ],
    },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
    return CASE_STUDIES.find((study) => study.slug === slug);
}
