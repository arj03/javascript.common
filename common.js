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

function callback(func, json, suc, fail) {
    $.ajax({
        type: "POST",
        url: window.location.pathname + "/" + func,
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
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
