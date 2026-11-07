<script>
  import { resolve } from '$app/paths';
  import { cursos, turnos, modalidades } from './data.js';
  import { vagasLivres, situacao, dataBR } from './logic.js';
  let { t } = $props();
  const curso = $derived(cursos.find((c) => c.id === t.curso));
  const s = $derived(situacao(t));
  const v = $derived(vagasLivres(t));
  const rotulo = $derived({ lotada: 'Lista de espera', ultimas: v === 1 ? "Última vaga" : `Últimas ${v} vagas`, abertas: `${v} vagas` }[s]);
</script>

<article class="card" style="--cor:{curso.cor}">
  <div class="topo">
    <span class="idioma">{curso.nome} <b>{t.nivel}</b></span>
    <span class="vaga {s}">{rotulo}</span>
  </div>
  <p class="quando">{t.dias} · {t.hora}</p>
  <p class="meta">{turnos[t.turno]} · {modalidades[t.modalidade]}</p>
  <p class="meta">Prof. {t.prof} · início {dataBR(t.inicio)}</p>
  <div class="barra" role="img" aria-label="{t.matriculados} de {t.capacidade} vagas ocupadas"><i style="width:{(t.matriculados / t.capacidade) * 100}%"></i></div>
  <a class="btn {s === 'lotada' ? 'sec' : ''}" href={resolve('/matricula/') + '?turma=' + t.id}>{s === 'lotada' ? 'Entrar na espera' : 'Escolher esta turma'}</a>
</article>

<style>
  .card { background: var(--branco); border: 1px solid var(--linha); border-top: 5px solid var(--cor); border-radius: var(--raio); padding: 1.3rem; display: flex; flex-direction: column; gap: .35rem; box-shadow: var(--sombra); }
  .topo { display: flex; justify-content: space-between; align-items: center; gap: .5rem; margin-bottom: .5rem; flex-wrap: wrap; }
  .idioma { font: 600 1.25rem var(--serif); }
  .idioma b { font: 600 .75rem var(--sans); padding: .15rem .5rem; border-radius: 6px; background: var(--papel2); margin-left: .3rem; vertical-align: middle; }
  .vaga { font: 600 .74rem var(--sans); padding: .22rem .65rem; border-radius: 999px; }
  .abertas { background: #dfeadb; color: #27502a; }
  .ultimas { background: #fbe6c8; color: #7a4308; }
  .lotada { background: #f3d9d3; color: #8a2b19; }
  .quando { font-weight: 600; }
  .meta { font-size: .9rem; color: var(--tinta2); }
  .barra { height: 6px; border-radius: 6px; background: var(--papel2); margin: .6rem 0 .9rem; overflow: hidden; }
  .barra i { display: block; height: 100%; background: var(--cor); }
  .btn { margin-top: auto; min-height: 44px; }
</style>
