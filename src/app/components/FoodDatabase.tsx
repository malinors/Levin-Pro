"use client"

import { useState, useMemo } from 'react'
import { Search, Filter, Star } from 'lucide-react'

interface Food {
  id: string
  name: string
  category: string
  fodmapLevel: 'low' | 'moderate' | 'high'
  portion: string
  description: string
  tips?: string
}

const brazilianFoods: Food[] = [
  // Frutas
  { id: '1', name: 'Banana', category: 'Frutas', fodmapLevel: 'low', portion: '1 unidade média', description: 'Rica em potássio, ótima para lanches' },
  { id: '2', name: 'Laranja', category: 'Frutas', fodmapLevel: 'low', portion: '1 unidade média', description: 'Fonte de vitamina C' },
  { id: '3', name: 'Mamão', category: 'Frutas', fodmapLevel: 'low', portion: '1 fatia média', description: 'Ajuda na digestão' },
  { id: '4', name: 'Maçã', category: 'Frutas', fodmapLevel: 'high', portion: 'Evitar', description: 'Alta em frutose e sorbitol' },
  { id: '5', name: 'Manga', category: 'Frutas', fodmapLevel: 'high', portion: 'Evitar', description: 'Rica em frutose' },
  { id: '6', name: 'Morango', category: 'Frutas', fodmapLevel: 'low', portion: '5 unidades', description: 'Baixo em FODMAP em pequenas porções' },
  { id: '7', name: 'Uva', category: 'Frutas', fodmapLevel: 'low', portion: '1 cacho pequeno', description: 'Consumir com moderação' },
  
  // Vegetais
  { id: '8', name: 'Alface', category: 'Vegetais', fodmapLevel: 'low', portion: 'À vontade', description: 'Excelente para saladas' },
  { id: '9', name: 'Tomate', category: 'Vegetais', fodmapLevel: 'low', portion: '1 unidade média', description: 'Rico em licopeno' },
  { id: '10', name: 'Cenoura', category: 'Vegetais', fodmapLevel: 'low', portion: '1 unidade média', description: 'Rica em betacaroteno' },
  { id: '11', name: 'Cebola', category: 'Vegetais', fodmapLevel: 'high', portion: 'Evitar', description: 'Alta em frutanos, use cebolinha verde (parte verde)' },
  { id: '12', name: 'Alho', category: 'Vegetais', fodmapLevel: 'high', portion: 'Evitar', description: 'Use óleo de alho ou alho-poró (parte verde)' },
  { id: '13', name: 'Abobrinha', category: 'Vegetais', fodmapLevel: 'low', portion: '1 xícara', description: 'Versátil e nutritiva' },
  { id: '14', name: 'Berinjela', category: 'Vegetais', fodmapLevel: 'low', portion: '1 xícara', description: 'Ótima grelhada ou refogada' },
  
  // Grãos e Cereais
  { id: '15', name: 'Arroz Branco', category: 'Grãos', fodmapLevel: 'low', portion: '1 xícara cozido', description: 'Base da alimentação brasileira' },
  { id: '16', name: 'Arroz Integral', category: 'Grãos', fodmapLevel: 'low', portion: '1 xícara cozido', description: 'Rico em fibras' },
  { id: '17', name: 'Quinoa', category: 'Grãos', fodmapLevel: 'low', portion: '1 xícara cozida', description: 'Proteína completa' },
  { id: '18', name: 'Aveia', category: 'Grãos', fodmapLevel: 'moderate', portion: '1/2 xícara', description: 'Consumir em pequenas quantidades' },
  { id: '19', name: 'Trigo', category: 'Grãos', fodmapLevel: 'high', portion: 'Evitar', description: 'Alto em frutanos, use farinha de arroz' },
  
  // Proteínas
  { id: '20', name: 'Frango', category: 'Proteínas', fodmapLevel: 'low', portion: '150g', description: 'Proteína magra e versátil' },
  { id: '21', name: 'Peixe', category: 'Proteínas', fodmapLevel: 'low', portion: '150g', description: 'Rico em ômega-3' },
  { id: '22', name: 'Ovos', category: 'Proteínas', fodmapLevel: 'low', portion: '2 unidades', description: 'Proteína completa' },
  { id: '23', name: 'Feijão', category: 'Proteínas', fodmapLevel: 'high', portion: 'Evitar', description: 'Alto em oligossacarídeos, use lentilha em pequenas porções' },
  
  // Laticínios
  { id: '24', name: 'Leite sem Lactose', category: 'Laticínios', fodmapLevel: 'low', portion: '1 copo', description: 'Alternativa segura ao leite comum' },
  { id: '25', name: 'Queijo Minas', category: 'Laticínios', fodmapLevel: 'low', portion: '30g', description: 'Baixo em lactose' },
  { id: '26', name: 'Iogurte sem Lactose', category: 'Laticínios', fodmapLevel: 'low', portion: '1 pote', description: 'Rico em probióticos' },
  { id: '27', name: 'Leite Comum', category: 'Laticínios', fodmapLevel: 'high', portion: 'Evitar', description: 'Alto em lactose' },
]

const categories = ['Todas', 'Frutas', 'Vegetais', 'Grãos', 'Proteínas', 'Laticínios']

export function FoodDatabase() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedLevel, setSelectedLevel] = useState('all')

  const filteredFoods = useMemo(() => {
    return brazilianFoods.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'Todas' || food.category === selectedCategory
      const matchesLevel = selectedLevel === 'all' || food.fodmapLevel === selectedLevel
      
      return matchesSearch && matchesCategory && matchesLevel
    })
  }, [searchTerm, selectedCategory, selectedLevel])

  const getFodmapColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getFodmapLabel = (level: string) => {
    switch (level) {
      case 'low': return 'Baixo FODMAP'
      case 'moderate': return 'Moderado'
      case 'high': return 'Alto FODMAP'
      default: return 'Desconhecido'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Banco de Alimentos</h2>
        <p className="text-gray-600">Consulte alimentos brasileiros e sua classificação FODMAP</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar alimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* FODMAP Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Todos os níveis</option>
            <option value="low">Baixo FODMAP</option>
            <option value="moderate">Moderado</option>
            <option value="high">Alto FODMAP</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredFoods.length} alimento{filteredFoods.length !== 1 ? 's' : ''} encontrado{filteredFoods.length !== 1 ? 's' : ''}
          </h3>
        </div>

        <div className="grid gap-4">
          {filteredFoods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum alimento encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou termo de busca</p>
          </div>
        )}
      </div>
    </div>
  )
}

function FoodCard({ food }: { food: Food }) {
  const getFodmapColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getFodmapLabel = (level: string) => {
    switch (level) {
      case 'low': return 'Baixo FODMAP'
      case 'moderate': return 'Moderado'
      case 'high': return 'Alto FODMAP'
      default: return 'Desconhecido'
    }
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-1">{food.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{food.category}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getFodmapColor(food.fodmapLevel)}`}>
          {getFodmapLabel(food.fodmapLevel)}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Porção recomendada:</span>
          <span className="font-medium text-gray-900">{food.portion}</span>
        </div>
        
        <p className="text-sm text-gray-700">{food.description}</p>
        
        {food.tips && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
            <p className="text-sm text-blue-800">
              <strong>Dica:</strong> {food.tips}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}