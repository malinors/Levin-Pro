'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAppStore } from '@/lib/store'
import { CreditCard, Shield, Clock, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { selectedPlan, isLoggedIn, userEmail, setCheckoutUrl } = useAppStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const planDetails = {
    'leve': {
      name: 'Leve+',
      price: 'R$ 11,50/mês',
      yearlyPrice: 'R$ 117,30/ano',
      features: ['10 receitas personalizadas', 'Registro de sintomas', 'Dicas nutricionais']
    },
    'vital': {
      name: 'Vital+',
      price: 'R$ 19,90/mês',
      yearlyPrice: 'R$ 202,86/ano',
      features: ['50 receitas exclusivas', 'Relatórios', 'Suporte prioritário', 'Vídeos de nutrição']
    },
    'levin-pro': {
      name: 'Levin Pro+',
      price: 'R$ 29,30/mês',
      yearlyPrice: 'R$ 298,86/ano',
      features: ['Plano alimentar completo', '100 receitas', 'Suporte especializado', 'Novos recursos antecipados']
    }
  }

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn) {
      router.push('/auth')
      return
    }

    // Check if plan is selected and valid
    if (!selectedPlan || selectedPlan === 'free') {
      router.push('/planos')
      return
    }
  }, [isLoggedIn, selectedPlan, router])

  const handleCheckout = async () => {
    if (!selectedPlan || !userEmail) return

    setLoading(true)
    setError(null)

    try {
      // Simulate payment gateway integration
      // In a real app, you would call your payment gateway API here
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          email: userEmail,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/cancel`,
        }),
      })

      if (!response.ok) {
        // For demo purposes, simulate a successful checkout URL
        const checkoutUrl = `https://checkout.stripe.com/pay/cs_test_${Math.random().toString(36).substring(7)}`
        setCheckoutUrl(checkoutUrl)
        
        // Open checkout URL in new window
        window.open(checkoutUrl, '_blank')
        
        // Redirect to success page after a delay (simulating payment completion)
        setTimeout(() => {
          router.push('/success')
        }, 3000)
        
        return
      }

      const data = await response.json()
      
      if (data.checkoutUrl) {
        setCheckoutUrl(data.checkoutUrl)
        window.open(data.checkoutUrl, '_blank')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!selectedPlan || selectedPlan === 'free') {
    return null
  }

  const plan = planDetails[selectedPlan as keyof typeof planDetails]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold">L</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Levin Pro</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Checkout Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalizar Assinatura</h1>
          <p className="text-gray-600">Você está a um passo de transformar sua digestão!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo do Plano</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-semibold text-gray-900">{plan?.name}</h3>
                  <p className="text-sm text-gray-600">Assinatura mensal</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{plan?.price}</p>
                  <p className="text-xs text-green-600">ou {plan?.yearlyPrice} (-15%)</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Incluído no plano:</h4>
                <div className="space-y-2">
                  {plan?.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Garantia de 7 dias</span>
                </div>
                <p className="text-sm text-green-700">
                  Não ficou satisfeito? Cancelamos e devolvemos 100% do valor.
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pagamento</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">@</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Conta</p>
                    <p className="text-sm text-gray-600">{userEmail}</p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Gerando link de pagamento...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Finalizar Pagamento</span>
                  </div>
                )}
              </button>

              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Pagamento seguro</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Acesso imediato</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Ao continuar, você concorda com nossos{' '}
                  <a href="#" className="text-green-600 hover:underline">Termos de Uso</a>{' '}
                  e{' '}
                  <a href="#" className="text-green-600 hover:underline">Política de Privacidade</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Por que escolher o Levin Pro?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-medium text-gray-900">10k+ usuários</p>
                <p className="text-gray-600">Confiaram em nós</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-900">95% melhora</p>
                <p className="text-gray-600">Nos sintomas</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-medium text-gray-900">2 semanas</p>
                <p className="text-gray-600">Para ver resultados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}