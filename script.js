$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function(){

        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if($(window).scrollTop() > 68){
            $('header .header-2').addClass('header-active');
        }else{
            $('header .header-2').removeClass('header-active');
        }

        $('section').each(function(){

            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if(top >= offset && top < offset + height){
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }

        });

    });

    $('.home-slider').owlCarousel({
        items:1,
        nav:true,
        dots:false,
        autoplay:true,
        autoplayTimeout:8000,
        loop:true
    });

    $('.small-image img').click(function(){

        $(this).addClass('image-active').siblings().removeClass('image-active');
        let image = $(this).attr('src');
        $('.big-image img').attr('src', image);

    });

    $('.gallery .btn').click(function(){

        let filter = $(this).attr('data-filter');
        if(filter == 'all'){
            $('.gallery .box').show(400);
        }else{
            $('.gallery .box').not('.'+filter).hide(200);
            $('.gallery .box').filter('.'+filter).show(400);
        }

        $(this).addClass('button-active').siblings().removeClass('button-active');

    });

    /* ---------- carrinho de compras ---------- */

    const CART_KEY = 'loja-online-cart';
    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
        cart = [];
    }

    function saveCart(){
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
        } catch (e) {}
    }

    function money(value){
        return value.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
    }

    function renderCart(){
        const $items = $('#cart-items').empty();
        let total = 0;
        let count = 0;

        if(cart.length === 0){
            $items.append('<p class="cart-empty">seu carrinho está vazio</p>');
        }

        cart.forEach(function(item){
            total += item.price * item.qty;
            count += item.qty;

            const $row = $('<div class="cart-item"></div>').attr('data-id', item.id);
            const $img = $('<img alt="">').attr('src', item.img).on('error', function(){ $(this).css('visibility','hidden'); });
            const $info = $('<div class="cart-info"></div>')
                .append($('<h4></h4>').text(item.name))
                .append($('<span></span>').text(money(item.price)));
            const $qty = $('<div class="cart-qty"></div>')
                .append('<button type="button" class="cart-minus" aria-label="Diminuir">-</button>')
                .append($('<b></b>').text(item.qty))
                .append('<button type="button" class="cart-plus" aria-label="Aumentar">+</button>');
            const $remove = $('<button type="button" class="cart-remove fas fa-trash" aria-label="Remover"></button>');

            $row.append($img, $info, $qty, $remove);
            $items.append($row);
        });

        $('#cart-total').text(money(total));
        $('#cart-count').text(count).toggleClass('has-items', count > 0);
        saveCart();
    }

    function openCart(){
        $('#cart-drawer').addClass('open').attr('aria-hidden', 'false');
        $('#cart-overlay').addClass('open');
    }

    function closeCart(){
        $('#cart-drawer').removeClass('open').attr('aria-hidden', 'true');
        $('#cart-overlay').removeClass('open');
    }

    function toast(message){
        const $t = $('#cart-toast').text(message).addClass('show');
        clearTimeout($t.data('timer'));
        $t.data('timer', setTimeout(function(){ $t.removeClass('show'); }, 1800));
    }

    function addToCart(product){
        const found = cart.find(function(i){ return i.id === product.id; });
        if(found){
            found.qty += 1;
        }else{
            cart.push({ id:product.id, name:product.name, price:product.price, img:product.img, qty:1 });
        }
        renderCart();
        toast(product.name + ' adicionado ao carrinho');
    }

    $(document).on('click', '.add-to-cart', function(e){
        e.preventDefault();
        const $box = $(this).closest('[data-id]');
        addToCart({
            id: String($box.attr('data-id')),
            name: $box.attr('data-name'),
            price: Number($box.attr('data-price')),
            img: $box.attr('data-img')
        });
    });

    $(document).on('click', '.cart-plus, .cart-minus, .cart-remove', function(){
        const id = $(this).closest('.cart-item').attr('data-id');
        const item = cart.find(function(i){ return i.id === id; });
        if(!item) return;

        if($(this).hasClass('cart-plus')){
            item.qty += 1;
        }else if($(this).hasClass('cart-minus')){
            item.qty -= 1;
        }else{
            item.qty = 0;
        }

        cart = cart.filter(function(i){ return i.qty > 0; });
        renderCart();
    });

    $('#cart-btn').click(function(e){ e.preventDefault(); openCart(); });
    $('#cart-close, #cart-overlay').click(closeCart);
    $(document).on('keydown', function(e){ if(e.key === 'Escape') closeCart(); });
    $('#cart-clear').click(function(){ cart = []; renderCart(); });

    renderCart();

});
