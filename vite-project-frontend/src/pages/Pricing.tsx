import { useState } from 'react'
import toast from 'react-hot-toast'
import { dummyStats } from '../assets/assets'
import PlanCard from '../components/pricing/PlanCard'

const FREE_FEATURES = [
  'SD Quality',
  'Free 30 Meetings',
  'Max 10 Participants',
  'No Recordings',
  'Limited Chat History',
  'Max 60 Minutes Duration',
]

const PREMIUM_FEATURES = [
  'HD Quality',
  'Unlimited Meetings',
  '100 Participants',
  'Meeting Recordings',
  'Chat History',
  'No Duration Limit',
]

// Per-month prices; annual billing is discounted
const MONTHLY_PRICE = 9
const ANNUAL_PRICE = 7

/**
 * Plan comparison page. Billing is mocked: the current plan comes from
 * dummyStats, and the trial button only shows a confirmation toast.
 */
const Pricing = () => {
  const [billedAnnually, setBilledAnnually] = useState(false)

  const isPremium = dummyStats.plan === 'premium'
  const premiumPrice = billedAnnually ? ANNUAL_PRICE : MONTHLY_PRICE

  const handleStartTrial = () => {
    toast.success('Your 14-day free trial has started (demo)')
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">Upgrade your plan.</h1>
      <p className="mt-2 text-sm text-slate-600">
        Choose the plan that's right for you and unlock all the features of MeetUp.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <PlanCard
          name="Free"
          price={0}
          caption="Always free"
          features={FREE_FEATURES}
          isCurrent={!isPremium}
        />

        <PlanCard
          name="Premium"
          price={premiumPrice}
          period="/month"
          isCurrent={isPremium}
          features={PREMIUM_FEATURES}
          caption={
            <div className="flex items-center gap-2.5 text-xs text-slate-600">
              {/* role="switch" keeps the toggle accessible to screen readers */}
              <button
                type="button"
                role="switch"
                aria-checked={billedAnnually}
                onClick={() => setBilledAnnually((v) => !v)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors focus:outline-none ${
                  billedAnnually ? 'bg-slate-800' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`block size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                    billedAnnually ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span
                onClick={() => setBilledAnnually((v) => !v)}
                className="cursor-pointer select-none text-slate-700"
              >
                Billed annually
              </span>
              {billedAnnually && (
                <span className="font-medium text-emerald-600">Save 22%</span>
              )}
            </div>
          }
          action={
            isPremium ? (
              <button
                disabled
                className="w-full cursor-not-allowed rounded-xl bg-slate-200 py-2.5 text-sm font-medium text-slate-500"
              >
                Current plan
              </button>
            ) : (
              <button
                onClick={handleStartTrial}
                className="w-full rounded-xl bg-slate-800 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-900"
              >
                Start 14-day free trial
              </button>
            )
          }
        />
      </div>
    </div>
  )
}

export default Pricing