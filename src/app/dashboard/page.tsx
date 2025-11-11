'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAppStore } from '@/lib/store'
import { 
  User, 
  Crown, 
  Calendar, 
  TrendingUp, 
  BookOpen, 
  Settings, 
  LogOut,
  Bell,
  Award,
  Heart,
  ChefHat,
  BarChart3,
  Shield
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { isLoggedIn, userEmail, selectedPlan, setLoggedIn, setUserEmail, reset } = useAppStore()
  const [loading, setLoading] = useState(true)
  const [userPlan, setUserPlan] = useState<string>('free')

  const planNames = {
    'free': 'Gratuito',
    'leve': 'Leve+',
    'vital': 'Vital+',
    'levin-pro': 'Levin Pro+'
  }

  const planColors = {
    'free': 'from-gray-400 to-gray-500',
    'leve': 'from-green-400 to-emerald-500',
    'vital': 'from-blue-400 to-cyan-500',
    'levin-pro': 'from-orange-400 to-amber-500'
  }

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth')
        return
      }

      setLoggedIn(true)
      setUserEmail(session.user.email || null)
      
      // Set user plan based on selectedPlan or fetch from database
      if (selectedPlan) {
        setUserPlan(selectedPlan)
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [setLoggedIn, setUserEmail, selectedPlan, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    reset()
    router.push('/planos')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white text-2xl font-bold">L</span>
          </div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Levin Pro</h1>
                <p className="text-sm text-gray-600">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta! 👋
          </h1>
          <p className="text-gray-600">
            Vamos continuar sua jornada para uma digestão mais saudável.
          </p>
        </div>

        {/* User Info & Plan */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* User Profile */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Meu Perfil</h3>
                <p className="text-sm text-gray-600">{userEmail}</p>
              </div>
            </div>
            <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Editar Perfil</span>
            </button>
          </div>

          {/* Current Plan */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${planColors[userPlan as keyof typeof planColors]} rounded-2xl flex items-center justify-center shadow-lg`}>
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Plano Atual</h3>
                <p className="text-lg font-bold text-green-600">
                  {planNames[userPlan as keyof typeof planNames]}
                </p>
              </div>
            </div>
            {userPlan === 'free' ? (
              <button 
                onClick={() => router.push('/planos')}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                Fazer Upgrade
              </button>
            ) : (
              <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-xl transition-colors">
                Gerenciar Plano
              </button>
            )}
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Progresso</h3>
                <p className="text-sm text-gray-600">Esta semana</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Receitas testadas</span>
                <span className="font-medium">3/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center mb-4">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Receitas</h3>
            <p className="text-sm text-gray-600">Explore receitas personalizadas</p>
          </button>

          <button className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Relatórios</h3>
            <p className="text-sm text-gray-600">Acompanhe seu progresso</p>
          </button>

          <button className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Sintomas</h3>
            <p className="text-sm text-gray-600">Registre como se sente</p>
          </button>

          <button className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Guias</h3>
            <p className="text-sm text-gray-600">Aprenda sobre FODMAP</p>
          </button>
        </div>

        {/* Recent Activity & Stats */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Atividade Recente</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-xl border border-green-100">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Receita testada</p>
                  <p className="text-sm text-gray-600">Salmão grelhado com legumes</p>
                </div>
                <span className="text-xs text-gray-500">2h atrás</span>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Sintomas registrados</p>
                  <p className="text-sm text-gray-600">Bem-estar: Excelente</p>
                </div>
                <span className="text-xs text-gray-500">1 dia</span>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-xl border border-purple-100">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Meta alcançada</p>
                  <p className="text-sm text-gray-600">7 dias consecutivos</p>
                </div>
                <span className="text-xs text-gray-500">2 dias</span>
              </div>
            </div>
          </div>

          {/* Health Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Estatísticas de Saúde</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Bem-estar Geral</span>
                  <span className="font-bold text-green-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Adesão ao Plano</span>
                  <span className="font-bold text-blue-600">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Receitas Testadas</span>
                  <span className="font-bold text-purple-600">12/20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-100 mt-6">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Parabéns!</p>
                    <p className="text-sm text-gray-600">Você está no caminho certo para uma digestão saudável.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}