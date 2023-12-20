import React from "react";

interface BigStarCounerProps{
  starCount?: number;
}

export const BigStarCouner: React.FC<BigStarCounerProps> = ({starCount}) => {

  return (
    <svg width="200" height="88" viewBox="0 0 200 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="88" rx="24" fill="url(#paint0_linear_4851_9503)" />
      <path d="M34.8318 65.6524C33.6738 66.2284 32.3598 65.2189 32.5938 63.9302L35.0837 50.1707L24.515 40.4081C23.528 39.4947 24.041 37.8249 25.3639 37.6446L40.0577 35.6199L46.6095 23.0327C47.2005 21.8982 48.7995 21.8982 49.3905 23.0327L55.9423 35.6199L70.6361 37.6446C71.959 37.8249 72.472 39.4947 71.4851 40.4081L60.9163 50.1707L63.4062 63.9302C63.6402 65.2189 62.3262 66.2284 61.1682 65.6524L47.9955 59.0897L34.8288 65.6524H34.8318Z" fill="#F8F9FA" />
      <text x="65%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="#F8F9FA" fontSize="40" fontWeight="700">{starCount}</text>
      <defs>
        <linearGradient id="paint0_linear_4851_9503" x1="6.78828e-06" y1="-26" x2="169.698" y2="172.115" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A966FF" />
          <stop offset="1" stopColor="#0A58CA" />
        </linearGradient>
      </defs>
    </svg>

  )
}