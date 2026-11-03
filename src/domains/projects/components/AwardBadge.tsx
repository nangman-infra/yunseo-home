// 모든 수상 표시 동일 스타일
export function AwardBadge({ award }: Readonly<{ award: string }>) {
    return <span className="text-xs font-medium text-slate-400 whitespace-nowrap">{award}</span>;
}
