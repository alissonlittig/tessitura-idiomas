<script>
  import { onMount } from 'svelte';
  import { resolve } from '$app/paths';
  import { cursos, turmas, planos } from '../../lib/data.js';
  import { vagasLivres, calcularMensalidade, taxaMatricula, brl, dataBR, validarAluno, turmaPorId } from '../../lib/logic.js';

  let passo = $state(1);
  let turmaId = $state('');
  let planoId = $state('regular');
  let aluno = $state({ nome: '', email: '', telefone: '' });
  let tocou = $state(false);
  let protocolo = $state('');

  onMount(() => {
    const t = new URLSearchParams(location.search).get('turma');
    if (t && turmaPorId(t)) { turmaId = t; passo = 2; }
  });

  const turma = $derived(turmaPorId(turmaId));
  const curso = $derived(turma && cursos.find((c) => c.id === turma.curso));
  const espera = $derived(turma && vagasLivres(turma) === 0);
  const mensal = $derived(turma ? calcularMensalidade(turma.curso, planoId) : 0);
  const erros = $derived(validarAluno(aluno));
  const nomes = ['Turma', 'Plano e dados', 'Revisão'];

  function avancar() {
    if (passo === 2) { tocou = true; if (Object.keys(erros).length) return; }
    passo += 1;
    document.getElementById('topo')?.scrollIntoView();
  }
  function confirmar() {
    protocolo = 'TSS-' + (turma.id + aluno.email).split('').reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 90000, 7).toString().padStart(5, '0');
    passo = 4;
    document.getElementById('topo')?.scrollIntoView();
  }
</script>

<svelte:head>
  <title>Matrícula online · Tessitura Idiomas</title>
  <meta name="description" content="Matricule-se em três passos: escolha a turma, o plano e confirme. Demonstração, nada é enviado." />
</svelte:head>

