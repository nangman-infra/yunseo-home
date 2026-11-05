// 페이지 전체 뒤에 깔리는 은은한 오로라 그라데이션. 큰 색 번짐 몇 개가 아주 천천히 흐른다.
const BLOBS = [
    "aurora-blob left-[-15%] top-[5%] h-[60vh] w-[60vw] bg-[radial-gradient(closest-side,rgba(45,212,191,0.16),transparent)] [animation-duration:38s]",
    "aurora-blob right-[-20%] top-[25%] h-[70vh] w-[65vw] bg-[radial-gradient(closest-side,rgba(99,102,241,0.18),transparent)] [animation-duration:46s] [animation-delay:-12s]",
    "aurora-blob left-[10%] bottom-[-20%] h-[65vh] w-[70vw] bg-[radial-gradient(closest-side,rgba(168,85,247,0.12),transparent)] [animation-duration:52s] [animation-delay:-24s]",
    "aurora-blob right-[5%] bottom-[10%] h-[45vh] w-[45vw] bg-[radial-gradient(closest-side,rgba(56,189,248,0.10),transparent)] [animation-duration:42s] [animation-delay:-6s]",
];

export function AuroraBackground() {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {BLOBS.map((className) => (
                <div key={className} className={className} />
            ))}
        </div>
    );
}
