// =====================================================
// CLINILEAD ODONTO PRO - SUPABASE CLIENT
// =====================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =====================================================
// HELPERS DE AUTENTICAÇÃO
// =====================================================

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

// =====================================================
// HELPERS DE CLÍNICA (Multi-tenant)
// =====================================================

export async function getClinicaAtual(userId: string) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('clinica_id, clinicas(*)')
    .eq('auth_id', userId)
    .single();
  
  return { data, error };
}

// =====================================================
// HELPERS DE LEADS
// =====================================================

export async function getLeads(clinicaId: string, status?: string) {
  let query = supabase
    .from('leads')
    .select('*, responsavel:usuarios(nome)')
    .eq('clinica_id', clinicaId)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  return { data, error };
}

export async function getLeadById(leadId: string) {
  const { data, error } = await supabase
    .from('leads')
    .select(`
      *,
      responsavel:usuarios(nome, email),
      timeline:timeline_lead(*, usuario:usuarios(nome)),
      mensagens_whatsapp(*),
      mensagens_instagram(*),
      lembretes(*)
    `)
    .eq('id', leadId)
    .single();

  return { data, error };
}

export async function createLead(lead: any) {
  const { data, error } = await supabase
    .from('leads')
    .insert(lead)
    .select()
    .single();

  return { data, error };
}

export async function updateLead(leadId: string, updates: any) {
  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', leadId)
    .select()
    .single();

  return { data, error };
}

// =====================================================
// HELPERS DE TIMELINE
// =====================================================

export async function addTimelineEvent(event: any) {
  const { data, error } = await supabase
    .from('timeline_lead')
    .insert(event)
    .select()
    .single();

  return { data, error };
}

// =====================================================
// HELPERS DE MENSAGENS
// =====================================================

export async function addMensagemWhatsApp(mensagem: any) {
  const { data, error } = await supabase
    .from('mensagens_whatsapp')
    .insert(mensagem)
    .select()
    .single();

  return { data, error };
}

export async function addMensagemInstagram(mensagem: any) {
  const { data, error } = await supabase
    .from('mensagens_instagram')
    .insert(mensagem)
    .select()
    .single();

  return { data, error };
}

// =====================================================
// HELPERS DE SCRIPTS
// =====================================================

export async function getScripts(clinicaId: string) {
  const { data, error } = await supabase
    .from('scripts_clinica')
    .select('*')
    .eq('clinica_id', clinicaId)
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function createScript(script: any) {
  const { data, error } = await supabase
    .from('scripts_clinica')
    .insert(script)
    .select()
    .single();

  return { data, error };
}

// =====================================================
// HELPERS DE NOTIFICAÇÕES
// =====================================================

export async function getNotificacoes(usuarioId: string) {
  const { data, error } = await supabase
    .from('notificacoes')
    .select('*')
    .eq('usuario_id', usuarioId)
    .eq('lida', false)
    .order('created_at', { ascending: false })
    .limit(10);

  return { data, error };
}

export async function marcarNotificacaoLida(notificacaoId: string) {
  const { data, error } = await supabase
    .from('notificacoes')
    .update({ lida: true })
    .eq('id', notificacaoId);

  return { data, error };
}

// =====================================================
// HELPERS DE DASHBOARD
// =====================================================

export async function getDashboardStats(clinicaId: string) {
  // Total de leads
  const { count: total_leads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('clinica_id', clinicaId);

  // Leads novos (últimos 7 dias)
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
  
  const { count: leads_novos } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('clinica_id', clinicaId)
    .gte('created_at', seteDiasAtras.toISOString());

  // Agendamentos
  const { count: agendamentos } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('clinica_id', clinicaId)
    .eq('status', 'agendado');

  // Comparecimentos
  const { count: comparecimentos } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('clinica_id', clinicaId)
    .eq('status', 'compareceu');

  // Follow-ups pendentes
  const { count: follow_ups_pendentes } = await supabase
    .from('lembretes')
    .select('*, lead:leads!inner(clinica_id)', { count: 'exact', head: true })
    .eq('lead.clinica_id', clinicaId)
    .eq('concluido', false);

  const taxa_conversao = total_leads ? ((comparecimentos || 0) / total_leads) * 100 : 0;

  return {
    total_leads: total_leads || 0,
    leads_novos: leads_novos || 0,
    agendamentos: agendamentos || 0,
    comparecimentos: comparecimentos || 0,
    taxa_conversao: Math.round(taxa_conversao * 10) / 10,
    follow_ups_pendentes: follow_ups_pendentes || 0,
  };
}

export async function getFunilStats(clinicaId: string) {
  const { data } = await supabase
    .from('leads')
    .select('status')
    .eq('clinica_id', clinicaId);

  const stats = {
    novo: 0,
    em_contato: 0,
    orcamento_enviado: 0,
    agendado: 0,
    compareceu: 0,
    nao_fechou: 0,
  };

  data?.forEach((lead) => {
    if (lead.status in stats) {
      stats[lead.status as keyof typeof stats]++;
    }
  });

  return stats;
}
