import React from 'react'

interface StarNavbarIconProps {
  countStar?: number;
}

export const StarNavbarIcon: React.FC<StarNavbarIconProps> = ({ countStar }) => {

  return (
    <svg width="120" height="44" viewBox="0 0 120 44" fill="none" xmlns="http://www.w3.org/2000/svg" className='me-3'>
      <rect width="120" height="44" rx="22" fill="url(#paint0_linear_4851_9485)" />
      <g clipPath="url(#clip0_4851_9485)">
        <path d="M23.416 33.1645C22.837 33.4615 22.18 32.941 22.297 32.2765L23.542 25.1815L18.2575 20.1475C17.764 19.6765 18.0205 18.8155 18.682 18.7225L26.029 17.6785L29.305 11.188C29.6005 10.603 30.4 10.603 30.6955 11.188L33.9715 17.6785L41.3185 18.7225C41.98 18.8155 42.2365 19.6765 41.743 20.1475L36.4585 25.1815L37.7035 32.2765C37.8205 32.941 37.1635 33.4615 36.5845 33.1645L29.998 29.7805L23.4145 33.1645H23.416Z" fill="#F8F9FA" />
      </g>
      <text x="65%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="#F8F9FA" opacity="0.8" fontSize="20">{countStar}</text>
      <defs>
        <linearGradient id="paint0_linear_4851_9485" x1="-10.5" y1="-16.5" x2="88.5" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9747FF" />
          <stop offset="1" stopColor="#00A1FF" />
        </linearGradient>
        <path id="clip0_4851_9485">
          <rect width="24" height="24" fill="white" transform="translate(18 10)" />
        </path>
      </defs>
    </svg>
  )

}