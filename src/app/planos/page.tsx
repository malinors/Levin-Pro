'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Star, Users, TrendingUp, Gift, Zap, Shield, Crown } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function PlanosPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const router = useRouter()
  const { setSelectedPlan } = useAppStore()

  const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      subtitle: 'Básico',
      icon: Gift,
      iconColor: 'text-gray-500',
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      price: { monthly: 0, yearly: 0 },
      features: [
        'Quiz inicial',
        'Lista FODMAP',
        'Guia de cores',
        '5 receitas básicas'
      ],
      buttonText: 'Começar Gratuitamente',
      buttonStyle: 'border-2 border-green-400 text-green-600 hover:bg-green-50',
      popular: false
    },
    {
      id: 'leve',
      name: 'Leve+',
      subtitle: '10 receitas',
      icon: Zap,
      iconColor: 'text-green-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      price: { monthly: 11.50, yearly: 117.30 },
      features: [
        'Tudo do gratuito +',
        '10 receitas personalizadas',
        'Registro de sintomas',
        'Dicas nutricionais'
      ],
      buttonText: 'Assinar Leve+',
      buttonStyle: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:shadow-lg hover:scale-105',
      popular: false
    },
    {
      id: 'vital',
      name: 'Vital+',
      subtitle: '50 receitas',
      icon: Shield,
      iconColor: 'text-blue-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      price: { monthly: 19.90, yearly: 202.86 },
      features: [
        'Tudo do Leve+ +',
        '50 receitas exclusivas',
        'Relatórios',
        'Suporte prioritário',
        'Vídeos de nutrição'
      ],
      buttonText: 'Assinar Vital+',
      buttonStyle: 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white hover:shadow-lg hover:scale-105',
      popular: false
    },
    {
      id: 'levin-pro',
      name: 'Levin Pro+',
      subtitle: '100 receitas',
      icon: Crown,
      iconColor: 'text-orange-500',
      bgColor: 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50',
      borderColor: 'border-orange-300',
      price: { monthly: 29.30, yearly: 298.86 },
      features: [
        'Tudo do Vital+ +',
        'Plano alimentar completo',
        '100 receitas',
        'Suporte especializado',
        'Novos recursos antecipados'
      ],
      buttonText: 'Assinar Levin Pro+ ⭐',
      buttonStyle: 'bg-gradient-to-r from-orange-400 to-amber-500 text-white hover:shadow-lg hover:scale-105',
      popular: true
    }
  ]

  const calculateSavings = (monthlyPrice: number) => {
    const yearlyTotal = monthlyPrice * 12
    const discountedYearly = yearlyTotal * 0.85 // 15% discount
    return yearlyTotal - discountedYearly
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    router.push('/auth')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Levin Pro</h1>
                <p className="text-sm text-gray-600">Saúde Digestiva</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Escolha Seu Plano</h1>
          <p className="text-gray-600 mb-6">Mais saúde, mais praticidade. Comece agora e veja resultados!</p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-2xl p-1 mb-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 relative ${
                billingCycle === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Anual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                -15%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {plans.map((plan) => {
            const Icon = plan.icon
            const currentPrice = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly
            const savings = billingCycle === 'yearly' && plan.price.monthly > 0 ? calculateSavings(plan.price.monthly) : 0

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  plan.bgColor
                } ${plan.borderColor} ${plan.popular ? 'ring-2 ring-orange-300' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      RECOMENDADO
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-white shadow-lg flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${plan.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">{plan.subtitle}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  {plan.price.monthly === 0 ? (
                    <div className="text-3xl font-bold text-gray-900">Gratuito</div>
                  ) : (
                    <>
                      <div className="text-3xl font-bold text-gray-900">
                        R$ {currentPrice.toFixed(2).replace('.', ',')}
                      </div>
                      <div className="text-gray-600 text-sm">
                        /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                      </div>
                      {billingCycle === 'yearly' && savings > 0 && (
                        <div className="text-green-600 text-sm font-medium mt-1">
                          Economize R$ {savings.toFixed(2).replace('.', ',')}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full py-3 px-6 rounded-2xl font-semibold transition-all duration-300 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>10k+ usuários</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>4.8 estrelas</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>95% melhora</span>
            </div>
          </div>
          
          {/* Motivational Message */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-green-100">
            <p className="text-gray-700 font-medium">
              ✨ Transforme sua digestão em apenas 2 semanas. Milhares já conseguiram!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}