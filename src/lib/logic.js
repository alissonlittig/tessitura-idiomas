import { cursos, turmas, planos } from './data.js';

export const vagasLivres = (t) => Math.max(0, t.capacidade - t.matriculados);
export const situacao = (t) => {
  const v = vagasLivres(t);
  return v === 0 ? 'lotada' : v <= 3 ? 'ultimas' : 'abertas';
};

export function filtrarTurmas(lista, { curso = '', nivel = '', turno = '', modalidade = '', soComVaga = false } = {}) {
  return lista.filter(
    (t) =>
      (!curso || t.curso === curso) &&
      (!nivel || t.nivel === nivel) &&
      (!turno || t.turno === turno) &&
      (!modalidade || t.modalidade === modalidade) &&
      (!soComVaga || vagasLivres(t) > 0)
  );
}

export const taxaMatricula = 120;

export function calcularMensalidade(cursoId, planoId) {
  const c = cursos.find((x) => x.id === cursoId);
  const p = planos.find((x) => x.id === planoId);
  if (!c || !p) return null;
  return Math.round(c.mensalidade * p.fator);
}

export const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export const dataBR = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });

export function validarAluno({ nome = '', email = '', telefone = '' }) {
  const erros = {};
  if (nome.trim().split(/\s+/).filter(Boolean).length < 2) erros.nome = 'Informe nome e sobrenome.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) erros.email = 'E-mail inválido.';
  if (telefone.replace(/\D/g, '').length < 10) erros.telefone = 'Telefone com DDD, por favor.';
  return erros;
}

export const turmaPorId = (id) => turmas.find((t) => t.id === id);
