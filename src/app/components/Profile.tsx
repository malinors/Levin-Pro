"use client"

import { useState, useEffect } from 'react'
import { User, Settings, Target, Calendar, TrendingUp, Award, Edit2, Save, X } from 'lucide-react'

interface UserProfile {
  name: string
  email: string
  age: number
  gender: 'Masculino' | 'Feminino' | 'Outro'
  height: number // cm
  weight: number // kg
  dietPhase: 'elimination' | 'reintroduction' | 'personalization'
  startDate: string
  goals: string[]
  medicalConditions: string[]
  allergies: string[]
  notes: string
}

interface Stats {
  daysOnDiet: number
  entriesLogged: number
  symptomsImprovement: number
  foodsTested: number
}

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  age: 0,
  gender: 'Outro',
  height: 0,
  weight: 0,
  dietPhase: 'elimination',
  startDate: new Date().toISOString().split('T')[0],
  goals: [],
  medicalConditions: [],
  allergies: [],
  notes: ''
}

const commonGoals = [
  'Reduzir dor abdominal',
  'Diminuir inchaço',
  'Melhorar digestão',
  'Identificar gatilhos alimentares',
  'Aumentar qualidade de vida',
  'Reduzir gases',
  'Regular trânsito intestinal'
]

const commonConditions = [
  'Síndrome do Intestino Irritável (SII)',
  'SIBO',
  'Doença de Crohn',
  'Retocolite Ulcerativa',
  'Dispepsia Funcional',
  'Gastrite',
  'Refluxo Gastroesofágico'
]

