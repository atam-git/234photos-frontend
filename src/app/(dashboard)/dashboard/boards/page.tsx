'use client'

import { useState } from 'react'
import { Plus, Lock, Users, MoreHorizontal } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import Link from 'next/link'

const BOARDS = [
  { id: '1', name: 'Campaign Q3 2024', count: 24, type: 'shared' as const, updatedAt: '2 hours ago', thumbnails: MOCK_ASSETS.slice(0, 3).map(a => a.src) },
  { id: '2', name: 'Brand Assets', count: 12, type: 'private' as const, updatedAt: 'Yesterday', thumbnails: MOCK_ASSETS.slice(3, 6).map(a => a.src) },
  { id: '3', name: 'Inspiration', count: 47, type: 'private' as const, updatedAt: '3 days ago', thumbnails: MOCK_ASSETS.slice(6, 9).map(a => a.src) },
  { id: '4', name: 'Team Collection', count: 8, type: 'team' as const, updatedAt: 'Last week', thumbnails: MOCK_ASSETS.slice(9, 12).map(a => a.src) },
]

export default function BoardsPage() {
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')

  return (
    <div className="max-w-[900px] mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Boards
          </h1>
          <p className="text-[13px] text-[#888] mt-0.5"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Organise and share your saved assets
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#111] text-white text-[13px] font-semibold rounded-full hover:bg-[#333] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          <Plus className="w-4 h-4" /> New board
        </button>
      </div>

      {/* Create board inline */}
      {creating && (
        <div className="bg-white rounded-2xl border border-[#E0E0E0] p-5 flex items-center gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Board name…"
            autoFocus
            className="flex-1 h-10 px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] outline-none focus:border-[#111] transition-colors"
          />
          <button
            onClick={() => { setCreating(false); setNewName('') }}
            className="px-4 py-2 bg-[#111] text-white text-[13px] font-semibold rounded-xl hover:bg-[#333] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Create
          </button>
          <button
            onClick={() => setCreating(false)}
            className="px-4 py-2 text-[#666] text-[13px] font-medium hover:text-[#111] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Cancel
          </button>
        </div>
      )}

      {/* Board grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BOARDS.map((board) => (
          <div key={board.id} className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden group hover:shadow-md transition-shadow">
            {/* Mosaic thumbnails */}
            <div className="flex gap-0.5 h-[140px]">
              <div className="flex-[2] overflow-hidden">
                <img src={board.thumbnails[0]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                <div className="flex-1 overflow-hidden">
                  <img src={board.thumbnails[1]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <img src={board.thumbnails[2]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="px-4 py-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  {board.type === 'private' && <Lock className="w-3 h-3 text-[#888]" />}
                  {board.type === 'shared' && <Users className="w-3 h-3 text-[#888]" />}
                  {board.type === 'team' && <Users className="w-3 h-3 text-[#EE2B24]" />}
                  <p className="text-[13.5px] font-bold text-[#111]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {board.name}
                  </p>
                </div>
                <p className="text-[11.5px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {board.count} assets · Updated {board.updatedAt}
                </p>
              </div>
              <button className="w-7 h-7 rounded-full hover:bg-[#F5F5F7] flex items-center justify-center transition-colors">
                <MoreHorizontal className="w-4 h-4 text-[#888]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
