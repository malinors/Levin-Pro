"use client"

import { useState } from 'react'
import { Book, ChevronRight, ChevronDown, Info, AlertTriangle, CheckCircle } from 'lucide-react'

interface EducationTopic {
  id: string
  title: string
  content: string
  category: 'basics' | 'phases' | 'tips' | 'science'
  icon: string
}

const educationTopics: EducationTopic[] = [
  {
    id: '1',
    title: 'O que é FODMAP?',
    category: 'basics',
    icon: '🧬',
    content: `FODMAP é um acrônimo em inglês que significa:

• **F**ermentable (Fermentáveis)
• **O**ligosaccharides (Oligossacarídeos)
• **D**isaccharides (Dissacarídeos)
• **M**onosaccharides (Monossacarídeos)
• **A**nd **P**olyols (E Polióis)

São tipos de carboidratos de cadeia curta que são mal absorvidos no intestino delgado. Quando chegam ao intestino grosso, são fermentados pelas bactérias, causando sintomas como gases, inchaço, dor abdominal e alterações no trânsito intestinal.

A dieta Low FODMAP foi desenvolvida pela Universidade Monash na Austrália e é considerada o tratamento de primeira linha para a Síndrome do Intestino Irritável (SII).`
  },
  {
    id: '2',
    title: 'Quem deve seguir a dieta Low FODMAP?',
    category: 'basics',
    icon: '👥',
    content: `A dieta Low FODMAP é recomendada principalmente para pessoas com:

**Indicações principais:**
• Síndrome do Intestino Irritável (SII)
• SIBO (Supercrescimento Bacteriano do Intestino Delgado)
• Doença Inflamatória Intestinal em remissão
• Dispepsia funcional

**Sintomas que podem melhorar:**
• Dor e cólicas abdominais
• Inchaço e distensão abdominal
• Gases excessivos
• Diarreia ou constipação
• Sensação de evacuação incompleta

**⚠️ Importante:** Esta dieta deve ser seguida com orientação médica ou de nutricionista especializado. Não é recomendada para crianças, gestantes ou pessoas com transtornos alimentares sem supervisão profissional.`
  },
  {
    id: '3',
    title: 'Fase 1: Eliminação (2-6 semanas)',
    category: 'phases',
    icon: '🚫',
    content: `A primeira fase consiste em eliminar todos os alimentos ricos em FODMAP da dieta por 2 a 6 semanas.

**Objetivos:**
• Reduzir ou eliminar os sintomas digestivos
• Dar tempo para o intestino se recuperar
• Estabelecer uma linha de base para as próximas fases

**O que evitar:**
• Frutas: maçã, pêra, manga, melancia, cerejas
• Vegetais: cebola, alho, aspargo, alcachofra, couve-flor
• Grãos: trigo, centeio, cevada
• Laticínios com lactose
• Leguminosas: feijão, grão-de-bico, lentilha
• Adoçantes: sorbitol, manitol, xilitol

**Dicas importantes:**
• Leia sempre os rótulos dos alimentos
• Cozinhe em casa sempre que possível
• Mantenha um diário alimentar
• Seja paciente - os resultados podem levar algumas semanas`
  },
  {
    id: '4',
    title: 'Fase 2: Reintrodução (6-10 semanas)',
    category: 'phases',
    icon: '🔄',
    content: `Após a melhora dos sintomas, inicia-se a reintrodução sistemática dos FODMAPs.

**Como funciona:**
• Teste um grupo FODMAP por vez
• Comece com pequenas quantidades
• Aumente gradualmente a dose
• Monitore os sintomas cuidadosamente

**Grupos para testar (ordem sugerida):**
1. **Frutose:** mel, manga, maçã
2. **Lactose:** leite, iogurte, sorvete
3. **Frutanos:** trigo, cebola, alho
4. **Galactanos:** feijão, grão-de-bico, lentilha
5. **Polióis:** sorbitol (ameixa), manitol (couve-flor)

**Protocolo de teste:**
• Dia 1: dose baixa
• Dia 2: dose média
• Dia 3: dose alta
• Dias 4-6: pausa (dieta baixa FODMAP)
• Avalie sintomas e passe para o próximo grupo

**⚠️ Se houver sintomas:** Pare o teste e aguarde os sintomas passarem antes de continuar.`
  },
  {
    id: '5',
    title: 'Fase 3: Personalização (longo prazo)',
    category: 'phases',
    icon: '🎯',
    content: `A fase final é criar uma dieta personalizada baseada na sua tolerância individual.

**Objetivos:**
• Incluir o máximo de variedade alimentar possível
• Manter os sintomas controlados
• Garantir uma dieta nutricionalmente adequada

**Estratégias:**
• Inclua os FODMAPs que você tolera bem
• Limite ou evite aqueles que causam sintomas
• Respeite as porções toleradas
• Varie os alimentos ao longo da semana

**Dicas para o longo prazo:**
• Reavalie sua tolerância periodicamente
• Mantenha um diário alimentar ocasional
• Não seja muito restritivo desnecessariamente
• Busque orientação profissional quando necessário

**Lembre-se:** O objetivo não é seguir uma dieta baixa FODMAP para sempre, mas encontrar o seu equilíbrio pessoal.`
  },
  {
    id: '6',
    title: 'Dicas para o dia a dia',
    category: 'tips',
    icon: '💡',
    content: `Estratégias práticas para facilitar o seguimento da dieta:

**No supermercado:**
• Faça uma lista baseada em alimentos permitidos
• Leia sempre os ingredientes dos produtos
• Prefira alimentos naturais e minimamente processados
• Tenha cuidado com temperos prontos e molhos

**Na cozinha:**
• Use ervas frescas e especiarias para temperar
• Substitua cebola e alho por cebolinha verde (parte verde) e óleo de alho
• Prepare refeições em lotes e congele
• Tenha sempre lanches seguros disponíveis

**Fora de casa:**
• Pesquise o cardápio antes de ir ao restaurante
• Não hesite em fazer perguntas sobre os ingredientes
• Leve lanches seguros quando necessário
• Comunique suas restrições claramente

**Substituições úteis:**
• Leite comum → Leite sem lactose ou de amêndoas
• Pão de trigo → Pão sem glúten ou de aveia
• Cebola → Cebolinha verde (parte verde)
• Alho → Óleo de alho ou alho-poró (parte verde)
• Maçã → Banana ou morango`
  },
  {
    id: '7',
    title: 'Mitos e verdades sobre FODMAP',
    category: 'science',
    icon: '🔬',
    content: `Esclarecimentos sobre conceitos comuns:

**MITO:** "Dieta Low FODMAP é para sempre"
**VERDADE:** É um protocolo temporário para identificar gatilhos. O objetivo é personalizar a dieta.

**MITO:** "Todos os alimentos com glúten são ricos em FODMAP"
**VERDADE:** O problema não é o glúten, mas os frutanos presentes no trigo. Aveia é naturalmente sem glúten e baixa em FODMAP.

**MITO:** "Frutas são proibidas na dieta"
**VERDADE:** Muitas frutas são permitidas: banana, laranja, morango, uva, kiwi, entre outras.

**MITO:** "É uma dieta da moda sem base científica"
**VERDADE:** Tem mais de 15 anos de pesquisa e é recomendada por sociedades médicas internacionais.

**MITO:** "Posso fazer a dieta sozinho(a)"
**VERDADE:** É recomendado acompanhamento profissional para evitar deficiências nutricionais e garantir a execução correta.

**MITO:** "Se não melhorar, não funciona"
**VERDADE:** Cerca de 70% das pessoas com SII melhoram, mas outras condições podem estar presentes.`
  },
  {
    id: '8',
    title: 'Nutrientes importantes na dieta Low FODMAP',
    category: 'science',
    icon: '🥗',
    content: `Nutrientes que merecem atenção especial durante a dieta:

**Fibras:**
• A restrição pode reduzir a ingestão de fibras
• Inclua: aveia, quinoa, cenoura, abobrinha, banana
• Aumente gradualmente para evitar desconforto

**Cálcio:**
• Importante se você evita laticínios
• Fontes: leite sem lactose, queijos duros, sardinha, brócolis
• Considere suplementação se necessário

**Prebióticos:**
• FODMAPs são prebióticos naturais
• Na fase de personalização, inclua os que você tolera
• Outras fontes: aveia, banana verde, batata doce

**Vitaminas do complexo B:**
• Presentes em grãos integrais que podem ser restritos
• Inclua: quinoa, arroz integral, carnes, ovos
• Folhas verdes são excelentes fontes

**Ferro:**
• Importante especialmente para mulheres
• Fontes: carnes, aves, peixes, espinafre, quinoa
• Combine com vitamina C para melhor absorção

**⚠️ Importante:** Faça exames regulares e considere suplementação quando recomendado por profissional.`
  }
]

