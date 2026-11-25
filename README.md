# Loja Online

Site de loja virtual feito com HTML, CSS e JavaScript (jQuery). Mostra os produtos em vitrine, com filtro por categoria e carrinho de compras.

## Funcionalidades

- Menu responsivo para celular
- Carrossel de destaques na página inicial
- Seção de produtos novos com botão de adicionar ao carrinho
- Produto em destaque com troca de imagem
- Galeria com filtro por categoria (celular, notebook, fone, calçado)
- **Carrinho de compras**
  - adicionar produtos pelo ícone de carrinho ou pelo botão "comprar"
  - aumentar, diminuir e remover itens
  - total calculado em reais (R$)
  - o carrinho fica salvo no navegador (`localStorage`) e não se perde ao recarregar a página

## Tecnologias

- HTML5 e CSS3
- JavaScript e [jQuery 3.5.1](https://jquery.com/)
- [Owl Carousel 2](https://owlcarousel2.github.io/OwlCarousel2/)
- [Font Awesome 5](https://fontawesome.com/)

As bibliotecas são carregadas por CDN, então é preciso internet para o site aparecer completo.

## Como executar

Não precisa instalar nada.

```bash
git clone https://github.com/Alan-campos17/loja-online.git
cd loja-online
```

Abra o arquivo `index.html` no navegador. Se preferir um servidor local:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Estrutura do projeto

```
loja-online/
├── images/        # imagens dos produtos
├── index.html     # estrutura da página
├── script.js      # menu, carrossel, filtro e carrinho
├── style.css      # estilos
├── LICENSE
└── README.md
```

## Como adicionar um produto ao carrinho

Os produtos da seção de novidades usam atributos `data-*` no HTML:

```html
<div class="box" data-id="produto-1" data-name="smart tv" data-price="2000" data-img="images/produto-1.jpg">
    ...
    <a href="#" class="fas fa-shopping-cart add-to-cart"></a>
</div>
```

- `data-id`: identificador único do produto
- `data-name`: nome mostrado no carrinho
- `data-price`: preço em reais, só o número (sem R$ e sem pontos)
- `data-img`: caminho da imagem

## Próximos passos

- [ ] Finalizar o pedido pelo WhatsApp
- [ ] Busca de produtos
- [ ] Favoritos
- [ ] Adicionar as imagens que faltam na pasta `images`
- [ ] Lista de produtos em um arquivo de dados, em vez de escrita direto no HTML

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
