import { Trophy } from "lucide-react";

// 모든 수상 배지 동일 스타일
export function AwardBadge({ award }: Readonly<{ award: string }>) {
    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
            <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
            {award}
        </span>
    );
}
