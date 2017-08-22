define([
    'jquery',
    'underscore',
    'backbone',

    'text!templates/folder/folderBox.html',

    'jquery_colorbox_zh_TW'
], function($, _, Backbone, FolderBoxTpl) {
    var FolderBox = Backbone.View.extend({
        el: 'body',
        params: {
            name: "作品集",
            icon: "folder",
            noPhoto: jsVars.baseUrl + "img/picture-512.png",
        },
        templates: {
            FolderBox: _.template(FolderBoxTpl),
        },
        initialize: function(data) {
            var that = this;
            this.params = $.extend(this.params, data);
            that.target = $(that.params.target);

            $(window).bind("resize", function() {
                if (that.$el.find(".product_box_col").length > 0) {
                    var count = parseInt(that.target.find(".section_content").width() / that.$el.find(".product_box_col").eq(0).width());
                    that.target.find(".product_box_col").css({ "height": "" });
                    if (count > 0) {
                        for (var i = 0; i < that.$el.find(".product_box_col").length; i += count) {
                            var height = [];
                            for (var j = i; j < (i + count); j++) {
                                if (that.$el.find(".product_box_col").eq(j).length > 0) {
                                    height.push(that.$el.find(".product_box_col").eq(j).height());
                                }
                            }
                            var maxHeight = _.max(height);
                            for (var j = i; j < (i + count); j++) {
                                if (that.$el.find(".product_box_col").eq(j).length > 0) {
                                    that.$el.find(".product_box_col").eq(j).css({ "height": maxHeight,"maxWidth": "100%" });
                                }
                            }
                        }
                    }
                }
            });
        },
        render: function() {
            var that = this;

            that.target.append(that.templates.FolderBox({
                key: that.params.key,
                icon: that.params.icon,
                name: that.params.name,
                folderJSON: that.params.folderJSON,
                lang: that.params.lang,
                noPhoto: that.params.noPhoto,
            }));

            var target = that.target.find(".product_box_col");
            for (var i = 0; i < target.length; i++){
                target.eq(i).find(".groupPhoto").colorbox({width: "100%",height: "100%", rel:'group'+target.eq(i).attr("rel")});
                target.eq(i).find(".photoGroup").bind("click", function(){
                    // console.log($(this).parents(".product_box_col").find(".groupPhoto"));
                    // target.eq(i).find(".groupPhoto").eq(0).trigger("click");
                    $(this).parents(".product_box_col").find(".groupPhoto").eq(0).trigger("click");
                });
            }

            $(window).trigger("resize");

        }
    });

    return FolderBox;
});