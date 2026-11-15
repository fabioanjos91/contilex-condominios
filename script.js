// Navegação, consentimento de cookies, métricas e formulário Contilex.
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

const CONSENT_KEY = 'contilex_cookie_consent_v1';
const GA_ID = 'G-R2W04C1RNV';
let analyticsLoaded = false;

function readConsent() {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null'); }
  catch (_) { return null; }
}
function track(eventName, params = {}) {
  const consent = readConsent();
  if (consent && consent.analytics && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}
function loadAnalytics() {
  if (analyticsLoaded) return;
  analyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(tag);
}
function saveConsent(analytics) {
  const consent = {
    necessary: true,
    analytics: Boolean(analytics),
    updatedAt: new Date().toISOString(),
    version: 1
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  if (consent.analytics) loadAnalytics();
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.remove();
  const panel = document.getElementById('cookie-preferences');
  if (panel) panel.remove();
}
function openPreferences() {
  if (document.getElementById('cookie-preferences')) return;
  const current = readConsent();
  const panel = document.createElement('div');
  panel.id = 'cookie-preferences';
  panel.className = 'cookie-backdrop';
  panel.innerHTML = `
    <section class="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title">
      <button type="button" class="cookie-close" aria-label="Fechar">×</button>
      <p class="cookie-kicker">PRIVACIDADE E DADOS</p>
      <h2 id="cookie-preferences-title">Preferências de cookies</h2>
      <p>Os cookies necessários permitem que o site funcione e não podem ser desativados. Os cookies analíticos ajudam a entender o uso do site e só são ativados com sua autorização.</p>
      <div class="cookie-choice"><div><strong>Necessários</strong><small>Memorizam sua escolha de privacidade. Sempre ativos.</small></div><span class="cookie-always">Sempre ativos</span></div>
      <label class="cookie-choice" for="cookie-analytics"><span><strong>Analíticos (Google Analytics)</strong><small>Medem páginas visitadas e interações para melhorar o site.</small></span><input id="cookie-analytics" type="checkbox" ${current && current.analytics ? 'checked' : ''}></label>
      <div class="cookie-actions"><button type="button" class="cookie-button cookie-secondary" data-cookie-reject>Rejeitar analíticos</button><button type="button" class="cookie-button cookie-primary" data-cookie-save>Salvar preferências</button></div>
      <a class="cookie-policy-link" href="/politica-de-privacidade/">Consultar Política de Privacidade</a>
    </section>`;
  document.body.appendChild(panel);
  panel.querySelector('.cookie-close').addEventListener('click', () => panel.remove());
  panel.querySelector('[data-cookie-reject]').addEventListener('click', () => saveConsent(false));
  panel.querySelector('[data-cookie-save]').addEventListener('click', () => saveConsent(panel.querySelector('#cookie-analytics').checked));
}
function showCookieBanner() {
  if (readConsent()) {
    if (readConsent().analytics) loadAnalytics();
    return;
  }
  const banner = document.createElement('aside');
  banner.id = 'cookie-banner';
  banner.className = 'cookie-banner';
  banner.setAttribute('aria-label', 'Aviso de cookies');
  banner.innerHTML = `
    <div class="cookie-banner-copy"><strong>Sua privacidade importa.</strong><p>Usamos cookies necessários para o funcionamento do site. Com sua autorização, também usamos cookies analíticos do Google Analytics para entender a navegação. Você pode aceitar, rejeitar ou configurar.</p><a href="/politica-de-privacidade/">Saiba mais na Política de Privacidade</a></div>
    <div class="cookie-banner-actions"><button type="button" class="cookie-button cookie-secondary" data-cookie-reject>Rejeitar</button><button type="button" class="cookie-button cookie-secondary" data-cookie-settings>Configurar</button><button type="button" class="cookie-button cookie-primary" data-cookie-accept>Aceitar analíticos</button></div>`;
  document.body.appendChild(banner);
  banner.querySelector('[data-cookie-reject]').addEventListener('click', () => saveConsent(false));
  banner.querySelector('[data-cookie-accept]').addEventListener('click', () => saveConsent(true));
  banner.querySelector('[data-cookie-settings]').addEventListener('click', openPreferences);
}
document.addEventListener('click', event => {
  const settings = event.target.closest('[data-cookie-settings]');
  if (settings && settings.id !== 'cookie-banner-settings') {
    event.preventDefault();
    openPreferences();
  }
});
showCookieBanner();

// Cliques em WhatsApp: registra somente o evento e a página, nunca o telefone ou texto da mensagem.
document.querySelectorAll('a[href*="wa.me/"]').forEach(link => {
  link.addEventListener('click', () => {
    track('click_whatsapp', {
      page_path: window.location.pathname,
      link_location: link.classList.contains('whatsapp-float') ? 'floating_button' : 'content_link'
    });
  });
});

// O formulário prepara uma mensagem; o visitante ainda precisa confirmar o envio no WhatsApp.
const form = document.getElementById('lead-form');
const status = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', event => {
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
    const whatsappUrl = 'https://wa.me/5543988021267?text=' + encodeURIComponent(lines.join('\n'));
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    // Registra a intenção qualificada após validação e abertura solicitada do WhatsApp.
    // Não significa que o visitante efetivamente enviou a mensagem.
    track('generate_lead', {
      page_path: window.location.pathname,
      service_interest: String(data.get('service') || 'não informado'),
      form_name: 'solicitar_conversa'
    });
    if (status) status.textContent = opened
      ? 'O WhatsApp foi aberto com sua mensagem. Revise os dados e toque em Enviar para concluir o contato.'
      : 'O navegador bloqueou a abertura do WhatsApp. Permita pop-ups ou acesse https://wa.me/5543988021267.';
  });
}
