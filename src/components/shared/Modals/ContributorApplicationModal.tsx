'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Loader2, Check } from 'lucide-react'
import { ModalBackdrop } from './ModalBackdrop'
import { ErrorModal } from './ErrorModal'
import { useAuthStore } from '@/stores/authStore'
import { useApplyContributor } from '@/hooks/useContributor'
import type { ApplicationStep } from '@/types'
import { SPECIALTIES } from '@/lib/mock/marketing'

interface ContributorApplicationModalProps {
  onClose: () => void
}

export function ContributorApplicationModal({ onClose }: ContributorApplicationModalProps) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const { mutate: applyContributor, isPending, error } = useApplyContributor()
  const [step, setStep] = useState<ApplicationStep>('form')
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    country: 'NG',
    instagram: '',
    portfolioUrl: '',
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
    
    if (!user?.email) {
      setErrorMessage('Please log in to apply as a contributor')
      return
    }

    if (formData.bio.length < 50) {
      setErrorMessage('Bio must be at least 50 characters long')
      return
    }

    if (!formData.location.trim()) {
      setErrorMessage('Please enter your city/location')
      return
    }

    if (!formData.country) {
      setErrorMessage('Please select your country')
      return
    }

    if (selectedSpecialties.length < 2) {
      setErrorMessage('Please select at least 2 specialties')
      return
    }
    
    setStep('uploading')
    
    applyContributor(
      {
        email: user.email,
        bio: formData.bio.trim(),
        location: formData.location.trim(),
        country: formData.country,
        specialties: selectedSpecialties,
        portfolioUrl: formData.portfolioUrl.trim() || undefined,
        instagram: formData.instagram.trim() || undefined,
      },
      {
        onSuccess: () => {
          setStep('success')
        },
        onError: (error: any) => {
          setStep('form')
          console.error('Full error object:', error)
          console.error('Error response:', error.response)
          console.error('Error data:', error.response?.data)
          console.error('Error message:', error.message)
          
          const errorMsg = error.response?.data?.message || 
                          error.message ||
                          (Array.isArray(error.response?.data?.message) 
                            ? error.response?.data?.message.join(', ') 
                            : 'Failed to submit application. Please try again.')
          setErrorMessage(errorMsg)
        },
      }
    )
  }

  const handleSuccess = () => {
    onClose()
    // User needs to verify email before accessing dashboard
    router.push('/') // Redirect to home with message to check email
  }

  // Show error modal
  if (errorMessage) {
    return (
      <ErrorModal
        title="Application Failed"
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    )
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
            Application Submitted!
          </h2>
          
          <p
            className="text-[14px] text-[#666] mb-6"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Please check your email to verify your account. Once verified, you'll be able to start uploading and earning!
          </p>

          <button
            onClick={handleSuccess}
            className="w-full py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Got it!
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
              minLength={50}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Share your photography background, experience, and what makes your work unique... (minimum 50 characters)"
              rows={4}
              className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] focus:outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] resize-none"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
            <p className="text-[11px] text-[#888] mt-1">{formData.bio.length}/50 characters minimum</p>
          </div>

          {/* Location & Country */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-[13px] font-semibold text-[#111] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                City/Location <span className="text-[#EE2B24]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Lagos"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] focus:outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
            </div>
            <div>
              <label
                className="block text-[13px] font-semibold text-[#111] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Country <span className="text-[#EE2B24]">*</span>
              </label>
              <select
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-xl text-[13.5px] text-[#111] focus:outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <option value="">Select country</option>
                <option value="DZ">🇩🇿 Algeria</option>
                <option value="AO">🇦🇴 Angola</option>
                <option value="BJ">🇧🇯 Benin</option>
                <option value="BW">🇧🇼 Botswana</option>
                <option value="BF">🇧🇫 Burkina Faso</option>
                <option value="BI">🇧🇮 Burundi</option>
                <option value="CM">🇨🇲 Cameroon</option>
                <option value="CV">🇨🇻 Cape Verde</option>
                <option value="CF">🇨🇫 Central African Republic</option>
                <option value="TD">🇹🇩 Chad</option>
                <option value="KM">🇰🇲 Comoros</option>
                <option value="CG">🇨🇬 Congo</option>
                <option value="CD">🇨🇩 Congo (DRC)</option>
                <option value="CI">🇨🇮 Côte d'Ivoire</option>
                <option value="DJ">🇩🇯 Djibouti</option>
                <option value="EG">🇪🇬 Egypt</option>
                <option value="GQ">🇬🇶 Equatorial Guinea</option>
                <option value="ER">🇪🇷 Eritrea</option>
                <option value="SZ">🇸🇿 Eswatini</option>
                <option value="ET">🇪🇹 Ethiopia</option>
                <option value="GA">🇬🇦 Gabon</option>
                <option value="GM">🇬🇲 Gambia</option>
                <option value="GH">🇬🇭 Ghana</option>
                <option value="GN">🇬🇳 Guinea</option>
                <option value="GW">🇬🇼 Guinea-Bissau</option>
                <option value="KE">🇰🇪 Kenya</option>
                <option value="LS">🇱🇸 Lesotho</option>
                <option value="LR">🇱🇷 Liberia</option>
                <option value="LY">🇱🇾 Libya</option>
                <option value="MG">🇲🇬 Madagascar</option>
                <option value="MW">🇲🇼 Malawi</option>
                <option value="ML">🇲🇱 Mali</option>
                <option value="MR">🇲🇷 Mauritania</option>
                <option value="MU">🇲🇺 Mauritius</option>
                <option value="MA">🇲🇦 Morocco</option>
                <option value="MZ">🇲🇿 Mozambique</option>
                <option value="NA">🇳🇦 Namibia</option>
                <option value="NE">🇳🇪 Niger</option>
                <option value="NG">🇳🇬 Nigeria</option>
                <option value="RW">🇷🇼 Rwanda</option>
                <option value="ST">🇸🇹 São Tomé and Príncipe</option>
                <option value="SN">🇸🇳 Senegal</option>
                <option value="SC">🇸🇨 Seychelles</option>
                <option value="SL">🇸🇱 Sierra Leone</option>
                <option value="SO">🇸🇴 Somalia</option>
                <option value="ZA">🇿🇦 South Africa</option>
                <option value="SS">🇸🇸 South Sudan</option>
                <option value="SD">🇸🇩 Sudan</option>
                <option value="TZ">🇹🇿 Tanzania</option>
                <option value="TG">🇹🇬 Togo</option>
                <option value="TN">🇹🇳 Tunisia</option>
                <option value="UG">🇺🇬 Uganda</option>
                <option value="ZM">🇿🇲 Zambia</option>
                <option value="ZW">🇿🇼 Zimbabwe</option>
              </select>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-6">
            <label
              className="block text-[13px] font-semibold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Your specialties <span className="text-[#EE2B24]">*</span> <span className="text-[#888]">(select 2-5)</span>
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
            {selectedSpecialties.length > 0 && selectedSpecialties.length < 2 && (
              <p className="text-[11px] text-[#EE2B24] mt-1">Please select at least 2 specialties</p>
            )}
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
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
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
            disabled={formData.bio.length < 50 || selectedSpecialties.length < 2 || !formData.location || !formData.country}
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
