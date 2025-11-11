"use client"

import { useState, useEffect } from 'react'
import { Calendar, Plus, Edit, Trash2, TrendingUp, AlertCircle } from 'lucide-react'

interface FoodEntry {
  id: string
  date: string
  meal: 'Café da Manhã' | 'Lanche da Manhã' | 'Almoço' | 'Lanche da Tarde' | 'Jantar' | 'Ceia'
  foods: string[]
  symptoms: string[]
  severity: 1 | 2 | 3 | 4 | 5
  notes?: string
}

interface Symptom {
  name: string
  icon: string
}

const commonSymptoms: Symptom[] = [
  { name: 'Dor abdominal', icon: '😣' },
  { name: 'Inchaço', icon: '🤰' },
  { name: 'Gases', icon: '💨' },
  { name: 'Diarreia', icon: '💩' },
  { name: 'Constipação', icon: '🚫' },
  { name: 'Náusea', icon: '🤢' },
  { name: 'Azia', icon: '🔥' },
  { name: 'Cólica', icon: '⚡' }
]

const meals = ['Café da Manhã', 'Lanche da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar', 'Ceia']

export function FoodDiary() {
  const [entries, setEntries] = useState<FoodEntry[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingEntry, setEditingEntry] = useState<FoodEntry | null>(null)

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('foodDiaryEntries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('foodDiaryEntries', JSON.stringify(entries))
  }, [entries])

  const addEntry = (entry: Omit<FoodEntry, 'id'>) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: Date.now().toString()
    }
    setEntries(prev => [...prev, newEntry])
    setShowAddForm(false)
  }

  const updateEntry = (updatedEntry: FoodEntry) => {
    setEntries(prev => prev.map(entry => 
      entry.id === updatedEntry.id ? updatedEntry : entry
    ))
    setEditingEntry(null)
  }

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const getEntriesForDate = (date: string) => {
    return entries.filter(entry => entry.date === date)
      .sort((a, b) => meals.indexOf(a.meal) - meals.indexOf(b.meal))
  }

  const getSymptomTrends = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split('T')[0]
    }).reverse()

    return last7Days.map(date => {
      const dayEntries = getEntriesForDate(date)
      const avgSeverity = dayEntries.length > 0 
        ? dayEntries.reduce((sum, entry) => sum + entry.severity, 0) / dayEntries.length
        : 0
      
      return {
        date,
        severity: avgSeverity,
        hasSymptoms: dayEntries.some(entry => entry.symptoms.length > 0)
      }
    })
  }

  const todayEntries = getEntriesForDate(selectedDate)
  const trends = getSymptomTrends()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Diário Alimentar</h2>
          <p className="text-gray-600">Registre suas refeições e sintomas para identificar padrões</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar</span>
        </button>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-gray-500" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
          <span className="text-gray-600">
            {todayEntries.length} registro{todayEntries.length !== 1 ? 's' : ''} neste dia
          </span>
        </div>
      </div>

      {/* Symptom Trends */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Tendência dos Sintomas (7 dias)</span>
        </h3>
        <div className="flex items-end space-x-2 h-20">
          {trends.map((day, index) => (
            <div key={day.date} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full rounded-t-lg transition-all ${
                  day.severity === 0 ? 'bg-gray-200' :
                  day.severity <= 2 ? 'bg-green-400' :
                  day.severity <= 3 ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}
                style={{ height: `${Math.max(day.severity * 16, 4)}px` }}
              ></div>
              <div className="text-xs text-gray-600 mt-1">
                {new Date(day.date).getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Sem sintomas</span>
          <span>Sintomas leves</span>
          <span>Sintomas moderados</span>
          <span>Sintomas severos</span>
        </div>
      </div>

      {/* Entries for Selected Date */}
      <div className="space-y-4">
        {todayEntries.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum registro para este dia</h3>
            <p className="text-gray-600 mb-4">Comece registrando sua primeira refeição</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition-colors"
            >
              Adicionar Registro
            </button>
          </div>
        ) : (
          todayEntries.map(entry => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onEdit={() => setEditingEntry(entry)}
              onDelete={() => deleteEntry(entry.id)}
            />
          ))
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingEntry) && (
        <EntryForm
          entry={editingEntry}
          date={selectedDate}
          onSave={editingEntry ? updateEntry : addEntry}
          onCancel={() => {
            setShowAddForm(false)
            setEditingEntry(null)
          }}
        />
      )}
    </div>
  )
}

function EntryCard({ entry, onEdit, onDelete }: {
  entry: FoodEntry
  onEdit: () => void
  onDelete: () => void
}) {
  const getSeverityColor = (severity: number) => {
    if (severity <= 2) return 'text-green-600 bg-green-100'
    if (severity <= 3) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getSeverityLabel = (severity: number) => {
    if (severity === 1) return 'Muito leve'
    if (severity === 2) return 'Leve'
    if (severity === 3) return 'Moderado'
    if (severity === 4) return 'Forte'
    return 'Muito forte'
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{entry.meal}</h3>
          <p className="text-sm text-gray-600">
            {new Date(entry.date).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Foods */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Alimentos consumidos:</h4>
          <div className="flex flex-wrap gap-2">
            {entry.foods.map((food, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {food}
              </span>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        {entry.symptoms.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              <span>Sintomas:</span>
            </h4>
            <div className="flex flex-wrap gap-2 mb-2">
              {entry.symptoms.map((symptom, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                >
                  {symptom}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Intensidade:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(entry.severity)}`}>
                {getSeverityLabel(entry.severity)}
              </span>
            </div>
          </div>
        )}

        {/* Notes */}
        {entry.notes && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Observações:</h4>
            <p className="text-gray-700 text-sm bg-gray-50 rounded-lg p-3">{entry.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function EntryForm({ entry, date, onSave, onCancel }: {
  entry?: FoodEntry | null
  date: string
  onSave: (entry: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    date: entry?.date || date,
    meal: entry?.meal || 'Café da Manhã',
    foods: entry?.foods.join(', ') || '',
    symptoms: entry?.symptoms || [],
    severity: entry?.severity || 1,
    notes: entry?.notes || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const entryData = {
      ...formData,
      foods: formData.foods.split(',').map(food => food.trim()).filter(Boolean),
      id: entry?.id
    }

    onSave(entryData)
  }

  const toggleSymptom = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {entry ? 'Editar Registro' : 'Novo Registro'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Refeição</label>
              <select
                value={formData.meal}
                onChange={(e) => setFormData(prev => ({ ...prev, meal: e.target.value as any }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                required
              >
                {meals.map(meal => (
                  <option key={meal} value={meal}>{meal}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alimentos (separados por vírgula)
            </label>
            <textarea
              value={formData.foods}
              onChange={(e) => setFormData(prev => ({ ...prev, foods: e.target.value }))}
              placeholder="Ex: Arroz, frango grelhado, salada de alface..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Sintomas</label>
            <div className="grid grid-cols-2 gap-2">
              {commonSymptoms.map(symptom => (
                <button
                  key={symptom.name}
                  type="button"
                  onClick={() => toggleSymptom(symptom.name)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    formData.symptoms.includes(symptom.name)
                      ? 'border-orange-300 bg-orange-50 text-orange-800'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg mr-2">{symptom.icon}</span>
                  <span className="text-sm">{symptom.name}</span>
                </button>
              ))}
            </div>
          </div>

          {formData.symptoms.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intensidade dos sintomas
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, severity: level as any }))}
                    className={`w-12 h-12 rounded-lg border-2 font-semibold transition-colors ${
                      formData.severity === level
                        ? level <= 2 ? 'border-green-500 bg-green-100 text-green-800'
                          : level <= 3 ? 'border-yellow-500 bg-yellow-100 text-yellow-800'
                          : 'border-red-500 bg-red-100 text-red-800'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">1 = Muito leve, 5 = Muito forte</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações (opcional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Adicione qualquer observação relevante..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              rows={3}
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-colors font-medium"
            >
              {entry ? 'Atualizar' : 'Salvar'} Registro
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}