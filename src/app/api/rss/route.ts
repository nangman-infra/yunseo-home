import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://v2.velog.io/rss/@yxxunseo', {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch RSS: ${response.status}`);
        }

        const xml = await response.text();
        return new NextResponse(xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate'
            }
        });
    } catch (error) {
        console.error("RSS fetch error:", error);
        return new NextResponse('<error>Internal server error</error>', { status: 500 });
    }
}
