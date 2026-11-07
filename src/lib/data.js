// Dados fictícios: Tessitura Idiomas é uma escola de demonstração.
export const cursos = [
  { id: 'ingles', nome: 'Inglês', saudacao: 'Hello', cor: '#c8553d', resumo: 'Do primeiro café em Londres à reunião em videoconferência.', niveis: ['A1', 'A2', 'B1', 'B2', 'C1'], mensalidade: 389, destaque: 'Método conversacional com laboratório semanal de pronúncia.' },
  { id: 'espanhol', nome: 'Espanhol', saudacao: 'Hola', cor: '#b9892f', resumo: 'Da Península ao Rio da Prata: sotaques, gírias e cultura.', niveis: ['A1', 'A2', 'B1', 'B2'], mensalidade: 359, destaque: 'Turmas pequenas com professores nativos de três países.' },
  { id: 'frances', nome: 'Francês', saudacao: 'Bonjour', cor: '#3f6b8a', resumo: 'Preparação para DELF, viagens e estudos na França e no Canadá.', niveis: ['A1', 'A2', 'B1', 'B2'], mensalidade: 409, destaque: 'Simulados oficiais do DELF a cada semestre.' },
  { id: 'italiano', nome: 'Italiano', saudacao: 'Ciao', cor: '#5b7f4c', resumo: 'Língua, culinária e cinema em aulas que dão fome.', niveis: ['A1', 'A2', 'B1'], mensalidade: 379, destaque: 'Oficina mensal de culinária falada em italiano.' },
  { id: 'alemao', nome: 'Alemão', saudacao: 'Hallo', cor: '#6c5a8e', resumo: 'Gramática sem medo, com foco em trabalho e intercâmbio.', niveis: ['A1', 'A2', 'B1'], mensalidade: 429, destaque: 'Trilha para o exame Goethe-Zertifikat.' },
  { id: 'libras', nome: 'Libras', saudacao: 'Olá', cor: '#a8493f', resumo: 'Língua Brasileira de Sinais, com professores surdos.', niveis: ['Básico', 'Intermediário'], mensalidade: 299, destaque: 'Aulas conduzidas por professores surdos e intérprete.' }
];

export const turnos = { manha: 'Manhã', tarde: 'Tarde', noite: 'Noite', sabado: 'Sábado' };
export const modalidades = { presencial: 'Presencial', online: 'Online ao vivo', hibrida: 'Híbrida' };

