(function ($) {
  function errorText(xhr) {
    var data = xhr.responseJSON || {};
    if (Array.isArray(data.errors) && data.errors.length) {
      return data.errors.join(' ');
    }
    if (data.error && typeof data.error === 'object') {
      return Object.values(data.error).join(' ');
    }
    if (typeof data.message === 'string' && data.message) {
      return data.message;
    }
    return 'Please check the form and try again.';
  }

  $(document).on('submit', '.js-theme-form', function (e) {
    e.preventDefault();
    var form = this;
    var $form = $(form);
    var $alert = $form.find('.stay-connect-alert');
    var $ok = $form.find('.stay-connect-success');
    $alert.removeClass('is-visible').empty();
    $ok.removeClass('is-visible');
    $form.find('.is-invalid').removeClass('is-invalid');

    var missing = [];
    $form.find('input, textarea').each(function () {
      if (this.type === 'hidden') return;
      var empty = !String(this.value || '').trim();
      var badEmail = this.type === 'email' && this.value && !this.checkValidity();
      if ((this.required && empty) || badEmail) {
        $(this).addClass('is-invalid');
        missing.push(this.getAttribute('placeholder') || 'This field');
      }
    });
    if (missing.length) {
      $alert.text('Please add ' + missing.join(', ') + '.').addClass('is-visible');
      return;
    }

    $form.addClass('is-loading');
    $.ajax({
      url: $form.attr('action'),
      method: 'POST',
      data: $form.serialize(),
      headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' }
    }).done(function () {
      $ok.addClass('is-visible');
      form.reset();
      if ($form.hasClass('js-clear-cart')) {
        $('.jw_mini_cart_product').remove();
        var $col = $('.jw_mini_crat_product_col');
        if (!$col.children().length) {
          $col.append('<p>Your cart is empty.</p>');
        }
        $('.jw_totle_price, .js-inquiry-subtotal, .js-inquiry-total').each(function () {
          var symbol = String($(this).text()).replace(/[0-9.,\s]/g, '') || '$';
          $(this).text(symbol + '0.00');
        });
        $('.jw_cart_count').remove();
        $form.find('.js-inquiry-line').remove();
      }
    }).fail(function (xhr) {
      $alert.text(errorText(xhr)).addClass('is-visible');
    }).always(function () {
      $form.removeClass('is-loading');
    });
  });
})(jQuery);
