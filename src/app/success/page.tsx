'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, ArrowRight, Gift, Star } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function SuccessPage() {
  const router = useRouter()
  const { selectedPlan, userEmail } = useAppStore()

  const planNames = {
    'leve': 'Leve+',
    'vital': 'Vital+',
    'levin-pro': 'Levin Pro+'
  }

  useEffect(() => {
    // Here you would typically update the subscription status in Supabase
    // For now, we'll simulate this
    const updateSubscription = async () => {
      if (selectedPlan && userEmail) {
        // In a real app, you would call your API to update the subscription
        console.log('Updating subscription for:', { selectedPlan, userEmail })
      }
    }

    updateSubscription()
  }, [selectedPlan, userEmail])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pagamento Confirmado! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Bem-vindo ao {planNames[selectedPlan as keyof typeof planNames] || 'seu novo plano'}!
            <br />
            Sua jornada para uma digestão saudável começa agora.
          </p>

          {/* Plan Details */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900">
                  {planNames[selectedPlan as keyof typeof planNames] || 'Seu Plano'}
                </h2>
                <p className="text-gray-600">Ativo agora</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>Acesso Imediato</span>
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ Todas as receitas do seu plano</li>
                  <li>✅ Ferramentas de acompanhamento</li>
                  <li>✅ Suporte especializado</li>
                  <li>✅ Conteúdo exclusivo</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Próximos Passos</span>
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>📧 Verifique seu email de boas-vindas</li>
                  <li>📱 Acesse seu dashboard personalizado</li>
                  <li>🍽️ Comece com o quiz nutricional</li>
                  <li>📞 Agende sua primeira consulta</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Ir para Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => router.push('/planos')}
              className="w-full border-2 border-gray-200 text-gray-700 py-3 px-8 rounded-2xl font-medium transition-all duration-300 hover:border-green-300 hover:text-green-600"
            >
              Ver Outros Planos
            </button>
          </div>

          {/* Thank You Message */}
          <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Obrigado pela confiança! 💚
            </h3>
            <p className="text-gray-700">
              Você se juntou a mais de 10.000 pessoas que já transformaram sua digestão com o Levin Pro.
              Estamos aqui para apoiar você em cada passo da sua jornada.
            </p>
          </div>

          {/* Support Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Precisa de ajuda? Entre em contato conosco:{' '}
              <a href="mailto:suporte@levinpro.com" className="text-green-600 hover:underline">
                suporte@levinpro.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}