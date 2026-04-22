'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Loader2, Check } from 'lucide-react'
import { ModalBackdrop } from './ModalBackdrop'
import { useAuthStore } from '@/stores/authStore'

interface ContributorApplicationModalProps {
  onClose: () => void
}

type ApplicationStep = 'form' | 'uploading' | 'success'

const SPECIALTIES = [
  'Business', 'Fashion', 'Food & Cuisine', 'Nature', 'Sports', 
  'Technology', 'Culture', 'Architecture', 'Lifestyle', 'Music',
  'Portrait', 'Street', 'Documentary', 'Editorial'
]

export function ContributorApplicationModal({ onClose }: ContributorApplicationModalProps) {
  const router = useRouter()
  const switchToContributor = useAuthStore((state) => state.switchToContributor)
  const [step, setStep] = useState<ApplicationStep>('form')
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['Business', 'Lifestyle', 'Portrait'])
  const [formData, setFormData] = useState({
    bio: 'Professional photographer based in Lagos, Nigeria with over 8 years of experience capturing authentic African stories through my lens. I specialize in documentary and lifestyle photography, focusing on everyday moments that showcase the vibrant culture and diversity of African communities.',
    instagram: 'https://instagram.com/photographer',
    website: 'https://myportfolio.com',
  })

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep('uploading')
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Switch to contributor user
    switchToContributor()
    
    setStep('success')
  }

  const handleSuccess = () => {
    onClose()
    // Redirect to contributor dashboard
    router.push('/dashboard')
  }

  if (step === 'success') {
    return (
      <ModalBackdrop onClose={onClose}>
        <div
          className="relative bg-white rounded-2xl w-full max-w-md p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          
          <h2
            className="text-[22px] font-bold text-[#111] mb-2"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Welcome, Contributor!
          </h2>
          
          <p
            className="text-[14px] text-[#666] mb-6"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            You're now a contributor! Start uploading your photos and earning royalties.
          </p>

          <button
            onClick={handleSuccess}
            className="w-full py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Go to Dashboard
          </button>
        </div>
      </ModalBackdrop>
    )
  }

  if (step === 'uploading') {
    return (
      <ModalBackdrop onClose={() => {}}>
        <div
          className="relative bg-white rounded-2xl w-full max-w-md p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Loader2 className="w-12 h-12 text-[#EE2B24] animate-spin mx-auto mb-4" />
          
          <h2
            className="text-[18px] font-bold text-[#111] mb-2"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Submitting your application...
          </h2>
          
          <p
            className="text-[13px] text-[#666]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Please wait while we process your portfolio
          </p>
        </div>
      </ModalBackdrop>
    )
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#F0F0F0] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2
              className="text-[20px] font-bold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Become a Contributor
            </h2>
            <p
              className="text-[13px] text-[#666] mt-0.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Share your work and start earning royalties
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-[#666]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          
          {/* Bio */}
          <div className="mb-6">
            <label
              className="block text-[13px] font-semibold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Tell us about yourself <span className="text-[#EE2B24]">*</span>
            </label>
            <textarea
              required
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Share your photography background, experience, and what makes your work unique..."
              rows={4}
              className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] focus:outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] resize-none"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
          </div>

          {/* Specialties */}
          <div className="mb-6">
            <label
              className="block text-[13px] font-semibold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Your specialties <span className="text-[#888]">(select up to 5)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES.map((specialty) => (
                <button
                  key={specialty}
                  type="button"
                  onClick={() => toggleSpecialty(specialty)}
                  disabled={!selectedSpecialties.includes(specialty) && selectedSpecialties.length >= 5}
                  className={`px-4 py-2 rounded-full text-[12.5px] font-semibold transition-all ${
                    selectedSpecialties.includes(specialty)
                      ? 'bg-[#EE2B24] text-white'
                      : 'bg-[#F5F5F5] text-[#666] hover:bg-[#EBEBEB] disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-6">
            <label
              className="block text-[13px] font-semibold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Social media <span className="text-[#888]">(optional)</span>
            </label>
            <div className="space-y-3">
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="Instagram profile URL"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] focus:outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="Portfolio website URL"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] focus:outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
            </div>
          </div>

          {/* Terms */}
          <div className="mb-6 p-4 bg-[#F5F5F5] rounded-xl">
            <p
              className="text-[12px] text-[#666] leading-relaxed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              By submitting this application, you agree to our{' '}
              <a href="/terms" className="text-[#EE2B24] hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/licence" className="text-[#EE2B24] hover:underline">Contributor Agreement</a>.
              You confirm that you own the rights to all submitted photos.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!formData.bio || selectedSpecialties.length === 0}
            className="w-full py-3.5 bg-[#EE2B24] text-white text-[14px] font-bold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Submit Application
          </button>
        </form>
      </div>
    </ModalBackdrop>
  )
}
