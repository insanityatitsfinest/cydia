/*var package = {
    "name": "MobileTerminal",
    "latest": "286u-5",
    "author": {
        "name": "Allen Porter",
        "address": "allen.porter@gmail.com"
    },
    //"depiction": "http://planet-iphones.com/repository/info/chromium1.3.php",
    "depiction": "http://cydia.saurik.com/terminal.html",
    "description": "this is a sample description",
    "homepage": "http://cydia.saurik.com/terminal.html",
    "installed": "286u-4",
    "id": "mobileterminal",
    "section": "Terminal Support",
    "size": 552*1024,
    "maintainer": {
        "name": "Jay Freeman",
        "address": "saurik@saurik.com"
    },
    "source": {
        "name": "Telesphoreo Tangelo",
        "description": "Distribution of Unix Software for the iPhone"
    }
};*/

function space(selector, html, max) {
    var node = $(selector);
    node.html(html);
    var width = node.width();
    if (width > max) {
        var spacing = (max - node.width()) / (html.length - 1) + "px";
        node.css("letter-spacing", spacing);
    }
}

function cache(url) {
    return url.replace('://', '://ne.edgecastcdn.net/8003A4/');
}

var swap_, swap = function (on, off, time) {
    setTimeout(swap_(on, off, time), time);
};

swap_ = function (on, off, time) {
    return function () {
        on.className = 'fade-out';
        off.className = 'fade-in';
        swap(off, on, time);
    };
};

$(function () {
    var id = package.id;
    var idc = encodeURIComponent(id);
    var name = package.name;
    var regarding = encodeURIComponent("Cydia/APT: " + name);
    var icon = 'cydia://package-icon/' + idc;
    var api = 'http://cydia.saurik.com/api/';

    $("#icon").css("background-image", 'url("' + icon + '")');
    $("#reflection").src("cydia://package-icon/" + idc);

    $("#name").html(name);
    space("#latest", package.latest, 96);

    $.xhr(cache(api + 'package/' + idc), 'GET', {}, null, {
        success: function (value) {
            value = eval(value);

            if (typeof value.rating == "undefined")
                $(".rating").remove();
            else {
                $("#rating-load").remove();
                $("#rating-href").href(value.reviews);

                var none = $("#rating-none");
                var done = $("#rating-done");

                if (value.rating == null) {
                    done.remove();
                    none.css("display", "block");
                } else {
                    none.remove();
                    done.css("display", "block");

                    $("#rating-value").css('width', 16 * value.rating);
                }
            }

            if (typeof value.icon != "undefined" && value.icon != null) {
                var icon = $("#icon");
                var thumb = $("#thumb");

                icon[0].className = 'flip-180';
                thumb[0].className = 'flip-360';

                thumb.css("background-image", 'url("' + value.icon + '")');

                setTimeout(function () {
                    icon.css("display", "none");
                    thumb[0].className = 'flip-0';
                }, 2000);
            }
        },

        failure: function (status) {
            $(".rating").remove();
        }
    });

    $("#settings").href("cydia://package-settings/" + idc);

    var warnings = package.warnings;
    var length = warnings == null ? 0 : warnings.length;
    if (length == 0)
        $(".warnings").remove();
    else {
        var parent = $("#warnings");
        var child = $("#warning");
        child.remove();

        for (var i = 0; i != length; ++i) {
            var clone = child.clone(true);
            parent.append(clone);
            clone.xpath("./div/label").html($.xml(warnings[i]));
        }
    }

    var applications = package.applications;
    var length = applications == null ? 0 : applications.length;

    var child = $("#application");
    child.remove();

    /*if (length != 0) {
        var parent = $("#actions");

        for (var i = 0; i != length; ++i) {
            var application = applications[i];
            var clone = child.clone(true);
            parent.append(clone);
            clone.href("cydia://launch/" + application[0]);
            clone.xpath("label").html("Run " + $.xml(application[1]));
            clone.xpath("img").src(application[2]);
        }
    }*/

    var commercial = package.hasTag('cydia::commercial');
    if (!commercial)
        $(".commercial").remove();

    var _console = package.hasTag('purpose::console');
    if (!_console)
        $(".console").remove();

    var author = package.author;
    if (author == null)
        $(".author").remove();
    else {
        space("#author", author.name, 160);
        if (author.address == null)
            $("#author-icon").remove();
        else
            $("#author-href").href("mailto:" + author.address + "?subject=" + regarding);
    }

    //$("#notice-src").src("http://saurik.cachefly.net/notice/" + idc + ".html");

    /*var store = commercial;
    if (!store)
        $(".activation").remove();
    else {
        var activation = api + 'activation/' + idc;
        $("#activation-src").src(activation);
    }*/

    var depiction = package.depiction;
    if (depiction == null)
        $(".depiction").remove();
    else {
        $(".description").css("display", "none");
        $("#depiction-src").src(depiction);
    }

    var description = package.description;
    if (description == null)
        description = package.tagline;
    else
        description = description.replace(/\n/g, "<br/>");
    $("#description").html(description);

    var homepage = package.homepage;
    if (homepage == null)
        $(".homepage").remove();
    else
        $("#homepage-href").href(homepage);

    var installed = package.installed;
    if (installed == null)
        $(".installed").remove();
    else {
        $("#installed").html(installed);
        $("#files-href").href("cydia://files/" + idc);
    }

    space("#id", id, 220);

    var section = package.section;
    if (section == null)
        $(".section").remove();
    else {
        $("#section-src").src("cydia://section-icon/" + encodeURIComponent(section));
        $("#section").html(section);
    }

    var size = package.size;
    if (size == 0)
        $(".size").remove();
    else
        $("#size").html(size / 1024 + " kB");

    var maintainer = package.maintainer;
    if (maintainer == null)
        $(".maintainer").remove();
    else {
        space("#maintainer", maintainer.name, 153);
        if (maintainer.address == null)
            $("#maintainer-icon").remove();
        else
            $("#maintainer-href").href("mailto:" + maintainer.address + "?subject=" + regarding);
    }

    var sponsor = package.sponsor;
    if (sponsor == null)
        $(".sponsor").remove();
    else {
        space("#sponsor", sponsor.name, 152);
        $("#sponsor-href").href(sponsor.address);
    }

    var source = package.source;
    if (source == null) {
        $(".source").remove();
        $(".trusted").remove();
    } else {
        var host = source.host;

        $("#source-src").src("cydia://source-icon/" + encodeURIComponent(host));
        $("#source-name").html(source.name);

        if (source.trusted)
            $("#trusted").href("cydia://package-signature/" + idc);
        else
            $(".trusted").remove();

        var description = source.description;
        if (description == null)
            $(".source-description").remove();
        else
            $("#source-description").html(description);
    }
});