// capacidade = vagas totais; matriculados = ocupadas hoje
export const turmas = [
  { id: 'T-ING-A1-M', curso: 'ingles', nivel: 'A1', turno: 'manha', dias: 'Seg e Qua', hora: '08h30–10h', modalidade: 'presencial', prof: 'Helena Brandt', inicio: '2027-02-08', capacidade: 12, matriculados: 7 },
  { id: 'T-ING-A1-N', curso: 'ingles', nivel: 'A1', turno: 'noite', dias: 'Ter e Qui', hora: '19h–20h30', modalidade: 'online', prof: 'Marcus Oyelaran', inicio: '2027-02-09', capacidade: 14, matriculados: 14 },
  { id: 'T-ING-B1-T', curso: 'ingles', nivel: 'B1', turno: 'tarde', dias: 'Seg e Qua', hora: '14h–15h30', modalidade: 'hibrida', prof: 'Helena Brandt', inicio: '2027-02-08', capacidade: 12, matriculados: 9 },
  { id: 'T-ING-B2-N', curso: 'ingles', nivel: 'B2', turno: 'noite', dias: 'Seg e Qua', hora: '19h–20h30', modalidade: 'presencial', prof: 'Dana Whitfield', inicio: '2027-02-08', capacidade: 10, matriculados: 8 },
  { id: 'T-ING-C1-S', curso: 'ingles', nivel: 'C1', turno: 'sabado', dias: 'Sábado', hora: '09h–12h', modalidade: 'presencial', prof: 'Dana Whitfield', inicio: '2027-02-13', capacidade: 8, matriculados: 3 },
  { id: 'T-ESP-A1-T', curso: 'espanhol', nivel: 'A1', turno: 'tarde', dias: 'Ter e Qui', hora: '15h–16h30', modalidade: 'presencial', prof: 'Valentina Ruiz', inicio: '2027-02-09', capacidade: 10, matriculados: 4 },
  { id: 'T-ESP-A2-N', curso: 'espanhol', nivel: 'A2', turno: 'noite', dias: 'Seg e Qua', hora: '19h–20h30', modalidade: 'online', prof: 'Tomás Aguirre', inicio: '2027-02-08', capacidade: 12, matriculados: 11 },
  { id: 'T-ESP-B1-M', curso: 'espanhol', nivel: 'B1', turno: 'manha', dias: 'Ter e Qui', hora: '09h–10h30', modalidade: 'hibrida', prof: 'Valentina Ruiz', inicio: '2027-02-09', capacidade: 10, matriculados: 5 },
  { id: 'T-FRA-A1-N', curso: 'frances', nivel: 'A1', turno: 'noite', dias: 'Ter e Qui', hora: '19h–20h30', modalidade: 'presencial', prof: 'Camille Durand', inicio: '2027-02-09', capacidade: 10, matriculados: 6 },
  { id: 'T-FRA-B1-S', curso: 'frances', nivel: 'B1', turno: 'sabado', dias: 'Sábado', hora: '09h–12h', modalidade: 'online', prof: 'Camille Durand', inicio: '2027-02-13', capacidade: 8, matriculados: 8 },
  { id: 'T-ITA-A1-T', curso: 'italiano', nivel: 'A1', turno: 'tarde', dias: 'Seg e Qua', hora: '16h–17h30', modalidade: 'presencial', prof: 'Giulia Ferraro', inicio: '2027-02-08', capacidade: 10, matriculados: 2 },
  { id: 'T-ITA-A2-N', curso: 'italiano', nivel: 'A2', turno: 'noite', dias: 'Ter e Qui', hora: '20h–21h30', modalidade: 'online', prof: 'Giulia Ferraro', inicio: '2027-02-09', capacidade: 10, matriculados: 9 },
  { id: 'T-ALE-A1-M', curso: 'alemao', nivel: 'A1', turno: 'manha', dias: 'Seg e Qua', hora: '08h–09h30', modalidade: 'hibrida', prof: 'Jonas Keller', inicio: '2027-02-08', capacidade: 8, matriculados: 5 },
  { id: 'T-ALE-B1-N', curso: 'alemao', nivel: 'B1', turno: 'noite', dias: 'Ter e Qui', hora: '19h–20h30', modalidade: 'presencial', prof: 'Jonas Keller', inicio: '2027-02-09', capacidade: 8, matriculados: 7 },
  { id: 'T-LIB-BAS-S', curso: 'libras', nivel: 'Básico', turno: 'sabado', dias: 'Sábado', hora: '14h–17h', modalidade: 'presencial', prof: 'Rafael Moura', inicio: '2027-02-13', capacidade: 12, matriculados: 10 },
  { id: 'T-LIB-INT-N', curso: 'libras', nivel: 'Intermediário', turno: 'noite', dias: 'Qua', hora: '19h–21h', modalidade: 'presencial', prof: 'Rafael Moura', inicio: '2027-02-10', capacidade: 12, matriculados: 4 }
];

export const planos = [
  { id: 'regular', nome: 'Regular', desc: '2 aulas por semana, 90 min cada', fator: 1 },
  { id: 'intensivo', nome: 'Intensivo', desc: '2 aulas + clube de conversação semanal', fator: 1.25 },
  { id: 'anual', nome: 'Anual', desc: 'Regular com 15% de desconto, em 12 parcelas', fator: 0.85 }
];

export const faq = [
  ['Preciso saber alguma coisa antes de começar?', 'Não. Se você nunca estudou, entra no A1. Se já estudou, o teste de nível gratuito (20 minutos) indica a turma certa.'],
  ['Posso trocar de turma depois de matriculado?', 'Sim, uma vez por semestre sem custo, desde que haja vaga no horário desejado.'],
  ['E se eu perder uma aula?', 'Toda aula é gravada no mural da turma, e você pode repor em outra turma do mesmo nível.'],
  ['Como funciona o cancelamento?', 'Até 7 dias após a primeira aula você pode cancelar com devolução integral da matrícula.']
];
