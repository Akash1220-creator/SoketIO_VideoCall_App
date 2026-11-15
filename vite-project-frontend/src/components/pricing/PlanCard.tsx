import type { ReactNode } from 'react'
import { Check } from 'lucide-react'

interface PlanCardProps {
  name: string
  price: number
  // Shown next to the price, e.g. "/month". Omitted for the free plan.
  period?: string
  // Line under the price: static text or an interactive element like a toggle
  caption: ReactNode
  features: string[]
  isCurrent: boolean
  // Optional footer, e.g. the call-to-action button
  action?: ReactNode
}

/**
 * One pricing plan: grey header (name, price, caption), a feature checklist,
 * and an optional action footer. Purely presentational.
 */
const PlanCard = ({ name, price, period, caption, features, isCurrent, action }: PlanCardProps) => (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white shadow-lg">
    <div className="bg-slate-50 p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-900">{name}</h2>
        {isCurrent && (
          <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-white">
            Active
          </span>
        )}
      </div>

      <p className="mt-2 flex items-baseline gap-1">
        <span className="text-3xl font-semibold text-slate-900">${price}</span>
        {period && <span className="text-xs text-slate-500">{period}</span>}
      </p>

      <div className="mt-2 text-xs text-slate-500">{caption}</div>
    </div>

    <ul className="flex-1 space-y-3.5 border-t border-slate-200 p-5">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-700">
          <Check size={14} className="shrink-0 text-slate-500" />
          {feature}
        </li>
      ))}
    </ul>

    {action && <div className="border-t border-slate-200 p-4">{action}</div>}
  </div>
)

export default PlanCard