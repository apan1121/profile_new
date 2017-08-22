define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'views/info',
    'views/menu',

    'views/profile',
    'views/education',
    'views/jobs',
    'views/tools',
    'views/folder',

    "i18n!nls/lang",
    "i18n!nls/profile",
    "i18n!nls/education",
    "i18n!nls/job",
    "i18n!nls/tool",
    "i18n!nls/folder",

    'jquery_scrollbar',
    'jquery_imgLiquid',

], function($, _, Backbone, Moment, InfoBox, MenuBox, ProfileBox, EducationBox, JobBox, ToolBox, FolderBox, lang, profileLang, educationLang, jobLang, toolLang, folderLang) {
    Moment.locale('zh-tw');

    var MainBox = Backbone.View.extend({
        el: 'body',
        params: {},
        templates: {},
        initialize: function(data) {
            var that = this;
            $.extend(this.params, data);

            new InfoBox({
                app: this,
                target: ".main .info_box",
                lang: lang,
                profileJSON: profileLang
            });

            var profile = new ProfileBox({
                app: this,
                target: ".content_box .content_flex .content_wrapper",
                profileJSON: profileLang,
                lang: lang,

            });

            var education = new EducationBox({
                app: this,
                target: ".content_box .content_flex .content_wrapper",
                educationJSON: educationLang,
                lang: lang,
            });

            var job = new JobBox({
                app: this,
                target: ".content_box .content_flex .content_wrapper",
                jobJSON: jobLang,
                lang: lang,
            });

            var tool = new ToolBox({
                app: this,
                target: ".content_box .content_flex .content_wrapper",
                toolJSON: toolLang,
                lang: lang,
            });

            var folder = new FolderBox({
                app: this,
                target: ".content_box .content_flex .content_wrapper",
                folderJSON: folderLang,
                lang: lang,
            });



            $(".content_box .content_flex .content_wrapper").empty();

            new MenuBox({
                app: this,
                target: ".main .menu_box",
                plugin: {
                    profile: profile,
                    education: education,
                    job: job,
                    tool: tool,
                    folder: folder,
                }
            });

            that.initAction();
        },
        initAction: function() {
            var that = this;
            $(window).bind("resize", function() {
                if ($(window).width() <= 755) {
                    $("body").addClass("mobile");
                }
            }).trigger("resize");

            $(window).bind("scroll", function() {
                if ($("body").hasClass("mobile")) {
                    if ($(window).scrollTop() > $(".info_box").outerHeight()) {
                        $(".menu_box").addClass("fixed");
                    } else {
                        $(".menu_box").removeClass("fixed");
                    }
                }
            });

            that.$el.find('.scrollbar-inner').scrollbar();
        }
    });

    return MainBox;
});