const categories = [
  { id: 'basics', name: 'Conceitos Básicos', icon: '📚' },
  { id: 'phases', name: 'Fases da Dieta', icon: '📋' },
  { id: 'tips', name: 'Dicas Práticas', icon: '💡' },
  { id: 'science', name: 'Ciência e Nutrição', icon: '🔬' }
]

export function Education() {
  const [selectedCategory, setSelectedCategory] = useState('basics')
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

  const filteredTopics = educationTopics.filter(topic => topic.category === selectedCategory)

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Educação FODMAP</h2>
        <p className="text-gray-600">Aprenda tudo sobre a dieta Low FODMAP e como aplicá-la corretamente</p>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl text-left transition-colors ${
                selectedCategory === category.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-50 hover:bg-green-50 text-gray-700'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-medium text-sm">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
          <Info className="w-5 h-5" />
          <span>Dica Importante</span>
        </h3>
        <p className="text-blue-100">
          A dieta Low FODMAP é um protocolo terapêutico que deve ser seguido com orientação profissional. 
          Não é uma dieta para emagrecimento, mas sim um tratamento para sintomas digestivos específicos.
        </p>
      </div>

      {/* Topics */}
      <div className="space-y-4">
        {filteredTopics.map(topic => (
          <TopicCard
            key={topic.id}
            topic={topic}
            isExpanded={expandedTopic === topic.id}
            onToggle={() => toggleTopic(topic.id)}
          />
        ))}
      </div>

      {/* Additional Resources */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Book className="w-5 h-5" />
          <span>Recursos Adicionais</span>
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900">App Oficial Monash FODMAP</h4>
              <p className="text-sm text-green-700">
                O aplicativo oficial da Universidade Monash com dados atualizados sobre alimentos
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Consulta com Nutricionista</h4>
              <p className="text-sm text-blue-700">
                Busque sempre orientação profissional especializada em FODMAP para melhores resultados
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Grupos de Apoio</h4>
              <p className="text-sm text-yellow-700">
                Participe de comunidades online para trocar experiências e receber apoio
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TopicCard({ topic, isExpanded, onToggle }: {
  topic: EducationTopic
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{topic.icon}</span>
            <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="prose prose-sm max-w-none">
            {topic.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null
              
              if (paragraph.startsWith('•')) {
                return (
                  <div key={index} className="flex items-start space-x-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">{paragraph.substring(1).trim()}</p>
                  </div>
                )
              }
              
              if (paragraph.includes('**') && paragraph.includes(':**')) {
                const [title, ...content] = paragraph.split(':**')
                return (
                  <div key={index} className="mb-3">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {title.replace(/\*\*/g, '')}:
                    </h4>
                    <p className="text-gray-700 text-sm">{content.join(':**')}</p>
                  </div>
                )
              }
              
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h4 key={index} className="font-semibold text-gray-900 mb-2 mt-4">
                    {paragraph.replace(/\*\*/g, '')}
                  </h4>
                )
              }
              
              return (
                <p key={index} className="text-gray-700 text-sm mb-3 leading-relaxed">
                  {paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/<strong>(.*?)<\/strong>/g, (match, p1) => p1)}
                </p>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}