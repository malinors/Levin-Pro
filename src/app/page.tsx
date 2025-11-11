'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, CheckCircle, ArrowRight, Sparkles, Heart, Zap } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const questions = [
    {
      id: 1,
      question: "Como está sua digestão atualmente?",
      options: [
        "Tenho problemas digestivos frequentes",
        "Às vezes sinto desconforto",
        "Está normal, mas quero melhorar",
        "Está ótima, só quero manter"
      ]
    },
    {
      id: 2,
      question: "Qual é seu principal objetivo?",
      options: [
        "Reduzir sintomas digestivos",
        "Ter mais energia no dia a dia",
        "Melhorar minha alimentação",
        "Aprender sobre FODMAP"
      ]
    },
    {
      id: 3,
      question: "Você já tentou alguma dieta específica?",
      options: [
        "Sim, mas não funcionou",
        "Sim, e teve alguns resultados",
        "Não, é minha primeira vez",
        "Já conheço sobre FODMAP"
      ]
    },
    {
      id: 4,
      question: "Quanto tempo você dedica para cozinhar?",
      options: [
        "Menos de 30 minutos por dia",
        "30-60 minutos por dia",
        "Mais de 1 hora por dia",
        "Varia muito"
      ]
    }
  ]

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const goToPlans = () => {
    router.push('/planos')
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Perfeito! Temos o plano ideal para você! ✨
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Baseado nas suas respostas, preparamos opções personalizadas que vão transformar sua digestão.
            </p>
          </div>

          {/* Benefits Preview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Digestão Saudável</h3>
              <p className="text-sm text-gray-600">Reduza sintomas e sinta-se melhor todos os dias</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mais Energia</h3>
              <p className="text-sm text-gray-600">Tenha disposição para aproveitar cada momento</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Receitas Exclusivas</h3>
              <p className="text-sm text-gray-600">Pratos deliciosos que cuidam da sua saúde</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={goToPlans}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>Ver Meus Planos Personalizados</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-sm text-gray-500 mt-4">
            🎯 Planos baseados no seu perfil • ⭐ Mais de 10.000 pessoas transformaram sua saúde
          </p>
        </div>
      </div>
    )
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

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-green-600">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-xl transition-all duration-300 hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 group-hover:text-green-700 font-medium">
                    {option}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            ✨ Estamos criando seu plano personalizado baseado nas suas respostas
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Sem Compromisso</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Resultados Reais</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}