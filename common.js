// similar to format in other languages
function format(str) {
    for (var i = 1; i < arguments.length; ++i)
        str = str.replace(new RegExp('\\{' + (i - 1) + '\\}', "g"), arguments[i]);

    return str;
}

// deep clone
function cloneObj(o) {
    return jQuery.extend(true, {}, o);
}

// IE doesn't have trim
if (typeof String.prototype.trim !== 'function') {
  String.prototype.trim = jQuery.trim;
}

// add endswidth to string
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

// string padding
function paddy(str, totalLength, paddingChar) {
    var pad_char = typeof paddingChar !== 'undefined' ? paddingChar : '0';
    var pad = new Array(1 + totalLength).join(pad_char);
    return (pad + str).slice(-pad.length);
}

// IE < 9 doesn't have indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this &&
          this[from] === elt)
                return from;
        }
        return -1;
    };
}

// add remove to array
Object.defineProperty(Array.prototype, "remove", {
    enumerable: false,
    value: function (item) {
        for (var index = 0; index < this.length; ++index) {
            if (this[index] === item) {
                this.splice(index, 1);
                index--;
            }
        }

        return this;
    }
});

// this will also escape the name
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function parseDateTime(key, value) {
    if (typeof value === 'string' && value.indexOf('/Date') != -1)
        return new Date(parseInt(value.substr(6)));

    return value;
}

function callback(func, json, suc, fail) {
    $.ajax({
        type: "POST",
        url: window.location.pathname + "/" + func,
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        converters: { "text json": function(t) { return JSON.parse(t, parseDateTime); } },
        success: suc,
        error: fail
    });
}

function callbackUrl(url, func, json, suc, fail) {
    $.ajax({
        type: "POST",
        url: url + "/" + func,
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        converters: { "text json": function(t) { return JSON.parse(t, parseDateTime); } },
        success: suc,
        error: fail
    });
}

// "implement" max length on text area
function maxLengthTextArea()
{
    $("textarea[maxlength]").live("keyup blur", function () {
        var maxlength = $(this).attr("maxlength");
        var val = $(this).val();

        if (val.length > maxlength)
            $(this).val(val.slice(0, maxlength));
    });
}
