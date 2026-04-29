'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useJoinSharedBoard } from '@/hooks/useBoards'

export default function SharedBoardPage() {
  const params = useParams()
  const router = useRouter()
  const shareToken = params.token as string
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const user = useAuthStore((state) => state.user)
  const { mutate: joinBoard, isPending, isSuccess } = useJoinSharedBoard()

  useEffect(() => {
    // If not logged in, redirect to login
    if (!isLoggedIn || !user) {
      router.push(`/login?redirect=/boards/shared/${shareToken}`)
      return
    }

    // If user is logged in and we haven't tried to join yet
    if (!isPending && !isSuccess) {
      joinBoard(shareToken, {
        onSuccess: (response) => {
          // Redirect to the board in their dashboard
          router.push(`/boards/${response.boardId}`)
        },
        onError: (error: any) => {
          console.error('Failed to join board:', error)
          // If join fails and it's auth error, redirect to login
          if (error.response?.status === 401) {
            router.push(`/login?redirect=/boards/shared/${shareToken}`)
          }
        },
      })
    }
  }, [isLoggedIn, user, shareToken, joinBoard, isPending, isSuccess, router])

  // Show loading state
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-[#EE2B24] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[14px] text-[#666]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          {!isLoggedIn || !user ? 'Redirecting to login...' : 'Adding board to your collection...'}
        </p>
      </div>
    </div>
  )
}
