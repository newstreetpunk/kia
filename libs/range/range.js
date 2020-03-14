function t_throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last, deferTimer;
    return function() {
        var context = scope || this;
        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args)
            }, threshhold)
        } else {
            last = now;
            fn.apply(context, args)
        }
    }
}

function t_input_range_getGradient(parent, item, color1, color2, percentage, el_style) {
    var gradient = "linear-gradient(to right, ";
    var breakPoint = percentage * 100;
    var attrValue = gradient + color1 + " 0%, " + color1 + " " + breakPoint + "%, " + color2 + " " + breakPoint + "%, " + color2 + " 100%)";
    var fieldSelector = parent + ' ' + item + ' .range';
    var styleValue = fieldSelector + '::-webkit-slider-runnable-track{\nbackground:' + attrValue + ';\n}\n' + fieldSelector + '::-moz-range-track{\nbackground:' + attrValue + ';\n}';
    styleValue += '\n' + fieldSelector + '::-ms-fill-upper{\nbackground:' + color2 + ';\n}\n' + fieldSelector + '::-ms-fill-lower{\nbackground:' + color1 + ';\n}';
    $(el_style).html(styleValue)
}

function t_input_range_updateval(parent, item, el_style) {
    var input = $(parent).find('' + item + ' .range');
    var value = input.val();
    var max = input.attr('max') * 1;
    var min = input.attr('min') * 1;
    var dist = max - min;
    var percentage = (value - min) / dist;
    var inputWidth = input.width();
    var thumbWidth = 21;
    var selectedColor = "#000";
    var nonSelectedColor = "#f4f4f4";
    t_input_range_getGradient(parent, item, selectedColor, nonSelectedColor, percentage, el_style);
    var offLeft = Math.floor(percentage * (inputWidth - thumbWidth) + thumbWidth / 2);
    input.next('.range__value-txt').html(value).css({
        'left': offLeft + 'px',
        'display': 'block'
    })
}

function t_input_range_init(parent, item) {
    var el = $(parent).find('' + item + '');
    var el_style = document.createElement('style');
    $(el_style).addClass('range-' + parent + '-' + item);
    el.append(el_style);
    el.find('.range').on("input change", function() {
        t_input_range_updateval(parent, item, el_style)
    });
    $(window).bind('resize', t_throttle(function() {
        t_input_range_updateval(parent, item, el_style)
    }, 200));
    t_input_range_updateval(parent, item, el_style)
}