"use client"

import { useState } from 'react'
import { Clock, Users, ChefHat, Heart, Star } from 'lucide-react'

interface Recipe {
  id: string
  name: string
  description: string
  prepTime: number
  servings: number
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  category: string
  ingredients: string[]
  instructions: string[]
  tips?: string
  nutrition?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

const brazilianRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Arroz de Frango Low FODMAP',
    description: 'Versão adaptada do clássico brasileiro sem ingredientes ricos em FODMAP',
    prepTime: 45,
    servings: 4,
    difficulty: 'Médio',
    category: 'Pratos Principais',
    ingredients: [
      '2 xícaras de arroz branco',
      '500g de peito de frango em cubos',
      '1 cenoura em cubos',
      '1 abobrinha em cubos',
      '2 colheres de sopa de óleo de oliva',
      '1 colher de chá de açafrão',
      'Sal e pimenta a gosto',
      '4 xícaras de caldo de frango caseiro (sem cebola/alho)',
      'Cebolinha verde (só a parte verde) picada'
    ],
    instructions: [
      'Tempere o frango com sal e pimenta',
      'Aqueça o óleo em uma panela grande e doure o frango',
      'Adicione a cenoura e refogue por 3 minutos',
      'Acrescente o arroz e misture bem',
      'Adicione o caldo quente aos poucos, mexendo sempre',
      'Tempere com açafrão, sal e pimenta',
      'Cozinhe em fogo baixo por 20 minutos',
      'Nos últimos 5 minutos, adicione a abobrinha',
      'Finalize com cebolinha verde picada'
    ],
    tips: 'Use caldo de frango caseiro feito apenas com frango, cenoura, salsão e ervas. Evite cebola e alho.',
    nutrition: {
      calories: 380,
      protein: 28,
      carbs: 45,
      fat: 8
    }
  },
  {
    id: '2',
    name: 'Tapioca com Queijo',
    description: 'Lanche brasileiro tradicional, naturalmente sem glúten e baixo FODMAP',
    prepTime: 10,
    servings: 2,
    difficulty: 'Fácil',
    category: 'Lanches',
    ingredients: [
      '1 xícara de goma de tapioca',
      '100g de queijo minas frescal ralado',
      '1 pitada de sal',
      'Óleo para untar a frigideira'
    ],
    instructions: [
      'Aqueça uma frigideira antiaderente',
      'Espalhe a tapioca formando um círculo',
      'Deixe cozinhar até as bordas soltarem',
      'Adicione o queijo em metade da tapioca',
      'Dobre ao meio e sirva quente'
    ],
    tips: 'A tapioca fica mais saborosa se você deixar hidratar por alguns minutos antes de usar.',
    nutrition: {
      calories: 220,
      protein: 12,
      carbs: 35,
      fat: 6
    }
  },
  {
    id: '3',
    name: 'Smoothie de Banana com Mamão',
    description: 'Bebida refrescante e nutritiva com frutas brasileiras low FODMAP',
    prepTime: 5,
    servings: 1,
    difficulty: 'Fácil',
    category: 'Bebidas',
    ingredients: [
      '1 banana madura',
      '1 fatia média de mamão',
      '200ml de leite sem lactose',
      '1 colher de sopa de aveia (opcional)',
      'Gelo a gosto',
      'Mel a gosto (opcional)'
    ],
    instructions: [
      'Coloque todos os ingredientes no liquidificador',
      'Bata até obter consistência cremosa',
      'Adicione gelo se desejar mais gelado',
      'Sirva imediatamente'
    ],
    tips: 'Use banana bem madura para maior doçura natural. A aveia deve ser consumida com moderação.',
    nutrition: {
      calories: 280,
      protein: 10,
      carbs: 52,
      fat: 4
    }
  },
  {
    id: '4',
    name: 'Salada de Quinoa Brasileira',
    description: 'Salada nutritiva com quinoa e vegetais brasileiros low FODMAP',
    prepTime: 25,
    servings: 4,
    difficulty: 'Fácil',
    category: 'Saladas',
    ingredients: [
      '1 xícara de quinoa',
      '2 tomates em cubos',
      '1 pepino em cubos',
      '1 cenoura ralada',
      '1/2 xícara de milho (opcional)',
      'Folhas de alface',
      '3 colheres de sopa de azeite',
      '2 colheres de sopa de vinagre',
      'Sal e pimenta a gosto',
      'Cebolinha verde picada'
    ],
    instructions: [
      'Cozinhe a quinoa em água fervente por 15 minutos',
      'Escorra e deixe esfriar',
      'Misture todos os vegetais em uma tigela',
      'Adicione a quinoa fria',
      'Tempere com azeite, vinagre, sal e pimenta',
      'Finalize com cebolinha verde',
      'Sirva sobre folhas de alface'
    ],
    tips: 'A quinoa pode ser cozinhada com antecedência e guardada na geladeira por até 3 dias.',
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 48,
      fat: 10
    }
  },
  {
    id: '5',
    name: 'Peixe Grelhado com Legumes',
    description: 'Prato leve e saudável com peixe e vegetais brasileiros',
    prepTime: 30,
    servings: 2,
    difficulty: 'Médio',
    category: 'Pratos Principais',
    ingredients: [
      '2 filés de peixe (tilápia ou pescada)',
      '1 abobrinha em fatias',
      '1 berinjela em fatias',
      '2 tomates em fatias',
      '3 colheres de sopa de azeite',
      'Suco de 1 limão',
      'Sal e pimenta a gosto',
      'Ervas frescas (manjericão, salsa)',
      '1 colher de chá de páprica'
    ],
    instructions: [
      'Tempere o peixe com sal, pimenta e limão',
      'Deixe marinar por 15 minutos',
      'Aqueça uma grelha ou frigideira',
      'Grelhe os legumes com um pouco de azeite',
      'Grelhe o peixe por 4-5 minutos de cada lado',
      'Regue com azeite e limão',
      'Finalize com ervas frescas'
    ],
    tips: 'Não deixe o peixe cozinhar demais para manter a textura macia.',
    nutrition: {
      calories: 290,
      protein: 35,
      carbs: 12,
      fat: 12
    }
  }
]

