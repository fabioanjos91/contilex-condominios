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
document.getElementById('year').textContent = new Date().getFullYear();

// Envia os dados preenchidos para o WhatsApp comercial da Contilex.
// Não há banco de dados: o visitante revisa e envia a mensagem pelo próprio WhatsApp.
const form = document.getElementById('lead-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const message = [
    'Olá! Gostaria de solicitar uma conversa com a Contilex Condomínios.',
    '',
    `Nome: ${data.get('name')}`,
    `E-mail: ${data.get('email')}`,
    `Telefone: ${data.get('phone')}`,
    `Tipo de empreendimento: ${data.get('type')}`,
    `Solução de interesse: ${data.get('service')}`,
    `Mensagem: ${data.get('message') || 'Não informado'}`,
    '',
    'Enviei meus dados pelo formulário do site da Contilex.'
  ].join('\\n');

  const whatsappUrl = `https://wa.me/5543996055720?text=${encodeURIComponent(message)}`;
  const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    status.textContent = 'O WhatsApp foi aberto com sua mensagem. Revise os dados e toque em Enviar para concluir o contato.';
  } else {
    status.textContent = 'O navegador bloqueou a abertura do WhatsApp. Permita pop-ups ou acesse https://wa.me/5543996055720 e envie seus dados.';
  }
});
