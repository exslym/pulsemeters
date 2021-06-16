$(document).ready(function() {
    // Slider
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider/slider-prev.png" alt="prev"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/slider/slider-next.png" alt="next"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    // Catalog tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // Catalog cards
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__mode1').eq(i).toggleClass('catalog-item__mode1_active');
                $('.catalog-item__mode2').eq(i).toggleClass('catalog-item__mode2_active');
            });
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal
    $('[data-modal=modal-consult]').on('click', function() {
        $('.overlay, #modal-consult').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #modal-consult, #modal-order, #modal-thanks').fadeOut();
    });

    // Modal-order
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#modal-order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #modal-order').fadeIn('slow');
        });
    });

    // Validation
    function validateForm(form) {
        $(form).validate({
            rules: { 
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                  required: true,
                  email: true
                }
              },
            messages: {
                name: {
                    required: "Пожалуйста, укажите Ваше имя", 
                    minlength: jQuery.validator.format("Необходимо ввести минимум {0} символа!")
                },
                phone: "Пожалуйста, укажите Ваш номер телефона",
                email: {
                    required: "Пожалуйста, укажите Ваш email",
                    email: "Необходимо ввести корректный email формата name@domain.com"
                }
            }
        });
    };
    validateForm('.consultation form');
    validateForm('#modal-consult form');
    validateForm('#modal-order form');

    // Phone mask
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // Mail sender on submit
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#modal-consult, #modal-order').fadeOut();
            $('.overlay, #modal-thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll & page up
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top + "px"});
        return false;
    });

    AOS.init();

});