const categories = ['Todas', 'Pratos Principais', 'Lanches', 'Bebidas', 'Saladas', 'Sobremesas']

export function Recipes() {
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const filteredRecipes = brazilianRecipes.filter(recipe => 
    selectedCategory === 'Todas' || recipe.category === selectedCategory
  )

  if (selectedRecipe) {
    return <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Receitas Brasileiras</h2>
        <p className="text-gray-600">Deliciosas receitas Low FODMAP com ingredientes brasileiros</p>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredRecipes.map(recipe => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            onClick={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>
    </div>
  )
}

function RecipeCard({ recipe, onClick }: { recipe: Recipe; onClick: () => void }) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-600 bg-green-100'
      case 'Médio': return 'text-yellow-600 bg-yellow-100'
      case 'Difícil': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
          {recipe.difficulty}
        </span>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{recipe.prepTime} min</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{recipe.servings} porções</span>
        </div>
        <div className="flex items-center space-x-1">
          <ChefHat className="w-4 h-4" />
          <span>{recipe.category}</span>
        </div>
      </div>

      {recipe.nutrition && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="grid grid-cols-4 gap-2 text-xs text-center">
            <div>
              <div className="font-semibold text-gray-900">{recipe.nutrition.calories}</div>
              <div className="text-gray-600">kcal</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">{recipe.nutrition.protein}g</div>
              <div className="text-gray-600">proteína</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">{recipe.nutrition.carbs}g</div>
              <div className="text-gray-600">carbs</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">{recipe.nutrition.fat}g</div>
              <div className="text-gray-600">gordura</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RecipeDetail({ recipe, onBack }: { recipe: Recipe; onBack: () => void }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          ←
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{recipe.name}</h2>
          <p className="text-gray-600">{recipe.description}</p>
        </div>
      </div>

      {/* Recipe Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Clock className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <div className="font-semibold text-gray-900">{recipe.prepTime} min</div>
            <div className="text-sm text-gray-600">Preparo</div>
          </div>
          <div>
            <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <div className="font-semibold text-gray-900">{recipe.servings}</div>
            <div className="text-sm text-gray-600">Porções</div>
          </div>
          <div>
            <Star className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
            <div className="font-semibold text-gray-900">{recipe.difficulty}</div>
            <div className="text-sm text-gray-600">Dificuldade</div>
          </div>
        </div>
      </div>

      {/* Nutrition */}
      {recipe.nutrition && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Nutricionais (por porção)</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{recipe.nutrition.calories}</div>
              <div className="text-sm text-gray-600">Calorias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{recipe.nutrition.protein}g</div>
              <div className="text-sm text-gray-600">Proteína</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{recipe.nutrition.carbs}g</div>
              <div className="text-sm text-gray-600">Carboidratos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{recipe.nutrition.fat}g</div>
              <div className="text-sm text-gray-600">Gordura</div>
            </div>
          </div>
        </div>
      )}

      {/* Ingredients */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingredientes</h3>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Modo de Preparo</h3>
        <ol className="space-y-4">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="flex space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <p className="text-gray-700 pt-1">{instruction}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Tips */}
      {recipe.tips && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Dica do Chef</h3>
          <p className="text-blue-800">{recipe.tips}</p>
        </div>
      )}
    </div>
  )
}