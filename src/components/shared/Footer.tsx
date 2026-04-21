import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-black">
      {/* Main footer content */}
      <div className="max-w-[1280px] mx-auto px-6 pt-14 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_1fr_1fr_1fr] gap-8 md:gap-8 pb-10">

          {/* Brand Column */}
          <div className="flex flex-col gap-[18px] pr-0 md:pr-4">
            {/* Logo */}
            <Link href="/" aria-label="234photos — Home" className="flex items-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/0fb0245de4d3a7d59f87d46b2525503f700a0207?width=180"
                alt="234photos"
                className="h-[30px] w-auto opacity-[0.92]"
              />
            </Link>

            {/* Tagline */}
            <p className="text-[#555] text-[13px] font-normal leading-[165%]">
              Africa's premier creative asset library — built for African creators, brands and businesses.
            </p>

            {/* Social Icons */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-[8px]">
                {/* Instagram */}
                <a href="#" aria-label="Instagram" className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#1A1A1A] hover:bg-[#2a2a2a] transition-colors flex-shrink-0">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0417 1.41663H4.95841C3.00241 1.41663 1.41675 3.00228 1.41675 4.95829V12.0416C1.41675 13.9976 3.00241 15.5833 4.95841 15.5833H12.0417C13.9978 15.5833 15.5834 13.9976 15.5834 12.0416V4.95829C15.5834 3.00228 13.9978 1.41663 12.0417 1.41663Z" stroke="#666666" strokeWidth="1.41667"/>
                    <path d="M8.50008 11.3333C10.0649 11.3333 11.3334 10.0648 11.3334 8.49996C11.3334 6.93515 10.0649 5.66663 8.50008 5.66663C6.93527 5.66663 5.66675 6.93515 5.66675 8.49996C5.66675 10.0648 6.93527 11.3333 8.50008 11.3333Z" stroke="#666666" strokeWidth="1.41667"/>
                    <path d="M12.3959 4.95833C12.5915 4.95833 12.7501 4.79977 12.7501 4.60417C12.7501 4.40857 12.5915 4.25 12.3959 4.25C12.2003 4.25 12.0417 4.40857 12.0417 4.60417C12.0417 4.79977 12.2003 4.95833 12.3959 4.95833Z" fill="#666666" stroke="#666666" strokeWidth="1.41667"/>
                  </svg>
                </a>
                {/* Twitter / X */}
                <a href="#" aria-label="Twitter / X" className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#1A1A1A] hover:bg-[#2a2a2a] transition-colors flex-shrink-0">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9228 1.59375H15.2659L10.1468 7.44458L16.1691 15.4062H11.4537L7.76043 10.5775L3.53452 15.4062H1.18993L6.66535 9.14812L0.888184 1.59375H5.72327L9.06164 6.00737L12.9228 1.59375ZM12.1004 14.0037H13.3988L5.01777 2.92258H3.62448L12.1004 14.0037Z" fill="#666666"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#1A1A1A] hover:bg-[#2a2a2a] transition-colors flex-shrink-0">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7499 1.41663H10.6249C9.68561 1.41663 8.78477 1.78976 8.12058 2.45396C7.45639 3.11815 7.08325 4.01898 7.08325 4.95829V7.08329H4.95825V9.91663H7.08325V15.5833H9.91659V9.91663H12.0416L12.7499 7.08329H9.91659V4.95829C9.91659 4.77043 9.99121 4.59026 10.1241 4.45743C10.2569 4.32459 10.4371 4.24996 10.6249 4.24996H12.7499V1.41663Z" fill="#666666"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" aria-label="LinkedIn" className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#1A1A1A] hover:bg-[#2a2a2a] transition-colors flex-shrink-0">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.3333 5.66663C12.4604 5.66663 13.5414 6.11439 14.3385 6.91142C15.1355 7.70845 15.5833 8.78946 15.5833 9.91663V14.875H12.7499V9.91663C12.7499 9.5409 12.6007 9.18057 12.335 8.91489C12.0693 8.64922 11.709 8.49996 11.3333 8.49996C10.9575 8.49996 10.5972 8.64922 10.3315 8.91489C10.0658 9.18057 9.91659 9.5409 9.91659 9.91663V14.875H7.08325V9.91663C7.08325 8.78946 7.53102 7.70845 8.32805 6.91142C9.12508 6.11439 10.2061 5.66663 11.3333 5.66663Z" fill="#666666"/>
                    <path d="M4.25008 6.375H1.41675V14.875H4.25008V6.375Z" fill="#666666"/>
                    <path d="M2.83341 4.24996C3.61582 4.24996 4.25008 3.6157 4.25008 2.83329C4.25008 2.05089 3.61582 1.41663 2.83341 1.41663C2.05101 1.41663 1.41675 2.05089 1.41675 2.83329C1.41675 3.6157 2.05101 4.24996 2.83341 4.24996Z" fill="#666666"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a href="#" aria-label="TikTok" className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#1A1A1A] hover:bg-[#2a2a2a] transition-colors flex-shrink-0">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.8762 4.73871C13.1701 4.58344 12.5313 4.20848 12.0516 3.66763C11.5718 3.12679 11.2757 2.44787 11.2058 1.72829V1.41663H8.76203V11.0995C8.69496 11.5921 8.45097 12.0434 8.0756 12.3692C7.70022 12.6951 7.2191 12.8732 6.72203 12.8704C6.17911 12.8704 5.65843 12.6547 5.27453 12.2708C4.89063 11.8869 4.67495 11.3662 4.67495 10.8233C4.67495 10.2804 4.89063 9.75969 5.27453 9.37579C5.65843 8.99188 6.17911 8.77621 6.72203 8.77621C6.92037 8.77621 7.10453 8.80454 7.28162 8.84704V6.38204C7.09601 6.35857 6.90912 6.34675 6.72203 6.34663C5.53099 6.34663 4.38873 6.81977 3.54654 7.66196C2.70434 8.50416 2.2312 9.64642 2.2312 10.8375C2.2312 11.4272 2.34736 12.0112 2.57305 12.556C2.79873 13.1009 3.12952 13.5959 3.54654 14.013C4.38873 14.8552 5.53099 15.3283 6.72203 15.3283C7.91185 15.3264 9.05229 14.8524 9.89295 14.0105C10.7336 13.1685 11.2058 12.0273 11.2058 10.8375V6.21913C12.1941 6.93017 13.3812 7.31184 14.5987 7.30996V4.86621C14.354 4.84962 14.1118 4.80688 13.8762 4.73871Z" fill="#666666"/>
                  </svg>
                </a>
              </div>
              {/* YouTube on second row */}
              <div className="flex items-center">
                <a href="#" aria-label="YouTube" className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#1A1A1A] hover:bg-[#2a2a2a] transition-colors flex-shrink-0">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.9659 4.54754C15.8768 4.21575 15.7024 3.91304 15.4601 3.66949C15.2178 3.42594 14.916 3.25002 14.5847 3.15921C13.3734 2.83337 8.5001 2.83337 8.5001 2.83337C8.5001 2.83337 3.62677 2.83337 2.41552 3.15921C2.08419 3.25002 1.78238 3.42594 1.54007 3.66949C1.29776 3.91304 1.12339 4.21575 1.03427 4.54754C0.798434 5.85145 0.689315 7.17512 0.708438 8.50004C0.689315 9.82497 0.798434 11.1486 1.03427 12.4525C1.11681 12.7922 1.28825 13.1037 1.53099 13.3551C1.77373 13.6066 2.07903 13.7889 2.41552 13.8834C3.62677 14.1667 8.5001 14.1667 8.5001 14.1667C8.5001 14.1667 13.3734 14.1667 14.5847 13.8834C14.9152 13.7932 15.2164 13.6183 15.4587 13.3761C15.7009 13.1339 15.8757 12.8326 15.9659 12.5021C16.205 11.1819 16.3141 9.84151 16.2918 8.50004C16.3109 7.17512 16.2018 5.85145 15.9659 4.54754Z" fill="#666666"/>
                    <path d="M6.90625 10.6392L10.9792 8.50001L6.90625 6.36084V10.6392Z" fill="#161616"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* App Store & Google Play Buttons */}
            <div className="flex flex-col gap-2">
              {/* App Store */}
              <div className="relative w-[155px]">
                <span className="absolute -top-2 -right-2 bg-[#B5860B] text-white text-[9px] font-bold uppercase tracking-[0.5px] px-1.5 py-0.5 rounded-full z-10">
                  Soon
                </span>
                <a href="#" className="flex items-center gap-[9px] w-full px-[13px] py-[9px] rounded-[7px] border border-[#222] bg-[#111] opacity-60 cursor-not-allowed">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M14.8121 15.4375C14.155 16.4192 13.4583 17.3771 12.3975 17.393C11.3367 17.4167 10.9963 16.7675 9.79292 16.7675C8.58167 16.7675 8.20959 17.3771 7.20417 17.4167C6.16709 17.4563 5.38334 16.3717 4.71834 15.4138C3.36458 13.4584 2.3275 9.85629 3.72083 7.43379C4.40958 6.23046 5.64458 5.47046 6.9825 5.44671C7.99583 5.43087 8.96167 6.13546 9.58709 6.13546C10.2046 6.13546 11.3763 5.28837 12.5954 5.41504C13.11 5.43879 14.5508 5.62087 15.4771 6.98254C15.4058 7.03004 13.7592 7.99587 13.775 9.99879C13.7988 12.3896 15.8729 13.1892 15.8967 13.1971C15.8729 13.2525 15.5642 14.3371 14.8042 15.4375M10.2917 2.77087C10.8696 2.11379 11.8275 1.61504 12.6192 1.58337C12.7221 2.50962 12.35 3.44379 11.7958 4.10879C11.2496 4.78171 10.3471 5.30421 9.46042 5.23296C9.34167 4.32254 9.785 3.37254 10.2917 2.77087Z" fill="white"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[#555] text-[10px] font-normal leading-[125%]">Download on the</span>
                    <span className="text-white text-[13px] font-semibold leading-[125%]">App Store</span>
                  </div>
                </a>
              </div>
              {/* Google Play */}
              <div className="relative w-[155px]">
                <span className="absolute -top-2 -right-2 bg-[#B5860B] text-white text-[9px] font-bold uppercase tracking-[0.5px] px-1.5 py-0.5 rounded-full z-10">
                  Soon
                </span>
                <a href="#" className="flex items-center gap-[9px] w-full px-[13px] py-[9px] rounded-[7px] border border-[#222] bg-[#111] opacity-60 cursor-not-allowed">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <g clipPath="url(#clip0_footer_play)">
                      <path d="M2.51742 18.818C2.24566 18.6959 2.01383 18.4997 1.84858 18.2518C1.68334 18.004 1.59137 17.7145 1.58325 17.4167V1.58338C1.59137 1.28559 1.68334 0.996124 1.84858 0.748253C2.01383 0.500382 2.24566 0.304159 2.51742 0.182129L11.5503 9.21505L2.51742 18.818ZM14.4637 12.1046L4.10867 17.7334L10.8141 11.028L14.4637 12.1046ZM16.1499 8.07505C16.4312 8.19227 16.6716 8.39014 16.8406 8.64373C17.0097 8.89732 17.0999 9.19527 17.0999 9.50005C17.0999 9.80482 17.0097 10.1028 16.8406 10.3564C16.6716 10.61 16.4312 10.8078 16.1499 10.925L13.8066 11.6138L10.1491 7.9563L13.8066 4.2988L16.1499 4.90838V8.07505ZM4.10867 1.26671L14.4637 6.89546L10.8141 7.97213L4.10867 1.26671Z" fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_footer_play">
                        <rect width="19" height="19" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[#555] text-[10px] font-normal leading-[125%]">Get it on</span>
                    <span className="text-white text-[13px] font-semibold leading-[125%]">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* 234photos Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#555] text-[11px] font-bold uppercase tracking-[1px] leading-[150%]">
              234photos
            </h4>
            <ul className="flex flex-col gap-[11px]">
              {[
                { label: 'About us', href: '/about' },
                { label: 'Our mission', href: '/mission' },
                { label: 'Newsroom', href: '/newsroom' },
                { label: 'Blog', href: '/blog' },
                { label: 'Careers', href: '/careers' },
                { label: 'Partnerships', href: '/partnerships' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#666] text-[13px] font-normal leading-[140%] hover:text-[#999] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#555] text-[11px] font-bold uppercase tracking-[1px] leading-[150%]">
              Support
            </h4>
            <ul className="flex flex-col gap-[11px]">
              {[
                { label: 'Help centre', href: '/help' },
                { label: 'Contact us', href: '/contact' },
                { label: 'Accessibility', href: '/accessibility' },
                { label: 'Free trial', href: '/free-trial' },
                { label: 'Free images', href: '/free-images' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#666] text-[13px] font-normal leading-[140%] hover:text-[#999] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Contributors Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#555] text-[11px] font-bold uppercase tracking-[1px] leading-[150%]">
              For Contributors
            </h4>
            <ul className="flex flex-col gap-[11px]">
              {[
                { label: 'Submit images', href: '/submit' },
                { label: 'Contributor FAQ', href: '/contributor-faq' },
                { label: 'Contributor blog', href: '/contributor-blog' },
                { label: 'Forum', href: '/forum' },
                { label: 'Affiliate programme', href: '/affiliate' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#666] text-[13px] font-normal leading-[140%] hover:text-[#999] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#555] text-[11px] font-bold uppercase tracking-[1px] leading-[150%]">
              Legal
            </h4>
            <ul className="flex flex-col gap-[11px]">
              {[
                { label: 'Licence agreement', href: '/licence' },
                { label: 'Terms of service', href: '/terms' },
                { label: 'Privacy policy', href: '/privacy' },
                { label: 'Cookie policy', href: '/cookies' },
                { label: 'Do not sell my data', href: '/do-not-sell' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#666] text-[13px] font-normal leading-[140%] hover:text-[#999] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#111]">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: copyright + links */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 text-[#555] text-[12.5px]">
            <span className="sm:mr-6">© 2026 234photos, Inc. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-[#999] transition-colors">Privacy policy</Link>
              <Link href="/terms" className="hover:text-[#999] transition-colors">Terms of use</Link>
              <Link href="/cookies" className="hover:text-[#999] transition-colors">Cookie settings</Link>
            </div>
          </div>

          {/* Right: Language selector */}
          <button className="flex items-center gap-[6px] border border-[#222] rounded-[6px] px-3 py-[6px] text-[#555] text-[13px] hover:border-[#333] transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_footer_globe)">
                <path d="M7.00005 12.95C10.2861 12.95 12.95 10.2861 12.95 7.00005C12.95 3.71395 10.2861 1.05005 7.00005 1.05005C3.71395 1.05005 1.05005 3.71395 1.05005 7.00005C1.05005 10.2861 3.71395 12.95 7.00005 12.95Z" stroke="#555555" strokeWidth="0.98"/>
                <path d="M7 12.95C8.31443 12.95 9.37999 10.2861 9.37999 7.00005C9.37999 3.71395 8.31443 1.05005 7 1.05005C5.68556 1.05005 4.62 3.71395 4.62 7.00005C4.62 10.2861 5.68556 12.95 7 12.95Z" stroke="#555555" strokeWidth="0.98"/>
                <path d="M1.05005 5.25H12.95M1.05005 8.75H12.95" stroke="#555555" strokeWidth="0.98" strokeLinecap="round"/>
              </g>
              <defs>
                <clipPath id="clip0_footer_globe">
                  <rect width="14" height="14" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span>English (NG)</span>
            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_footer_chevron)">
                <path d="M0.90625 0.898438L4.5 4.49218L8.09374 0.898438" stroke="#555555" strokeWidth="1.25781" strokeLinecap="round"/>
              </g>
              <defs>
                <clipPath id="clip0_footer_chevron">
                  <rect width="9" height="5.39062" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
