'use client'

import Cards from '@/components/plan-cards'

const PLANS = [
  {
    name: 'Free',
    value: '0',
    currency: 'R$',
    benefits: ['3 Resumes', 'Download as PDF'],
  },
  {
    name: 'Premium',
    value: '9.99',
    currency: 'R$',
    benefits: [
      'Unlimited Resumes',
      'Download as PDF',
      'Generate QR Code',
      'Generate Link to share',
    ],
  },
  {
    name: 'Pro',
    value: '19.99',
    currency: 'R$',
    benefits: [
      'Unlimited Resumes',
      'Download as PDF',
      'Generate QR Code',
      'Generate Link to share',
      'Generate your resume with AI',
    ],
  },
]

export default function Plans() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-12 py-24 bg-slate-950"
      id="our-plans"
    >
      <h2 className="z-30 text-6xl font-[700] tracking-tight text-center scroll-m-20 lg:text-6xl text-white">
        Our plans
      </h2>

      <p className="max-w-2xl mx-auto text-lg text-center text-gray-300">
        While our core product is absolutely free, we believe in offering you
        more options to enhance your experience. With our premium and pro plans,
        you can unlock a host of additional features and benefits that take you
        to the next level.
      </p>

      <div className="flex flex-row gap-16 mt-12">
        {PLANS.map((plan) => (
          <Cards
            key={plan.name}
            name={plan.name}
            value={plan.value}
            currency={plan.currency}
            benefits={plan.benefits}
          />
        ))}
      </div>
    </div>
  )
}
