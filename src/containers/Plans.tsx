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
    <div className="flex flex-col items-center justify-center gap-12 pb-32 mt-32">
      <h2 className="z-30 text-6xl font-[700] tracking-tight text-center scroll-m-20 lg:text-6xl">
        Know more about our plans
      </h2>

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
