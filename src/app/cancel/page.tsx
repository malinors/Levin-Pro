'use client'

import { useRouter } from 'next/navigation'
import { XCircle, ArrowLeft, RefreshCw, MessageCircle } from 'lucide-react'

export default function CancelPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* Cancel Icon */}
          <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <XCircle className="w-12 h-12 text-white" />
          </div>

          {/* Cancel Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pagamento Cancelado
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Não se preocupe! Seu pagamento não foi processado.
            <br />
            Você pode tentar novamente quando estiver pronto.
          </p>

          {/* Reassurance */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              O que aconteceu?
            </h2>
            
            <div className="text-left space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm">ℹ️</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Nenhuma cobrança foi realizada</p>
                  <p className="text-sm text-gray-600">Seu cartão ou método de pagamento não foi debitado.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Seus dados estão seguros</p>
                  <p className="text-sm text-gray-600">Nenhuma informação foi armazenada ou compartilhada.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-600 text-sm">⏰</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Oferta ainda válida</p>
                  <p className="text-sm text-gray-600">Você pode retomar o processo a qualquer momento.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => router.push('/planos')}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar aos Planos</span>
            </button>

            <button
              onClick={() => router.push('/checkout')}
              className="w-full border-2 border-green-300 text-green-700 py-3 px-8 rounded-2xl font-medium transition-all duration-300 hover:bg-green-50 flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Tentar Novamente</span>
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Precisa de Ajuda?
              </h3>
            </div>
            
            <p className="text-gray-700 mb-4">
              Se você teve problemas durante o pagamento ou tem dúvidas sobre nossos planos,
              nossa equipe está aqui para ajudar!
            </p>
            
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                📧 Email: <a href="mailto:suporte@levinpro.com" className="text-blue-600 hover:underline">suporte@levinpro.com</a>
              </p>
              <p className="text-gray-600">
                💬 WhatsApp: <a href="https://wa.me/5511999999999" className="text-blue-600 hover:underline">(11) 99999-9999</a>
              </p>
              <p className="text-gray-600">
                ⏰ Horário de atendimento: Segunda a sexta, 9h às 18h
              </p>
            </div>
          </div>

          {/* Alternative Options */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Outras opções para você:
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/planos')}
                className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-green-300 hover:shadow-md transition-all duration-300"
              >
                <h4 className="font-medium text-gray-900 mb-1">Plano Gratuito</h4>
                <p className="text-sm text-gray-600">Comece sem compromisso</p>
              </button>
              
              <button
                onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-blue-300 hover:shadow-md transition-all duration-300"
              >
                <h4 className="font-medium text-gray-900 mb-1">Falar com Especialista</h4>
                <p className="text-sm text-gray-600">Tire suas dúvidas primeiro</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}