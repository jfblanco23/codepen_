// script.js — con soporte para steps-inline (horizontal) y steps-container (vertical)

document.addEventListener('DOMContentLoaded', () => {
  // === PESTAÑAS PRINCIPALES ===
  document.querySelectorAll('.main-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.main-tab, .content').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');

      // Reiniciar subpestañas
      const subtabs = document.querySelector(`#${btn.dataset.target} .subtabs`);
      if (subtabs) {
        const first = subtabs.querySelector('.subtab');
        if (first) first.click();
      }
    });
  });

  // === SUBPESTAÑAS ===
  document.querySelectorAll('.subtab').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.subtabs').parentElement;
      container.querySelectorAll('.subtab, .subcontent').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
      container.querySelector(`#${btn.dataset.target}`).classList.add('active');
    });
  });

  // === MathJax ===
  const renderMath = (node) => {
    if (window.MathJax && MathJax.typeset) {
      MathJax.typeset([node]);
    }
  };

  // === PASO A PASO ===
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-step')) {
      const container = e.target.previousElementSibling;
      const isInline = container.classList.contains('steps-inline');
      const steps = JSON.parse(container.dataset.steps);
      const currentCount = container.children.length;

      if (currentCount < steps.length) {
        const div = document.createElement('div');
        div.className = 'step';
        div.innerHTML = steps[currentCount];
        container.appendChild(div);

        renderMath(div);

        // Highlight con retardo mínimo
        setTimeout(() => {
          div.classList.add('highlight');
          setTimeout(() => div.classList.remove('highlight'), 1200);
        }, 30);

        // Scroll suave al nuevo paso
        setTimeout(() => {
          div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      } else {
        e.target.textContent = '✅ Finalizado';
        e.target.disabled = true;
      }
    }
  });

  // Inicial
  const firstPropTab = document.querySelector('#prop-subtabs .subtab');
  if (firstPropTab) firstPropTab.click();
});