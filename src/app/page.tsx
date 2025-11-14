'use client';

import { 
  Users, 
  UserPlus, 
  Calendar, 
  CheckCircle, 
  TrendingUp, 
  AlertCircle,
  MessageSquare,
  Sparkles,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function Dashboard() {
  // Dados mockados para demonstração
  const stats = {
    total_leads: 247,
    leads_novos: 34,
    agendamentos: 18,
    comparecimentos: 12,
    taxa_conversao: 4.9,
    follow_ups_pendentes: 8,
  };

  const recentLeads = [
    { id: 1, nome: 'Maria Silva', origem: 'WhatsApp', procedimento: 'Implante', score: 85, status: 'novo' },
    { id: 2, nome: 'João Santos', origem: 'Instagram', procedimento: 'Clareamento', score: 72, status: 'em_contato' },
    { id: 3, nome: 'Ana Costa', origem: 'Site', procedimento: 'Ortodontia', score: 90, status: 'orcamento_enviado' },
    { id: 4, nome: 'Pedro Lima', origem: 'WhatsApp', procedimento: 'Limpeza', score: 65, status: 'agendado' },
  ];

  const getScoreBadge = (score: number) => {
    if (score >= 70) return 'bg-green-100 text-green-800';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      novo: 'bg-blue-100 text-blue-800',
      em_contato: 'bg-purple-100 text-purple-800',
      orcamento_enviado: 'bg-orange-100 text-orange-800',
      agendado: 'bg-green-100 text-green-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      novo: 'Novo',
      em_contato: 'Em Contato',
      orcamento_enviado: 'Orçamento Enviado',
      agendado: 'Agendado',
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral do seu negócio</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Insights IA</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Total Leads */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Leads</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total_leads}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">+12% vs mês anterior</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Leads Novos */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Leads Novos (7 dias)</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.leads_novos}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">+8% vs semana anterior</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Agendamentos */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Agendamentos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.agendamentos}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">+15% vs mês anterior</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Comparecimentos */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Comparecimentos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.comparecimentos}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowDown className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600 font-medium">-3% vs mês anterior</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Taxa de Conversão */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.taxa_conversao}%</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">+0.8% vs mês anterior</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Follow-ups Pendentes */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Follow-ups Pendentes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.follow_ups_pendentes}</p>
              <div className="flex items-center gap-1 mt-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-medium">Requer atenção</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Leads Recentes</h2>
          <p className="text-sm text-gray-600 mt-1">Últimos leads capturados pelo sistema</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Origem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Procedimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {lead.nome.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.nome}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{lead.origem}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{lead.procedimento}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getScoreBadge(lead.score)}`}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(lead.status)}`}>
                      {getStatusLabel(lead.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Ver todos os leads →
          </button>
        </div>
      </div>

      {/* IA Insights Preview */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">💡 Insight da Semana (IA)</h3>
            <p className="text-blue-100 mb-4">
              Seus leads do Instagram têm 23% mais chance de conversão quando respondidos em até 2 horas. 
              Considere ativar respostas automáticas com IA para esse canal.
            </p>
            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm">
              Ver Todos os Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
