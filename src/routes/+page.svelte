<script>
  import { resolve } from '$app/paths';
  import { cursos, turmas, faq } from '../lib/data.js';
  import { vagasLivres, brl } from '../lib/logic.js';
  import TurmaCard from '../lib/TurmaCard.svelte';
  const destaque = turmas.filter((t) => vagasLivres(t) > 0 && vagasLivres(t) <= 3).slice(0, 3);
  const palavras = ['Hello', 'Hola', 'Bonjour', 'Ciao', 'Hallo', 'Olá'];
</script>

<svelte:head>
  <title>Tessitura Idiomas · Inglês, espanhol, francês, italiano, alemão e Libras</title>
  <meta name="description" content="Escola de idiomas em Curitiba (demonstração): turmas pequenas, professores nativos e matrícula online em 3 minutos." />
</svelte:head>

<section class="hero">
  <div class="wrap">
    <p class="eyebrow">Escola de idiomas · Curitiba</p>
    <h1>Aprender uma língua é <em>tecer</em> um novo jeito de estar no mundo.</h1>
    <p class="lead">Turmas de até 14 pessoas, professores que vivem a língua e uma matrícula que cabe em três minutos.</p>
    <div class="acoes">
      <a class="btn" href={resolve('/matricula/')}>Quero me matricular</a>
      <a class="btn sec" href={resolve('/turmas/')}>Ver turmas abertas</a>
    </div>
    <ul class="ola" aria-hidden="true">{#each palavras as p}<li>{p}</li>{/each}</ul>
    <dl class="nums">
      <div><dt>6</dt><dd>idiomas</dd></div>
      <div><dt>14</dt><dd>alunos no máximo</dd></div>
      <div><dt>92%</dt><dd>recomendam*</dd></div>
    </dl>
  </div>
</section>

<section class="cursos">
  <div class="wrap">
    <p class="eyebrow">Cursos</p>
    <h2>Seis idiomas, cada um com a sua cadência.</h2>
    <div class="lista">
      {#each cursos as c}
        <a class="curso" href={resolve('/turmas/') + '?curso=' + c.id} style="--cor:{c.cor}">
          <span class="sd">{c.saudacao}</span>
          <h3>{c.nome}</h3>
          <p>{c.resumo}</p>
          <span class="preco">a partir de {brl(Math.round(c.mensalidade * 0.85))}/mês →</span>
        </a>
      {/each}
    </div>
  </div>
</section>

{#if destaque.length}
<section class="fechando">
  <div class="wrap">
    <p class="eyebrow">Corre que acaba</p>
    <h2>Turmas com poucas vagas.</h2>
    <div class="turmas">{#each destaque as t (t.id)}<TurmaCard {t} />{/each}</div>
  </div>
</section>
{/if}

<section class="como">
  <div class="wrap">
    <p class="eyebrow">Como funciona</p>
    <h2>Da dúvida à primeira aula em três passos.</h2>
    <ol>
      <li><b>1</b><h3>Escolha o idioma</h3><p>Filtre por nível, turno e modalidade. Não sabe o nível? O teste é gratuito.</p></li>
      <li><b>2</b><h3>Reserve a turma</h3><p>A vaga fica guardada por 48 horas enquanto você confere os dados.</p></li>
      <li><b>3</b><h3>Comece a falar</h3><p>Receba o material e o link do mural da turma antes da primeira aula.</p></li>
    </ol>
  </div>
</section>

<section class="faq">
  <div class="wrap estreito">
    <p class="eyebrow">Dúvidas</p>
    <h2>Perguntas frequentes</h2>
    {#each faq as [q, a]}
      <details><summary>{q}</summary><p>{a}</p></details>
    {/each}
    <p class="nota">*Dado fictício, apenas para ilustrar o layout.</p>
  </div>
</section>

<style>
  .hero { padding-top: clamp(3rem, 8vw, 6rem); background: radial-gradient(900px 400px at 85% 0%, #f1ddbd 0%, transparent 70%); }
  .hero h1 { max-width: 15ch; margin: 1rem 0 1.4rem; }
  .hero em { font-style: italic; color: var(--terra); }
  .acoes { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 2rem; }
  .ola { display: flex; flex-wrap: wrap; gap: .5rem 1.2rem; list-style: none; padding: 0; margin: 3rem 0 0; font: italic 500 1.6rem var(--serif); color: #b7ab92; }
  .nums { display: flex; flex-wrap: wrap; gap: 1rem 3rem; margin: 2.5rem 0 0; padding-top: 1.5rem; border-top: 1px solid var(--linha); }
  .nums dt { font: 600 2.2rem var(--serif); }
  .nums dd { margin: 0; font-size: .85rem; color: var(--tinta2); }
  .lista { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 1.2rem; margin-top: 2.5rem; }
  .curso { display: flex; flex-direction: column; gap: .5rem; padding: 1.6rem; border-radius: var(--raio); background: var(--branco); border: 1px solid var(--linha); text-decoration: none; position: relative; overflow: hidden; transition: transform .25s, box-shadow .25s; }
  .curso:hover { transform: translateY(-4px); box-shadow: var(--sombra); }
  .curso::after { content: ''; position: absolute; inset: 0 0 auto 0; height: 5px; background: var(--cor); }
  .sd { font: italic 500 1.6rem var(--serif); color: var(--cor); }
  .curso p { color: var(--tinta2); font-size: .95rem; }
  .preco { margin-top: auto; padding-top: .8rem; font-weight: 600; font-size: .9rem; }
  .fechando { background: var(--papel2); }
  .turmas { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 1.2rem; margin-top: 2.5rem; }
  .como { background: var(--tinta); color: var(--papel); }
  .como .eyebrow { color: var(--ocre); }
  .como ol { list-style: none; padding: 0; margin: 2.5rem 0 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 2rem; }
  .como b { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; background: var(--ocre); color: var(--tinta); font: 700 1rem var(--serif); margin-bottom: 1rem; }
  .como p { color: #b9c6bf; margin-top: .5rem; }
  .estreito { max-width: 760px; }
  details { border-bottom: 1px solid var(--linha); padding: 1.1rem 0; }
  summary { cursor: pointer; font: 600 1.05rem var(--sans); list-style: none; display: flex; justify-content: space-between; gap: 1rem; }
  summary::after { content: '+'; font-size: 1.4rem; line-height: 1; color: var(--terra); }
  details[open] summary::after { content: '–'; }
  details p { margin-top: .7rem; color: var(--tinta2); }
  .faq h2 { margin: .8rem 0 1.5rem; }
  .nota { margin-top: 1.5rem; font-size: .8rem; color: var(--tinta2); }
</style>
