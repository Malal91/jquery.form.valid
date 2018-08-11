(function () {
    $.fn.vf = function (options) {
        var settings = $.extend({
            excludes: null,
        }, options);

        var _parents = $(this).parents("form");
        var _inputs = $(_parents).find('input').not(':button, :submit, :reset, :hidden');
        var selects = $(_parents).find('select');

        $(this).click(function (e) {
            $.each(_inputs, function () {
                var _r = find($(this).attr('name'))

                if (_r != true) {
                    if ($(this).val() == '') {
                        e.preventDefault()
                        $(this).attr('style', 'border: 1px solid red')
                    } else {
                        if ($(this).attr('type') == 'email') {
                            if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test($(this).val())) {
                                $(this).attr('style', '')
                            } else {
                                e.preventDefault();
                                $(this).attr('style', 'border: 1px solid red')
                            }
                        } else {
                            $(this).attr('style', '')
                        }
                    }
                }
            })

            $.each(selects, function () {
                var r = find($(this).attr('name'))
                if (r != true) {
                    if ($(this).val() == '') {
                        e.preventDefault()
                        $(this).attr('style', 'border: 1px solid red')
                    } else {
                        $(this).attr('style', '')
                    }
                }
            })
        })

        $('form input').not(':button, :submit, :reset, :hidden').focus(function () {
            $(this).attr('style', '')
        })

        $('form input').not(':button, :submit, :reset, :hidden').blur(function () {
            if ($(this).attr('type') == 'email') {
                if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test($(this).val())) {
                    $(this).attr('style', '')
                } else {
                    var _r = find($(this).attr('id'))
                    if (_r != true) {
                        $(this).attr('style', 'border: 1px solid red')
                    }
                }
            } else {
                if ($(this).val() != '') {
                    $(this).attr('style', '')
                }else {
                    var _r = find($(this).attr('name'))
                    if (_r != true) {
                        $(this).attr('style', 'border: 1px solid red')
                    }
                }
            }
        })

        $('form select').change(function () {
            if ($(this).val() != '') {
                $(this).attr('style', '');
            } else {
                var _r = find($(this).attr('name'))
                if (_r != true) {
                    $(this).attr('style', 'border: 1px solid red');
                }
            }
        })

        function find(el) {
            var _val = false
            if (settings.excludes != null) {
                for (var i = 0; i < settings.excludes.length; i++) {
                    if (el == settings.excludes[i]) {
                        _val = true
                    }
                }
            }
            return _val
        }
    }
}(jQuery));