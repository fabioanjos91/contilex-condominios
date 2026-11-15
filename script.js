// Navegação responsiva e formulário de contato Contilex.
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById('lead-form');
const status = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const labels = {
      name: 'Nome', condo: 'Condomínio', location: 'Bairro/cidade',
      units: 'Quantidade de unidades', employees: 'Funcionários próprios',
      manager: 'Administradora atual', type: 'Tipo de empreendimento',
      service: 'Principal necessidade', phone: 'Telefone/WhatsApp',
      email: 'E-mail', message: 'Informações adicionais'
    };
    const lines = ['Olá! Gostaria de conversar com a Contilex Condomínios.', ''];
    for (const [key, label] of Object.entries(labels)) {
      const value = data.get(key);
      if (value && String(value).trim()) lines.push(label + ': ' + value);
    }
    lines.push('', 'Enviei meus dados pelo formulário do site da Contilex.');
    // O formulário direciona para o WhatsApp oficial confirmado pela Contilex.
    const whatsappUrl = 'https://wa.me/5543988021267?text=' + encodeURIComponent(lines.join('\n'));
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (status) status.textContent = opened
      ? 'O WhatsApp foi aberto com sua mensagem. Revise os dados e toque em Enviar para concluir o contato.'
      : 'O navegador bloqueou a abertura do WhatsApp. Permita pop-ups ou acesse https://wa.me/5543988021267.';
  });
}