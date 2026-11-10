# Contilex Condomínios — primeira versão

Site institucional estático, responsivo e independente do Manus.

## Arquivos
- `index.html`: página institucional, metadados SEO e dados estruturados iniciais.
- `styles.css`: identidade visual e layout responsivo.
- `script.js`: menu mobile e comportamento demonstrativo do formulário.
- `robots.txt` e `sitemap.xml`: arquivos básicos para rastreamento.

## Antes de publicar — obrigatório
1. Confirmar razão social/nome empresarial e descrição oficial da Contilex.
2. Substituir o logo tipográfico provisório pelo logotipo oficial, se houver.
3. Configurar telefone/WhatsApp, e-mail, endereço e área de atendimento reais.
4. Conectar o formulário a um destino real (CRM, endpoint seguro, e-mail ou WhatsApp). Atualmente ele é demonstrativo e não transmite dados.
5. Criar e publicar Política de Privacidade e adequar o formulário à LGPD.
6. Confirmar quais serviços a empresa efetivamente presta e revisar todos os textos.
7. Adicionar fotos reais, equipe, credenciais e depoimentos somente com autorização e comprovação.
8. Atualizar dados estruturados com telefone/endereço reais quando confirmados.
9. Configurar domínio e HTTPS no provedor escolhido.
10. Criar propriedade no Google Search Console e enviar o sitemap.

## Publicação
É um site estático. Pode ser publicado em Cloudflare Pages, Netlify, Vercel ou hospedagem tradicional que sirva HTML/CSS/JS. Não depende de banco de dados ou do Manus nesta versão.

Para hospedagem estática, envie o conteúdo desta pasta como raiz do site. Não altere o DNS do domínio até a nova publicação estar testada e o provedor de domínio estar confirmado.

## SEO incluído
- `lang="pt-BR"`, title e meta description.
- Canonical e Open Graph básicos.
- Hierarquia semântica de títulos e seções.
- JSON-LD Organization inicial, sem telefone/endereço inventados.
- `robots.txt` e `sitemap.xml`.

## Limitações conhecidas
- O formulário não envia leads ainda.
- Não há blog/CMS; a área de conteúdos é uma vitrine editorial inicial.
- O logo é provisório e tipográfico.
- Não foram inseridos endereço, telefone, e-mail, CNPJ, certificações, números de clientes ou depoimentos não confirmados.


## Identidade visual — versão baseada na logo oficial
- Símbolo oficial aplicado no cabeçalho e rodapé (`assets/contilex-simbolo.png`).
- Lockup completo disponível em `assets/contilex-logo.png`.
- Paleta: azul-marinho profundo e azul-claro, substituindo a proposta anterior em verde-petróleo.
- A logo foi extraída da imagem fornecida pelo cliente; revisar a transparência em fundos claros/escuros antes da publicação.


## Atualização institucional — Quem Somos
A seção Quem Somos foi atualizada com o texto institucional fornecido pelo cliente, incluindo missão, 17 anos de experiência prática, ética, transparência, relacionamento humano e gestão contábil/administrativa.


## Contatos e endereço adicionados
- Telefone fixo: (43) 3304-7545 (link tel:).
- WhatsApp: (43) 99605-5720 (link wa.me).
- Endereço: Rua Piauí, 106, Sala 02, Centro, Londrina–PR (link para busca no Google Maps).
- Dados estruturados LocalBusiness atualizados com telefone e endereço informados pelo cliente.


## Formulário conectado ao WhatsApp — versão 5
O formulário valida os campos obrigatórios e abre o WhatsApp comercial da Contilex (`+55 43 99605-5720`) com uma mensagem pré-preenchida contendo os dados informados. O visitante ainda precisa revisar e tocar em Enviar no WhatsApp. Não há armazenamento dos dados no site.
Antes de publicar, teste em computador e celular e publique uma Política de Privacidade adequada à operação.
Integração contínua: GitHub conectado ao Cloudflare Workers.