<section>
  <div class="wrap miolo">
    <p class="eyebrow" id="topo">Matrícula</p>
    <h1>Garanta a sua vaga</h1>

    {#if passo < 4}
      <ol class="passos" aria-label="Etapas">
        {#each nomes as n, i}<li class:atual={passo === i + 1} class:feito={passo > i + 1} aria-current={passo === i + 1 ? 'step' : undefined}><span>{i + 1}</span> {n}</li>{/each}
      </ol>
    {/if}

    {#if passo === 1}
      <fieldset class="lista">
        <legend>Escolha a turma</legend>
        {#each turmas as t (t.id)}
          {@const c = cursos.find((x) => x.id === t.curso)}
          <label class="op" class:sel={turmaId === t.id}>
            <input type="radio" name="turma" value={t.id} bind:group={turmaId} />
            <span><b>{c.nome} {t.nivel}</b> · {t.dias}, {t.hora}</span>
            <small>{vagasLivres(t) ? `${vagasLivres(t)} ${vagasLivres(t) === 1 ? "vaga" : "vagas"}` : 'lista de espera'}</small>
          </label>
        {/each}
      </fieldset>
      <button class="btn" disabled={!turmaId} onclick={avancar}>Continuar</button>
    {:else if passo === 2}
      <fieldset class="lista">
        <legend>Plano</legend>
        {#each planos as p}
          <label class="op" class:sel={planoId === p.id}>
            <input type="radio" name="plano" value={p.id} bind:group={planoId} />
            <span><b>{p.nome}</b> · {p.desc}</span>
            <small>{brl(calcularMensalidade(turma.curso, p.id))}/mês</small>
          </label>
        {/each}
      </fieldset>
      <fieldset class="campos">
        <legend>Seus dados</legend>
        <label>Nome completo
          <input bind:value={aluno.nome} autocomplete="name" aria-invalid={tocou && !!erros.nome} aria-describedby="e-nome" />
          <em id="e-nome" role="alert">{tocou ? erros.nome ?? '' : ''}</em>
        </label>
        <label>E-mail
          <input type="email" bind:value={aluno.email} autocomplete="email" aria-invalid={tocou && !!erros.email} aria-describedby="e-email" />
          <em id="e-email" role="alert">{tocou ? erros.email ?? '' : ''}</em>
        </label>
        <label>Telefone com DDD
          <input type="tel" bind:value={aluno.telefone} autocomplete="tel" aria-invalid={tocou && !!erros.telefone} aria-describedby="e-tel" />
          <em id="e-tel" role="alert">{tocou ? erros.telefone ?? '' : ''}</em>
        </label>
      </fieldset>
      <div class="acoes"><button class="btn sec" onclick={() => (passo = 1)}>Voltar</button><button class="btn" onclick={avancar}>Revisar</button></div>
    {:else if passo === 3}
      <div class="resumo">
        <h2>{curso.nome} {turma.nivel}</h2>
        <p>{turma.dias} · {turma.hora} · Prof. {turma.prof}</p>
        <p>Início em {dataBR(turma.inicio)}</p>
        <hr />
        <p class="l"><span>Mensalidade ({planos.find((p) => p.id === planoId).nome})</span><b>{brl(mensal)}</b></p>
        <p class="l"><span>Taxa de matrícula (única)</span><b>{brl(taxaMatricula)}</b></p>
        <hr />
        <p>{aluno.nome} · {aluno.email} · {aluno.telefone}</p>
        {#if espera}<p class="aviso">Turma lotada: você entra na lista de espera e é avisado se abrir vaga.</p>{/if}
      </div>
      <div class="acoes"><button class="btn sec" onclick={() => (passo = 2)}>Voltar</button><button class="btn" onclick={confirmar}>{espera ? 'Entrar na espera' : 'Confirmar matrícula'}</button></div>
    {:else}
      <div class="ok" role="status">
        <h2>{espera ? 'Você está na lista!' : 'Vaga reservada!'}</h2>
        <p>Protocolo <b>{protocolo}</b></p>
        <p>Isto é uma demonstração: nenhum dado foi enviado ou guardado. Em uma escola real, você receberia agora um e-mail com o boleto e o link do mural da turma.</p>
        <a class="btn" href={resolve('/')}>Voltar ao início</a>
      </div>
    {/if}
  </div>
</section>

<style>
  .miolo { max-width: 760px; }
  .passos { display: flex; gap: .5rem; list-style: none; padding: 0; margin: 2rem 0; font-size: .85rem; color: var(--tinta2); flex-wrap: wrap; }
  .passos li { display: flex; align-items: center; gap: .5rem; padding: .35rem .9rem .35rem .4rem; border-radius: 999px; border: 1px solid var(--linha); }
  .passos span { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: var(--papel2); font-weight: 700; }
  .passos .atual { border-color: var(--tinta); color: var(--tinta); font-weight: 600; }
  .passos .atual span, .passos .feito span { background: var(--tinta); color: var(--papel); }
  fieldset { border: 0; padding: 0; margin: 0 0 1.8rem; min-width: 0; }
  legend { font: 600 1.3rem var(--serif); margin-bottom: 1rem; padding: 0; }
  .lista { display: grid; gap: .6rem; }
  .op { display: grid; grid-template-columns: auto 1fr auto; gap: .8rem; align-items: center; padding: .9rem 1rem; min-height: 56px; background: var(--branco); border: 1.5px solid var(--linha); border-radius: 12px; cursor: pointer; }
  .op.sel { border-color: var(--terra); box-shadow: 0 0 0 3px #b4452e22; }
  .op input { width: 20px; height: 20px; accent-color: var(--terra); }
  .op small { font-weight: 600; color: var(--tinta2); white-space: nowrap; }
  .campos { display: grid; gap: 1rem; }
  .campos label { display: flex; flex-direction: column; gap: .35rem; font-weight: 600; font-size: .9rem; }
  .campos input { min-height: 48px; padding: 0 .9rem; border-radius: 10px; border: 1.5px solid var(--linha); background: var(--branco); font: 400 1rem var(--sans); }
  .campos input[aria-invalid='true'] { border-color: #b3261e; }
  em { font-style: normal; font-size: .82rem; font-weight: 500; color: #b3261e; min-height: 1.2em; }
  .acoes { display: flex; gap: .8rem; flex-wrap: wrap; }
  .resumo, .ok { background: var(--branco); border: 1px solid var(--linha); border-radius: var(--raio); padding: 1.8rem; display: grid; gap: .6rem; margin-bottom: 1.5rem; box-shadow: var(--sombra); }
  .ok { margin-top: 2rem; justify-items: start; }
  .ok b { font-family: var(--serif); font-size: 1.3rem; }
  hr { border: 0; border-top: 1px dashed var(--linha); margin: .6rem 0; width: 100%; }
  .l { display: flex; justify-content: space-between; gap: 1rem; }
  .aviso { background: #fbe6c8; padding: .7rem 1rem; border-radius: 10px; font-size: .92rem; }
</style>
