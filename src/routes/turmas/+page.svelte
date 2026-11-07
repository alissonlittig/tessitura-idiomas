<script>
  import { onMount } from 'svelte';
  import { cursos, turmas, turnos, modalidades } from '../../lib/data.js';
  import { filtrarTurmas } from '../../lib/logic.js';
  import TurmaCard from '../../lib/TurmaCard.svelte';

  let f = $state({ curso: '', nivel: '', turno: '', modalidade: '', soComVaga: false });
  onMount(() => {
    const c = new URLSearchParams(location.search).get('curso');
    if (c && cursos.some((x) => x.id === c)) f.curso = c;
  });
  const niveis = $derived(f.curso ? cursos.find((c) => c.id === f.curso).niveis : [...new Set(cursos.flatMap((c) => c.niveis))]);
  $effect(() => { if (f.nivel && !niveis.includes(f.nivel)) f.nivel = ''; });
  const lista = $derived(filtrarTurmas(turmas, f));
  const limpar = () => (f = { curso: '', nivel: '', turno: '', modalidade: '', soComVaga: false });
</script>

<svelte:head>
  <title>Turmas abertas · Tessitura Idiomas</title>
  <meta name="description" content="Filtre as turmas do semestre por idioma, nível, turno e modalidade e veja as vagas em tempo real." />
</svelte:head>

<section>
  <div class="wrap">
    <p class="eyebrow">Semestre 2027.1</p>
    <h1>Turmas abertas</h1>
    <form class="filtros" onsubmit={(e) => e.preventDefault()} aria-label="Filtros de turmas">
      <label>Idioma
        <select bind:value={f.curso}><option value="">Todos</option>{#each cursos as c}<option value={c.id}>{c.nome}</option>{/each}</select>
      </label>
      <label>Nível
        <select bind:value={f.nivel}><option value="">Todos</option>{#each niveis as n}<option>{n}</option>{/each}</select>
      </label>
      <label>Turno
        <select bind:value={f.turno}><option value="">Todos</option>{#each Object.entries(turnos) as [k, v]}<option value={k}>{v}</option>{/each}</select>
      </label>
      <label>Modalidade
        <select bind:value={f.modalidade}><option value="">Todas</option>{#each Object.entries(modalidades) as [k, v]}<option value={k}>{v}</option>{/each}</select>
      </label>
      <label class="chk"><input type="checkbox" bind:checked={f.soComVaga} /> Só com vaga</label>
      <button type="button" class="btn sec" onclick={limpar}>Limpar</button>
    </form>

    <p class="cont" role="status" aria-live="polite">{lista.length} {lista.length === 1 ? 'turma encontrada' : 'turmas encontradas'}</p>
    {#if lista.length}
      <div class="grade">{#each lista as t (t.id)}<TurmaCard {t} />{/each}</div>
    {:else}
      <p class="vazio">Nenhuma turma com esses filtros. Tente outro turno ou modalidade, ou <button class="link" onclick={limpar}>limpe os filtros</button>.</p>
    {/if}
  </div>
</section>

<style>
  .filtros { display: flex; flex-wrap: wrap; gap: 1rem; align-items: end; margin: 2rem 0 1rem; padding: 1.2rem; background: var(--branco); border: 1px solid var(--linha); border-radius: var(--raio); }
  label { display: flex; flex-direction: column; gap: .3rem; font: 600 .78rem var(--sans); letter-spacing: .05em; text-transform: uppercase; color: var(--tinta2); flex: 1 1 150px; }
  select { min-height: 46px; padding: 0 .8rem; border-radius: 10px; border: 1.5px solid var(--linha); background: var(--papel); font: 500 1rem var(--sans); color: var(--tinta); }
  .chk { flex-direction: row; align-items: center; min-height: 46px; text-transform: none; letter-spacing: 0; font-size: .95rem; flex: 0 0 auto; }
  .chk input { width: 20px; height: 20px; accent-color: var(--terra); }
  .filtros .btn { min-height: 46px; }
  .cont { margin: 1rem 0 1.5rem; color: var(--tinta2); font-size: .92rem; }
  .grade { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 1.2rem; }
  .vazio { padding: 3rem 1rem; text-align: center; color: var(--tinta2); background: var(--papel2); border-radius: var(--raio); }
  .link { background: none; border: 0; padding: 0; font: inherit; color: var(--terra); text-decoration: underline; cursor: pointer; }
</style>
