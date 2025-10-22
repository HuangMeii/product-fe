"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
    page: number
    pages: number
}

export function Pagination({ page, pages }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const goto = (p: number) => {
        const params = new URLSearchParams(searchParams.toString())
        if (p <= 1) params.delete('page')
        else params.set('page', String(p))
        router.push(`${window.location.pathname}?${params.toString()}`)
    }

    if (pages <= 1) return null

    const items: (number | '...')[] = []
    const start = Math.max(1, page - 2)
    const end = Math.min(pages, page + 2)

    if (start > 1) items.push(1, '...')
    for (let i = start; i <= end; i++) items.push(i)
    if (end < pages) items.push('...', pages)

    return (
        <div className="mt-8 flex items-center justify-center gap-2">
            <button
                onClick={() => goto(page - 1)}
                disabled={page <= 1}
                className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            >Prev</button>

            {items.map((it, idx) => (
                <React.Fragment key={idx}>
                    {it === '...' ? (
                        <span className="px-3 py-1">...</span>
                    ) : (
                        <button
                            onClick={() => goto(it as number)}
                            className={`px-3 py-1 rounded border ${it === page ? 'bg-black text-white' : 'bg-white'}`}
                        >{it}</button>
                    )}
                </React.Fragment>
            ))}

            <button
                onClick={() => goto(page + 1)}
                disabled={page >= pages}
                className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            >Next</button>
        </div>
    )
}
