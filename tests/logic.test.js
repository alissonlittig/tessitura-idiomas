import { describe, it, expect } from 'vitest';
import { turmas } from '../src/lib/data.js';
import { filtrarTurmas, vagasLivres, situacao, calcularMensalidade, validarAluno } from '../src/lib/logic.js';

describe('turmas', () => {
  it('filtra por curso e nível', () => {
    const r = filtrarTurmas(turmas, { curso: 'ingles', nivel: 'A1' });
    expect(r.map((t) => t.id)).toEqual(['T-ING-A1-M', 'T-ING-A1-N']);
  });
  it('só com vaga remove lotadas', () => {
    expect(filtrarTurmas(turmas, { curso: 'ingles', nivel: 'A1', soComVaga: true })).toHaveLength(1);
  });
  it('situação', () => {
    expect(situacao({ capacidade: 10, matriculados: 10 })).toBe('lotada');
    expect(situacao({ capacidade: 10, matriculados: 8 })).toBe('ultimas');
    expect(vagasLivres({ capacidade: 10, matriculados: 4 })).toBe(6);
  });
  it('ids únicos e nenhuma turma acima da capacidade', () => {
    expect(new Set(turmas.map((t) => t.id)).size).toBe(turmas.length);
    expect(turmas.every((t) => t.matriculados <= t.capacidade)).toBe(true);
  });
});

describe('preço e validação', () => {
  it('plano anual dá 15% de desconto', () => {
    expect(calcularMensalidade('ingles', 'anual')).toBe(331);
  });
  it('curso inexistente', () => {
    expect(calcularMensalidade('x', 'anual')).toBeNull();
  });
  it('valida aluno', () => {
    expect(Object.keys(validarAluno({ nome: 'Ana', email: 'a', telefone: '1' }))).toHaveLength(3);
    expect(validarAluno({ nome: 'Ana Souza', email: 'ana@exemplo.com', telefone: '(41) 99999-0000' })).toEqual({});
  });
});