export function Profile() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile>(defaultProfile)
  const [stats, setStats] = useState<Stats>({
    daysOnDiet: 0,
    entriesLogged: 0,
    symptomsImprovement: 0,
    foodsTested: 0
  })

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile)
      setProfile(parsedProfile)
      setEditedProfile(parsedProfile)
    }

    // Calculate stats
    calculateStats()
  }, [])

  const calculateStats = () => {
    // Get diary entries from localStorage
    const entries = JSON.parse(localStorage.getItem('foodDiaryEntries') || '[]')
    
    // Calculate days on diet
    const startDate = new Date(profile.startDate || new Date())
    const today = new Date()
    const daysOnDiet = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    // Calculate entries logged
    const entriesLogged = entries.length

    // Calculate symptom improvement (mock calculation)
    const recentEntries = entries.slice(-7) // Last 7 entries
    const oldEntries = entries.slice(0, 7) // First 7 entries
    
    const recentAvgSeverity = recentEntries.length > 0 
      ? recentEntries.reduce((sum: number, entry: any) => sum + entry.severity, 0) / recentEntries.length
      : 0
    
    const oldAvgSeverity = oldEntries.length > 0
      ? oldEntries.reduce((sum: number, entry: any) => sum + entry.severity, 0) / oldEntries.length
      : 0

    const improvement = oldAvgSeverity > 0 
      ? Math.max(0, Math.round(((oldAvgSeverity - recentAvgSeverity) / oldAvgSeverity) * 100))
      : 0

    setStats({
      daysOnDiet: Math.max(0, daysOnDiet),
      entriesLogged,
      symptomsImprovement: improvement,
      foodsTested: 0 // This would be calculated based on reintroduction phase
    })
  }

  const saveProfile = () => {
    setProfile(editedProfile)
    localStorage.setItem('userProfile', JSON.stringify(editedProfile))
    setIsEditing(false)
    calculateStats()
  }

  const cancelEdit = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const toggleGoal = (goal: string) => {
    setEditedProfile(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const toggleCondition = (condition: string) => {
    setEditedProfile(prev => ({
      ...prev,
      medicalConditions: prev.medicalConditions.includes(condition)
        ? prev.medicalConditions.filter(c => c !== condition)
        : [...prev.medicalConditions, condition]
    }))
  }

  const getPhaseInfo = (phase: string) => {
    switch (phase) {
      case 'elimination':
        return { name: 'Eliminação', color: 'bg-red-100 text-red-800', description: 'Evitando alimentos ricos em FODMAP' }
      case 'reintroduction':
        return { name: 'Reintrodução', color: 'bg-yellow-100 text-yellow-800', description: 'Testando grupos de FODMAP sistematicamente' }
      case 'personalization':
        return { name: 'Personalização', color: 'bg-green-100 text-green-800', description: 'Dieta personalizada baseada na tolerância' }
      default:
        return { name: 'Não definida', color: 'bg-gray-100 text-gray-800', description: '' }
    }
  }

  const getBMI = () => {
    if (profile.height > 0 && profile.weight > 0) {
      const heightInMeters = profile.height / 100
      return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1)
    }
    return null
  }

  const phaseInfo = getPhaseInfo(profile.dietPhase)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Meu Perfil</h2>
          <p className="text-gray-600">Gerencie suas informações pessoais e acompanhe seu progresso</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Edit2 className="w-4 h-4" />
            <span>Editar</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={saveProfile}
              className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar</span>
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancelar</span>
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Dias na Dieta"
          value={stats.daysOnDiet.toString()}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Registros Feitos"
          value={stats.entriesLogged.toString()}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Melhora dos Sintomas"
          value={`${stats.symptomsImprovement}%`}
          icon={Award}
          color="purple"
        />
        <StatCard
          title="Alimentos Testados"
          value={stats.foodsTested.toString()}
          icon={Target}
          color="orange"
        />
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Informações Pessoais</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Seu nome completo"
                />
              ) : (
                <p className="text-gray-900">{profile.name || 'Não informado'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="seu@email.com"
                />
              ) : (
                <p className="text-gray-900">{profile.email || 'Não informado'}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.age || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Anos"
                  />
                ) : (
                  <p className="text-gray-900">{profile.age || 'Não informado'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gênero</label>
                {isEditing ? (
                  <select
                    value={editedProfile.gender}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, gender: e.target.value as any }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile.gender}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.height || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="170"
                  />
                ) : (
                  <p className="text-gray-900">{profile.height ? `${profile.height} cm` : 'Não informado'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.weight || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="70"
                  />
                ) : (
                  <p className="text-gray-900">{profile.weight ? `${profile.weight} kg` : 'Não informado'}</p>
                )}
              </div>
            </div>

            {getBMI() && (
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>IMC:</strong> {getBMI()}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fase da Dieta</label>
              {isEditing ? (
                <select
                  value={editedProfile.dietPhase}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, dietPhase: e.target.value as any }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="elimination">Eliminação</option>
                  <option value="reintroduction">Reintrodução</option>
                  <option value="personalization">Personalização</option>
                </select>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${phaseInfo.color}`}>
                    {phaseInfo.name}
                  </span>
                </div>
              )}
              {!isEditing && phaseInfo.description && (
                <p className="text-sm text-gray-600 mt-1">{phaseInfo.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Início</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedProfile.startDate}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">
                  {profile.startDate ? new Date(profile.startDate).toLocaleDateString('pt-BR') : 'Não informado'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>Objetivos</span>
        </h3>

        {isEditing ? (
          <div className="grid md:grid-cols-2 gap-2">
            {commonGoals.map(goal => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  editedProfile.goals.includes(goal)
                    ? 'border-blue-300 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile.goals.length > 0 ? (
              profile.goals.map(goal => (
                <span
                  key={goal}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {goal}
                </span>
              ))
            ) : (
              <p className="text-gray-600">Nenhum objetivo definido</p>
            )}
          </div>
        )}
      </div>

      {/* Medical Conditions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Condições Médicas</span>
        </h3>

        {isEditing ? (
          <div className="space-y-2">
            {commonConditions.map(condition => (
              <button
                key={condition}
                onClick={() => toggleCondition(condition)}
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  editedProfile.medicalConditions.includes(condition)
                    ? 'border-orange-300 bg-orange-50 text-orange-800'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile.medicalConditions.length > 0 ? (
              profile.medicalConditions.map(condition => (
                <span
                  key={condition}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                >
                  {condition}
                </span>
              ))
            ) : (
              <p className="text-gray-600">Nenhuma condição informada</p>
            )}
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Observações Pessoais</h3>
        {isEditing ? (
          <textarea
            value={editedProfile.notes}
            onChange={(e) => setEditedProfile(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Adicione qualquer observação relevante sobre sua jornada na dieta Low FODMAP..."
          />
        ) : (
          <p className="text-gray-700">
            {profile.notes || 'Nenhuma observação adicionada'}
          </p>
        )}
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, color }: {
  title: string
  value: string
  icon: any
  color: string
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  }

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-xl p-4 text-white`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-90">{title}</div>
    </div>
  )
}