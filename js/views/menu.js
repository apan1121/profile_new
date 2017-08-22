define([
    'jquery',
    'underscore',
    'backbone',

    'text!templates/menu/menuBox.html'
], function($, _, Backbone, MenuBoxTpl) {
    var MenuBox = Backbone.View.extend({
        el: 'body',
        params: {
        },
        templates: {
            MenuBox: _.template(MenuBoxTpl),
        },
        initialize: function(data) {
            var that = this;
            $.extend(this.params, data);

            that.target = $(that.params.target);
            that.target.empty();

            var plugin = [];
            _.each(that.params.plugin, function(item, key){
                item.params.key = key;
                plugin.push({key: key, name: item.params.name, icon: item.params.icon});
                item.render();
            });

            that.target.html(that.templates.MenuBox({plugin: plugin}));

            that.target.find(".menu_button").bind("click", function(){
                var rel = $(this).attr("rel");
                if ($("body").hasClass("mobile")) {
                    $(window).scrollTop($(".section_box[rel='"+rel+"']").offset().top - 30);
                } else {
                    var scrollTop = 0;
                    var target = $(".section_box");
                    for (var i = 0; i < target.length; i++) {
                        if (target.eq(i).attr("rel") == rel) {
                            break;
                        }
                        scrollTop += target.eq(i).outerHeight();
                    }
                    $(".content_wrapper .scrollbar-inner").scrollTop(scrollTop + 10);
                }
            });


            $(".content_wrapper").bind("scroll", function(){
                that.detectBox($(".content_wrapper .scrollbar-inner").scrollTop());
            });

            $(window).bind("scroll", function(){
                that.detectBox($(window).scrollTop());
            });
        },
        detectBox: function(scrollTop){
            var that = this;

            scrollTop = scrollTop + 40;

            var target = $(".section_box");
            var rel = "";
            var start = 0;
            for (var i = 0; i < target.length; i++) {
                var end =  start + target.eq(i).height();
                if (start <= scrollTop && scrollTop <= end) {
                    rel = target.eq(i).attr("rel");
                    start = end;
                    break;
                } else {
                    start = end;
                }
            }

            that.target.find(".menu_button[rel='"+rel+"']").addClass("active");
            that.target.find(".menu_button").not(that.target.find(".menu_button[rel='"+rel+"']")).removeClass("active");
        }
    });

    return MenuBox;
});