define([
    'jquery',
    'underscore',
    'backbone',

    'text!templates/tools/toolBox.html',

], function($, _, Backbone, ToolBoxTpl) {
    var JobsBox = Backbone.View.extend({
        el: 'body',
        params: {
            name: "技能",
            icon: "tool",
        },
        templates: {
            ToolBox: _.template(ToolBoxTpl),
        },
        initialize: function(data) {
            var that = this;
            this.params = $.extend(this.params, data);
            that.target = $(that.params.target);
        },
        render: function() {
            var that = this;

            that.target.append(that.templates.ToolBox({
                key: that.params.key,
                icon: that.params.icon,
                name: that.params.name,
                toolJSON: that.params.toolJSON,
                lang: that.params.lang,
            }));
        }
    });

    return JobsBox;
});