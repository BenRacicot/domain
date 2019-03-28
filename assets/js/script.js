/**
 * jQuery serializeObject
 * @copyright 2014, macek <paulmacek@gmail.com>
 * @link https://github.com/macek/jquery-serialize-object
 * @license BSD
 * @version 2.5.0
 */
!function (e, i) { if ("function" == typeof define && define.amd) define(["exports", "jquery"], function (e, r) { return i(e, r) }); else if ("undefined" != typeof exports) { var r = require("jquery"); i(exports, r) } else i(e, e.jQuery || e.Zepto || e.ender || e.$) }(this, function (e, i) { function r(e, r) { function n(e, i, r) { return e[i] = r, e } function a(e, i) { for (var r, a = e.match(t.key); void 0 !== (r = a.pop());)if (t.push.test(r)) { var u = s(e.replace(/\[\]$/, "")); i = n([], u, i) } else t.fixed.test(r) ? i = n([], r, i) : t.named.test(r) && (i = n({}, r, i)); return i } function s(e) { return void 0 === h[e] && (h[e] = 0), h[e]++ } function u(e) { switch (i('[name="' + e.name + '"]', r).attr("type")) { case "checkbox": return "on" === e.value ? !0 : e.value; default: return e.value } } function f(i) { if (!t.validate.test(i.name)) return this; var r = a(i.name, u(i)); return l = e.extend(!0, l, r), this } function d(i) { if (!e.isArray(i)) throw new Error("formSerializer.addPairs expects an Array"); for (var r = 0, t = i.length; t > r; r++)this.addPair(i[r]); return this } function o() { return l } function c() { return JSON.stringify(o()) } var l = {}, h = {}; this.addPair = f, this.addPairs = d, this.serialize = o, this.serializeJSON = c } var t = { validate: /^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i, key: /[a-z0-9_]+|(?=\[\])/gi, push: /^$/, fixed: /^\d+$/, named: /^[a-z0-9_]+$/i }; return r.patterns = t, r.serializeObject = function () { return new r(i, this).addPairs(this.serializeArray()).serialize() }, r.serializeJSON = function () { return new r(i, this).addPairs(this.serializeArray()).serializeJSON() }, "undefined" != typeof i.fn && (i.fn.serializeObject = r.serializeObject, i.fn.serializeJSON = r.serializeJSON), e.FormSerializer = r, r });

/*
Version        : 1.0.0
Author URI     : https://themeforest.net/user/eventhemes
Template URI   : https://themeforest.net/item/domain-broker-domain-sale-template/19769673?ref=EvenThemes
*/


