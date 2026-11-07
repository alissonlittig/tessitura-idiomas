<script>
  import '@fontsource-variable/fraunces';
  import '@fontsource-variable/inter';
  import '../app.css';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  let { children } = $props();
  const links = [['/cursos/', 'Cursos'], ['/turmas/', 'Turmas'], ['/matricula/', 'Matrícula']];
  let aberto = $state(false);
</script>

<a href="#main" class="sr">Pular para o conteúdo</a>
<header>
  <div class="wrap bar">
    <a class="marca" href={resolve('/')} aria-label="Tessitura Idiomas, início">
      <svg viewBox="0 0 64 64" width="34" height="34" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#14231f" /><path d="M14 22h36M32 22v28M20 50c8-4 16-4 24 0" fill="none" stroke="#e9a96b" stroke-width="5" stroke-linecap="round" /></svg>
      Tessitura
    </a>
    <button class="menu" aria-expanded={aberto} aria-controls="nav" onclick={() => (aberto = !aberto)}>{aberto ? 'Fechar' : 'Menu'}</button>
    <nav id="nav" class:aberto aria-label="Principal">
      {#each links as [href, nome]}
        <a href={resolve(href)} aria-current={page.url.pathname.startsWith(resolve(href)) ? 'page' : undefined} onclick={() => (aberto = false)}>{nome}</a>
      {/each}
      <a class="btn" href={resolve('/matricula/')} onclick={() => (aberto = false)}>Matricule-se</a>
    </nav>
  </div>
</header>

<main id="main">{@render children()}</main>

<footer>
  <div class="wrap grade">
    <div>
      <p class="f-marca">Tessitura Idiomas</p>
      <p>Escola de idiomas fictícia, criada como projeto de demonstração. Nomes, preços, turmas e contatos são inventados.</p>
    </div>
    <div>
      <p class="f-tit">Escola</p>
      <p>Rua das Palmeiras, 120 · Curitiba, PR<br />Seg a Sex 8h–21h · Sáb 8h–13h</p>
    </div>
    <div>
      <p class="f-tit">Explorar</p>
      <p>{#each links as [href, nome]}<a href={resolve(href)}>{nome}</a><br />{/each}</p>
    </div>
  </div>
  <p class="wrap legal">© 2027 Tessitura Idiomas (demonstração). Nenhuma matrícula feita aqui é real.</p>
</footer>

<style>
  header { position: sticky; top: 0; z-index: 20; background: color-mix(in srgb, var(--papel) 88%, transparent); backdrop-filter: blur(12px); border-bottom: 1px solid var(--linha); }
  .bar { display: flex; align-items: center; justify-content: space-between; min-height: 68px; }
  .marca { display: flex; align-items: center; gap: .6rem; font: 600 1.35rem var(--serif); text-decoration: none; letter-spacing: -.02em; }
  nav { display: flex; align-items: center; gap: 1.8rem; }
  nav a:not(.btn) { text-decoration: none; font-weight: 500; font-size: .95rem; padding: .4rem 0; border-bottom: 2px solid transparent; }
  nav a:not(.btn):hover, nav a[aria-current] { border-color: var(--terra); }
  nav .btn { min-height: 42px; }
  .menu { display: none; min-height: 44px; padding: 0 1.1rem; border-radius: 999px; border: 1.5px solid var(--tinta); background: none; font: 600 .9rem var(--sans); color: var(--tinta); }
  @media (max-width: 760px) {
    .menu { display: block; }
    nav { display: none; position: absolute; top: 68px; left: 0; right: 0; flex-direction: column; align-items: stretch; gap: 0; padding: 1rem 1.25rem 1.5rem; background: var(--papel); border-bottom: 1px solid var(--linha); }
    nav.aberto { display: flex; }
    nav a:not(.btn) { padding: .9rem 0; border-bottom: 1px solid var(--linha); }
    nav .btn { margin-top: 1rem; }
  }
  footer { background: var(--tinta); color: #cdd6cf; padding: 4rem 0 2rem; }
  .grade { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 2.5rem; font-size: .93rem; }
  .f-marca { font: 600 1.5rem var(--serif); color: var(--papel); margin-bottom: .6rem; }
  .f-tit { font: 600 .75rem var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ocre); margin-bottom: .6rem; }
  footer a { text-decoration: none; }
  footer a:hover { color: var(--ocre); }
  .legal { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #2f433d; font-size: .82rem; color: #9fb0a8; }
  @media (max-width: 760px) { .grade { grid-template-columns: 1fr; gap: 1.8rem; } }
</style>
