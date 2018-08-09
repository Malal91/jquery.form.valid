(function () {
    $.fn.formValid = function (options) {
        var settings = $.extend({
            excludes: null,
        }, options);

        var form_parent = $("#" + $(this).attr('id')).parents("form");
        var inputs = $(form_parent).find('input').not(':button, :submit, :reset, :hidden');
        var selects = $(form_parent).find('select');

        $(this).click(function (e) {
            $.each(inputs, function (key, element) {
                var r = find($(this).attr('id'))

                if (r != true) {
                    var type_input = $(this).attr('type')

                    if ($(this).val() == '') {
                        e.preventDefault()
                        $(this).attr('style', 'border: 1px solid red')
                    } else {
                        if (type_input == 'email') {
                            if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test($('#' + $(this).attr('id')).val())) {
                                $(this).attr('style', '')
                            } else {
                                e.preventDefault();
                                $('#' + $(this).attr('id')).attr('style', 'border: 1px solid red')
                            }
                        } else {
                            $(this).attr('style', '')
                        }
                    }
                }
            })

            $.each(selects, function (key, prop) {
                var r = find($(this).attr('id'))
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

        $('form input').focus(function () {
            $(this).attr('style', '')
        })

        $('form input').blur(function () {
            if ($(this).attr('type') == 'email') {
                if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test($(this).val())) {
                    $(this).attr('style', '')
                } else {
                    var r = find($(this).attr('id'))
                    if (r != true) {
                        $(this).attr('style', 'border: 1px solid red')
                    }
                }
            } else {
                if ($(this).val() != '') {
                    $(this).attr('style', '')
                } else {
                    var r = find($(this).attr('id'))
                    if (r != true) {
                        $(this).attr('style', 'border: 1px solid red')
                    }

                }
            }

        })

        $('form select').change(function () {
            if ($(this).val() != '') {
                $(this).attr('style', '');
            } else {
                var r = find($(this).attr('id'))
                if (r != true) {
                    $(this).attr('style', 'border: 1px solid red');
                }
            }
        })

        function find(el) {
            var val = false
            if (settings.excludes != null) {
                for (var i = 0; i < settings.excludes.length; i++) {
                    if (el == settings.excludes[i]) {
                        val = true
                    }
                }
            }
            return val
        }
    }

}(jQuery));