(function($) {

    "use strict";

    var bodySelector = $("body"),
    htmlAndBody = $("html, body"),
    windowSelector = $(window);

    var googleScriptURL = 'https://script.google.com/macros/s/AKfycbzgGBS6H-Kmf7xQTOGSUAxYGXPQRerJX02tVfOCokcRgdkzTRoA/exec';
    var $makeOfferForm = $('form#makeOfferForm');

    // Google form https://github.com/jamiewilson/form-to-google-sheets
    // var scriptURL = 'https://script.google.com/macros/s/AKfycbzgGBS6H-Kmf7xQTOGSUAxYGXPQRerJX02tVfOCokcRgdkzTRoA/exec';
    // var form = document.forms['submit-to-google-sheet'];


    /* -------------------------------------
        Data Background Image
    ------------------------------------- */
    var background_image = function() {
        $("[data-bg-img]").each(function() {
            var attr = $(this).attr('data-bg-img');
            if (typeof attr !== typeof undefined && attr !== false && attr !== "") {
                $(this).css('background-image', 'url('+attr+')');
            }
        });  
    };

    /* -------------------------------------
        Preloader 
    ------------------------------------- */
    var preloader = function() {
        var pageLoader = $('#preloader');
        if(pageLoader.length) {
            pageLoader.children().fadeOut(); /* will first fade out the loading animation */
            pageLoader.delay(150).fadeOut('slow'); /* will fade out the white DIV that covers the website.*/
            bodySelector.delay(150).removeClass('preloader-active');
        }
    };

    /* -------------------------------------
        BACK TO TOP
    ------------------------------------- */
    var back_to_top = function() {
        var backTop = $('#backTop');
        if (backTop.length) {
            var scrollTrigger = 200,
                scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                backTop.addClass('show');
            } else {
                backTop.removeClass('show');
            }
        }
    };
    var click_back = function() {
        var backTop = $('#backTop');
        backTop.on('click', function(e) {
            htmlAndBody.animate({
                scrollTop: 0
            }, 700);
            e.preventDefault();
        });
    };

    var countdown = function() {
        var cdSelector =  $('#countdown');
        if (cdSelector.length) {} {

            /* January is 0, February is 1 ... */
            var launch_date = new Date(Date.UTC(2017, 7, 1, 0, 0)),
            days, hours, minutes, seconds, rest, counterHtml,
            now = new Date(),
            twoDigit = function(n) {
                return (n < 10 ? '0' : false) + n;
            };

            seconds = rest = Math.floor(((launch_date.getTime() - now.getTime()) / 1000));
            days = twoDigit(Math.floor(seconds / 86400));
            seconds -= days * 86400;
            hours = twoDigit(Math.floor(seconds / 3600));
            seconds -= hours * 3600;
            minutes = twoDigit(Math.floor(seconds / 60));
            seconds -= minutes * 60;
            seconds = twoDigit(Math.floor(seconds));

            rest <= 0 ? days = hours = minutes = seconds = '00' : setTimeout(countdown, 1000);

            counterHtml = '<li><h1 class="font-40">' + days + '</h1><h5 class="t-uppercase"> day' + (days > 1 ? 's' : '') + '</h5></li>';
            counterHtml += '<li><h1 class="font-40">' + hours + '</h1><h5 class="t-uppercase"> hour' + (hours > 1 ? 's' : '') + '</h5></li>';
            counterHtml += '<li><h1 class="font-40">' + minutes + '</h1><h5 class="t-uppercase"> minute' + (minutes > 1 ? 's' : '') + '</h5></li>';
            counterHtml += '<li><h1 class="font-40">' + seconds + '</h1><h5 class="t-uppercase"> second' + (seconds > 1 ? 's' : '') + '</h5></li>';
            cdSelector.html(counterHtml);

        }
    };

    /*-------------------------------------
        Contact Form JS
    -------------------------------------*/
    var validateEmail = function(email) {
        var patt = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (patt.test(email) === true ) {
            return true;
        }
        return false;
    };
    var validatePhone = function(phone) {
        var patt = /^[0-9]{8,20}$/;
        if (patt.test(phone) === true ) {
            return true;
        }
        return false;
    };
    var contactResponse = function(responseNode, type, response) {
        console.log(response);
        if (type === "success") {
            responseNode.removeClass('text-error').addClass('text-valid');
        } else {
            responseNode.removeClass('text-valid').addClass('text-error');
        }
        if (response.result !== '') {
            responseNode.text(response.result);
        } else {
            responseNode.text('Oops! An error occured.');
        }
    };

    var contactForm = function() {
        var contactForm = $("#contactForm");
        var responseNode = $('#contactResponse');
        contactForm.on("submit", function(e) {
            e.preventDefault();

            var self = $(this);
            var valid_form = true;
            var name = $("#contactName");
            var email = $("#contactEmail");
            var subject = $("#contactSubject");
            var message = $("#contactMessage");
            var formFields = [name, message, subject];

            formFields.forEach(function(input) {
                if (input.val() == '') {
                    input.addClass('input-error');
                    valid_form = false;
                }
            });

            if (email.val() == '' || validateEmail(email.val()) !== true) {
                email.addClass('input-error');
                valid_form = false;
            }

            self.find('input, textarea, select').on('change', function(){
                $(this).removeClass('input-error');
            });

            if (valid_form === true) {
                $.ajax({
                    type: "POST",
                    url: contactForm.attr('action'),
                    data: self.serialize()
                })
                .done(function(response) {
                    self[0].reset();
                    console.log(response);
                    contactResponse(responseNode, "success", response);
                })
                .fail(function(data) {
                    contactResponse(responseNode, "error", data.responseText);
                });
            }

        });
    };



    var makeOfferForm = function() {
        var makeOfferForm = $("#makeOfferForm");
        var responseNode = $('#offerFormResponse');
        makeOfferForm.on("submit", function(e) {
            e.preventDefault();

            var self = $(this);
            var valid_form = true;
            var bid = $("#offerFormBid");
            var name = $("#offerFormName");
            var email = $("#offerFormEmail");
            var formFields = [bid, name];

            formFields.forEach(function(input) {
                if (input.val() == '') {
                    input.addClass('input-error');
                    valid_form = false;
                }
            });

            if (email.val() == '' || validateEmail(email.val()) !== true) {
                email.addClass('input-error');
                valid_form = false;
            }

            self.find('input, textarea, select').on('change', function(){
                $(this).removeClass('input-error');
            });

            // https://medium.com/@dmccoy/how-to-submit-an-html-form-to-google-sheets-without-google-forms-b833952cc175
            if (valid_form === true) {
                $.ajax({
                    method: "POST",
                    url: googleScriptURL,
                    data: makeOfferForm.serializeObject(),
                    dataType: "json",
                })
                .done(function(response) {
                    self[0].reset();
                    contactResponse(responseNode, "success", response);
                })
                .fail(function(data) {
                    contactResponse(responseNode, "error", data.responseText);
                });
            }

        });
    };

    function getDomainName() {
        var hostname = location.hostname;
        var domainArray = hostname.split(".");
        domainArray.shift();
        var domainName = domainArray.join(".");
        $('#domainName').text(domainName);
        $('input#domainName, textarea#domainName').val(domainName);
    };


    /* =======================================
       When document is ready, do
    ======================================= */
    $(document).on('ready', function() {
        preloader();
        background_image();
        click_back();
        countdown();
        contactForm();
        makeOfferForm();
        getDomainName();
    });
        
    /* ======================================
       When document is loading, do
    ====================================== */
    windowSelector.on('load', function() {
        preloader();
    });

    /* ======================================
       When document is Scrollig, do
    ======================================= */
    windowSelector.on('scroll', function() {
        back_to_top();
    });

    
})(jQuery);