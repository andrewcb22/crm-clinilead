// =====================================================
// CLINILEAD ODONTO PRO - TYPES
// Sistema Multi-tenant para Clínicas Odontológicas
// =====================================================

export type PlanoAssinatura = 'start' | 'pro';
export type PapelUsuario = 'dono' | 'gestor' | 'secretaria';
export type OrigemLead = 'whatsapp' | 'instagram' | 'site' | 'indicacao' | 'outro';
export type StatusLead = 'novo' | 'em_contato' | 'orcamento_enviado' | 'agendado' | 'compareceu' | 'nao_fechou';
export type RiscoPerda = 'baixo' | 'medio' | 'alto';
export type TipoTimeline = 'mensagem' | 'nota' | 'status_change' | 'agendamento' | 'follow_up' | 'ia_action';
export type TipoLembrete = 'follow_up' | 'confirmacao' | 'reagendamento' | 'urgente';
export type DirecaoMensagem = 'entrada' | 'saida';
export type TipoMidia = 'texto' | 'imagem' | 'audio' | 'documento';
export type TipoScript = 'primeiro_contato' | 'orcamento' | 'recuperacao' | 'pre_consulta' | 'pos_consulta' | 'outro';
export type TipoInteracaoIA = 'resposta' | 'resumo' | 'diagnostico' | 'script' | 'relatorio' | 'insight' | 'analise';
export type TipoIntegracao = 'whatsapp' | 'instagram' | 'webhook' | 'api';
export type StatusIntegracao = 'sucesso' | 'erro';
export type TipoNotificacao = 'novo_lead' | 'follow_up' | 'mensagem' | 'risco_alto' | 'agendamento';

// =====================================================
// ENTIDADES PRINCIPAIS
// =====================================================

export interface Clinica {
  id: string;
  nome: string;
  telefone?: string;
  timezone: string;
  token_whatsapp?: string;
  token_instagram?: string;
  plano: PlanoAssinatura;
  limite_leads: number;
  limite_usuarios: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Usuario {
  id: string;
  clinica_id: string;
  auth_id?: string;
  nome: string;
  email: string;
  papel: PapelUsuario;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  clinica_id: string;
  responsavel_id?: string;
  nome: string;
  telefone?: string;
  email?: string;
  origem: OrigemLead;
  procedimento?: string;
  valor_estimado?: number;
  status: StatusLead;
  lead_score: number;
  risco_perda: RiscoPerda;
  ultima_interacao?: string;
  resumo_ia?: string;
  intencao_ia?: string;
  created_at: string;
  updated_at: string;
}

export interface TimelineLead {
  id: string;
  lead_id: string;
  usuario_id?: string;
  tipo: TipoTimeline;
  descricao: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface Lembrete {
  id: string;
  lead_id: string;
  usuario_id?: string;
  tipo: TipoLembrete;
  mensagem: string;
  data_agendada: string;
  concluido: boolean;
  created_at: string;
}

export interface MensagemWhatsApp {
  id: string;
  lead_id: string;
  direcao: DirecaoMensagem;
  conteudo: string;
  tipo_midia: TipoMidia;
  url_midia?: string;
  transcricao?: string;
  resumo_ia?: string;
  created_at: string;
}

export interface MensagemInstagram {
  id: string;
  lead_id: string;
  direcao: DirecaoMensagem;
  conteudo: string;
  username_instagram?: string;
  resumo_ia?: string;
  created_at: string;
}

export interface ScriptClinica {
  id: string;
  clinica_id: string;
  titulo: string;
  tipo: TipoScript;
  conteudo: string;
  gerado_ia: boolean;
  created_at: string;
  updated_at: string;
}

export interface InteracaoIA {
  id: string;
  clinica_id: string;
  lead_id?: string;
  usuario_id?: string;
  tipo: TipoInteracaoIA;
  prompt: string;
  resposta: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface ConfiguracaoClinica {
  id: string;
  clinica_id: string;
  categorias_procedimentos: string[];
  canais_origem: string[];
  diretrizes_ia?: string;
  horario_funcionamento?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface LogIntegracao {
  id: string;
  clinica_id: string;
  tipo: TipoIntegracao;
  status: StatusIntegracao;
  payload?: Record<string, any>;
  erro?: string;
  created_at: string;
}

export interface Notificacao {
  id: string;
  clinica_id: string;
  usuario_id?: string;
  lead_id?: string;
  tipo: TipoNotificacao;
  titulo: string;
  mensagem: string;
  lida: boolean;
  created_at: string;
}

// =====================================================
// TYPES AUXILIARES
// =====================================================

export interface DashboardStats {
  total_leads: number;
  leads_novos: number;
  agendamentos: number;
  comparecimentos: number;
  taxa_conversao: number;
  follow_ups_pendentes: number;
}

export interface LeadComDetalhes extends Lead {
  responsavel?: Usuario;
  ultima_mensagem?: string;
  total_mensagens?: number;
}

export interface FunilStats {
  novo: number;
  em_contato: number;
  orcamento_enviado: number;
  agendado: number;
  compareceu: number;
  nao_fechou: number;
}

export interface OrigemStats {
  origem: OrigemLead;
  total: number;
  percentual: number;
}

export interface ProcedimentoStats {
  procedimento: string;
  total: number;
  valor_total: number;
}

// =====================================================
// WEBHOOK PAYLOADS
// =====================================================

export interface WhatsAppWebhookPayload {
  from: string;
  message: string;
  type: TipoMidia;
  media_url?: string;
  timestamp: string;
}

export interface InstagramWebhookPayload {
  username: string;
  message: string;
  timestamp: string;
}

export interface FormSiteWebhookPayload {
  nome: string;
  telefone: string;
  email?: string;
  procedimento?: string;
  mensagem?: string;
}

// =====================================================
// IA PAYLOADS
// =====================================================

export interface IARespostaPayload {
  lead_id: string;
  contexto: string;
  historico: string[];
  tipo_resposta: 'primeira_mensagem' | 'follow_up' | 'orcamento' | 'recuperacao';
}

export interface IAResumoPayload {
  lead_id: string;
  mensagens: string[];
}

export interface IADiagnosticoPayload {
  lead_id: string;
  historico_completo: string;
  status_atual: StatusLead;
}

export interface IAScriptPayload {
  tipo: TipoScript;
  contexto?: string;
  diretrizes?: string;
}

export interface IARelatorioPayload {
  clinica_id: string;
  periodo: 'semanal' | 'mensal';
  data_inicio: string;
  data_fim: string;
}
