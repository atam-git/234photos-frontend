'use client'

import { useState } from 'react'
import { X, Mail, UserPlus, Trash2, Crown, Edit, Eye } from 'lucide-react'
import type { BoardCollaborator } from '@/types'

interface ManageCollaboratorsModalProps {
  boardName: string
  collaborators: BoardCollaborator[]
  onClose: () => void
}

const MOCK_COLLABORATORS: BoardCollaborator[] = [
  { 
    userId: '1', 
    user: { 
      id: '1', 
      email: 'john@example.com', 
      name: 'John Doe', 
      username: 'johndoe',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      role: 'customer',
      credits: 0,
      joinedYear: 2024,
      isContributorApproved: false,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    role: 'admin',
    addedAt: '2024-01-15'
  },
  { 
    userId: '2', 
    user: { 
      id: '2', 
      email: 'jane@example.com', 
      name: 'Jane Smith', 
      username: 'janesmith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      role: 'customer',
      credits: 0,
      joinedYear: 2024,
      isContributorApproved: false,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    role: 'editor',
    addedAt: '2024-02-01'
  },
  { 
    userId: '3', 
    user: { 
      id: '3', 
      email: 'mike@example.com', 
      name: 'Mike Johnson', 
      username: 'mikejohnson',
      role: 'customer',
      credits: 0,
      joinedYear: 2024,
      isContributorApproved: false,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    role: 'viewer',
    addedAt: '2024-03-01'
  },
]

export function ManageCollaboratorsModal({ boardName, collaborators = MOCK_COLLABORATORS, onClose }: ManageCollaboratorsModalProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'viewer' | 'editor'>('editor')

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Invite:', { email, role })
    setEmail('')
  }

  const handleRemove = (collaboratorId: string, collaboratorName: string) => {
    if (confirm(`Remove ${collaboratorName} from this board?`)) {
      console.log('Remove collaborator:', collaboratorId)
    }
  }

  const handleChangeRole = (collaboratorId: string, newRole: 'viewer' | 'editor' | 'admin') => {
    console.log('Change role:', { collaboratorId, newRole })
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-3.5 h-3.5 text-[#EE2B24]" />
      case 'editor': return <Edit className="w-3.5 h-3.5 text-[#888]" />
      case 'viewer': return <Eye className="w-3.5 h-3.5 text-[#888]" />
      default: return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-[520px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <div>
            <h2 className="text-[16px] font-bold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Manage Collaborators
            </h2>
            <p className="text-[12px] text-[#888] mt-0.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {boardName}
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#F5F5F7] transition-colors">
            <X className="w-5 h-5 text-[#888]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 flex flex-col gap-5">
            {/* Invite form */}
            <form onSubmit={handleInvite} className="p-4 bg-[#F8F8F8] rounded-xl">
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <UserPlus className="w-3.5 h-3.5 inline mr-1" />
                Invite People
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@example.com"
                  className="flex-1 h-[40px] px-3 border border-[#D0D0D0] rounded-lg text-[13px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'viewer' | 'editor')}
                  className="h-[40px] px-3 border border-[#D0D0D0] rounded-lg text-[13px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <option value="editor">Can edit</option>
                  <option value="viewer">Can view</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={!email.trim()}
                className="w-full h-[36px] bg-[#EE2B24] text-white text-[13px] font-semibold rounded-lg hover:bg-[#d42520] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <Mail className="w-4 h-4" />
                Send Invite
              </button>
            </form>

            {/* Collaborators list */}
            <div>
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-3"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Collaborators ({collaborators.length})
              </label>
              <div className="flex flex-col gap-2">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.userId} className="flex items-center gap-3 p-3 bg-white border border-[#F0F0F0] rounded-xl hover:border-[#D0D0D0] transition-colors">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#E8E8E8] shrink-0">
                      {collaborator.user.avatar ? (
                        <img src={collaborator.user.avatar} alt={collaborator.user.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#EE2B24] flex items-center justify-center">
                          <span className="text-white text-[14px] font-bold">
                            {collaborator.user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#111] truncate"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {collaborator.user.name}
                      </p>
                      <p className="text-[11.5px] text-[#888] truncate"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {collaborator.user.email}
                      </p>
                    </div>

                    {/* Role selector */}
                    <select
                      value={collaborator.role}
                      onChange={(e) => handleChangeRole(collaborator.userId, e.target.value as any)}
                      disabled={collaborator.role === 'admin'}
                      className="h-[32px] px-2 pr-7 border border-[#D0D0D0] rounded-lg text-[12px] text-[#111] outline-none focus:border-[#111] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>

                    {/* Remove button */}
                    {collaborator.role !== 'admin' && (
                      <button
                        onClick={() => handleRemove(collaborator.userId, collaborator.user.name)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors"
                        title="Remove">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Role descriptions */}
            <div className="p-4 bg-[#F8F8F8] rounded-xl">
              <p className="text-[11px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Permissions
              </p>
              <div className="flex flex-col gap-1.5 text-[11.5px] text-[#666]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <div className="flex items-start gap-2">
                  <Crown className="w-3.5 h-3.5 text-[#EE2B24] shrink-0 mt-0.5" />
                  <span><strong>Admin:</strong> Full access, can manage collaborators</span>
                </div>
                <div className="flex items-start gap-2">
                  <Edit className="w-3.5 h-3.5 text-[#888] shrink-0 mt-0.5" />
                  <span><strong>Editor:</strong> Can add and remove assets</span>
                </div>
                <div className="flex items-start gap-2">
                  <Eye className="w-3.5 h-3.5 text-[#888] shrink-0 mt-0.5" />
                  <span><strong>Viewer:</strong> Can only view assets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
