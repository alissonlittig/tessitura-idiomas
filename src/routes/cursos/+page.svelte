<script>
  import { resolve } from '$app/paths';
  import { cursos, turmas } from '../../lib/data.js';
  import { brl } from '../../lib/logic.js';
</script>

<svelte:head>
  <title>Cursos · Tessitura Idiomas</title>
  <meta name="description" content="Conheça os seis idiomas da Tessitura, níveis oferecidos e mensalidades." />
</svelte:head>

<section>
  <div class="wrap">
    <p class="eyebrow">Cursos</p>
    <h1>Escolha o seu idioma</h1>
    <p class="lead">Níveis do iniciante ao avançado, alinhados ao Quadro Europeu (A1 a C1).</p>
    <div class="lista">
      {#each cursos as c}
        <article style="--cor:{c.cor}">
          <p class="sd">{c.saudacao}</p>
          <h2>{c.nome}</h2>
          <p>{c.resumo}</p>
          <p class="dest">{c.destaque}</p>
          <p class="niveis">{#each c.niveis as n}<span class="chip">{n}</span> {/each}</p>
          <p class="rodape"><b>{brl(c.mensalidade)}</b>/mês no plano regular · {turmas.filter((t) => t.curso === c.id).length} turmas</p>
          <a class="btn sec" href={resolve('/turmas/') + '?curso=' + c.id}>Ver turmas de {c.nome}</a>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .lista { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr)); gap: 1.4rem; margin-top: 2.5rem; }
  article { background: var(--branco); border: 1px solid var(--linha); border-left: 6px solid var(--cor); border-radius: var(--raio); padding: 1.6rem; display: flex; flex-direction: column; gap: .7rem; }
  h2 { font-size: 1.9rem; }
  .sd { font: italic 500 1.2rem var(--serif); color: var(--cor); }
  .dest { font-size: .93rem; color: var(--tinta2); padding-left: .8rem; border-left: 2px solid var(--linha); }
  .rodape { font-size: .9rem; margin-top: auto; }
  .btn { margin-top: .4rem; }
</style>
