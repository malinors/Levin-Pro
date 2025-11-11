'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAppStore } from '@/lib/store'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { ArrowLeft, Shield, CheckCircle, Gift, Zap, Crown } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const { selectedPlan, setLoggedIn, setUserEmail } = useAppStore()
  const [loading, setLoading] = useState(true)

  const planNames = {
    'free': 'Gratuito',
    'leve': 'Leve+',
    'vital': 'Vital+',
    'levin-pro': 'Levin Pro+'
  }

  const planIcons = {
    'free': Gift,
    'leve': Zap,
    'vital': Shield,
    'levin-pro': Crown
  }

  const planColors = {
    'free': 'from-gray-400 to-gray-500',
    'leve': 'from-green-400 to-emerald-500',
    'vital': 'from-blue-400 to-cyan-500',
    'levin-pro': 'from-orange-400 to-amber-500'
  }

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setLoggedIn(true)
        setUserEmail(session.user.email || null)
        
        // Redirect based on selected plan
        if (selectedPlan === 'free') {
          router.push('/dashboard')
        } else if (selectedPlan && ['leve', 'vital', 'levin-pro'].includes(selectedPlan)) {
          router.push('/checkout')
        } else {
          // If no plan selected, redirect to plans
          router.push('/planos')
        }
      }
      setLoading(false)
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setLoggedIn(true)
        setUserEmail(session.user.email || null)
        
        // Redirect based on selected plan
        if (selectedPlan === 'free') {
          // For free plan, go directly to dashboard
          router.push('/dashboard')
        } else if (selectedPlan && ['leve', 'vital', 'levin-pro'].includes(selectedPlan)) {
          // For paid plans, go to checkout
          router.push('/checkout')
        } else {
          // If no plan selected, redirect to plans
          router.push('/planos')
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [selectedPlan, setLoggedIn, setUserEmail, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white text-2xl font-bold">L</span>
          </div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // If no plan selected, redirect to plans
  if (!selectedPlan) {
    router.push('/planos')
    return null
  }

  const PlanIcon = planIcons[selectedPlan as keyof typeof planIcons]
  const planColor = planColors[selectedPlan as keyof typeof planColors]

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

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Selected Plan Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 mb-8">
          <div className="text-center mb-4">
            <div className={`w-16 h-16 bg-gradient-to-r ${planColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
              <PlanIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Plano Selecionado</h2>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {planNames[selectedPlan as keyof typeof planNames]}
            </p>
          </div>
          
          <div className="space-y-2">
            {selectedPlan === 'free' ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Acesso imediato e gratuito</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Quiz inicial e lista FODMAP</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>5 receitas básicas incluídas</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Pagamento seguro após cadastro</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Suporte especializado</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cancele quando quiser</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedPlan === 'free' ? 'Criar Conta Gratuita' : 'Finalizar Assinatura'}
            </h1>
            <p className="text-gray-600">
              {selectedPlan === 'free' 
                ? 'Crie sua conta e comece a usar gratuitamente agora mesmo'
                : 'Faça login ou crie sua conta para prosseguir com o pagamento'
              }
            </p>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#10b981',
                    brandAccent: '#059669',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#f3f4f6',
                    defaultButtonBackgroundHover: '#e5e7eb',
                    inputBackground: 'white',
                    inputBorder: '#d1d5db',
                    inputBorderHover: '#10b981',
                    inputBorderFocus: '#10b981',
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '12px',
                    buttonBorderRadius: '12px',
                    inputBorderRadius: '12px',
                  },
                },
              },
              className: {
                container: 'space-y-4',
                button: 'font-semibold transition-all duration-200 hover:scale-105',
                input: 'transition-all duration-200',
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/auth`}
            onlyThirdPartyProviders={false}
            magicLink={false}
            showLinks={true}
            localization={{
              variables: {
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  button_label: selectedPlan === 'free' ? 'Criar Conta Gratuita' : 'Criar Conta e Continuar',
                  loading_button_label: 'Criando conta...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Não tem uma conta? Cadastre-se',
                  confirmation_text: 'Verifique seu email para confirmar a conta'
                },
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  button_label: selectedPlan === 'free' ? 'Entrar na Conta' : 'Entrar e Continuar',
                  loading_button_label: 'Entrando...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entre aqui'
                },
                magic_link: {
                  email_input_label: 'Email',
                  button_label: 'Enviar link mágico',
                  loading_button_label: 'Enviando link...',
                  link_text: 'Enviar um link mágico por email',
                  confirmation_text: 'Verifique seu email para o link de login'
                },
                forgotten_password: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  button_label: 'Enviar instruções',
                  loading_button_label: 'Enviando instruções...',
                  link_text: 'Esqueceu sua senha?',
                  confirmation_text: 'Verifique seu email para as instruções de redefinição de senha'
                },
                update_password: {
                  password_label: 'Nova senha',
                  password_confirmation_label: 'Confirme a nova senha',
                  button_label: 'Atualizar senha',
                  loading_button_label: 'Atualizando senha...'
                },
                verify: {
                  token_input_label: 'Token',
                  button_label: 'Verificar token',
                  loading_button_label: 'Verificando...'
                }
              }
            }}
          />
        </div>

        {/* Next Steps Info */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-green-100">
          <p className="text-sm text-gray-700 text-center">
            {selectedPlan === 'free' ? (
              <>
                🎉 <strong>Após criar sua conta:</strong> Você terá acesso imediato ao dashboard com todas as funcionalidades gratuitas!
              </>
            ) : (
              <>
                💳 <strong>Próximo passo:</strong> Após criar sua conta, você será direcionado para finalizar o pagamento de forma segura.
              </>
            )}
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            🔒 Seus dados estão seguros e criptografados. Não compartilhamos suas informações.
          </p>
        </div>
      </div>
    </div>
  )
}