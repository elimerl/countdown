// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@import url(\"https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap\");body{margin:0;font-family:\"Lato\", sans-serif}.App.svelte-fquoqz.svelte-fquoqz{text-align:center}.App.svelte-fquoqz p.svelte-fquoqz{margin:0.4rem}.App-header.svelte-fquoqz.svelte-fquoqz{background-color:rgb(15, 15, 15);color:whitesmoke;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px + 2vmin)}@keyframes svelte-fquoqz-App-logo-spin{from{transform:scale(1)}to{transform:scale(1.06)}}button.svelte-fquoqz.svelte-fquoqz{display:inline-block;padding:0.35em 1.2em;border:0.1em solid #ffffff;margin:0 0.3em 0.3em 0;border-radius:0.12em;box-sizing:border-box;text-decoration:none;font-weight:300;text-align:center;transition:all 0.2s}input.svelte-fquoqz.svelte-fquoqz{display:inline-block;padding:0.35em 1.2em;border:0.1em solid #ffffff;margin:0 0.3em 0.3em 0;border-radius:0.12em;box-sizing:border-box;text-decoration:none;font-weight:300;text-align:center;transition:all 0.2s}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}