define([
    'jquery',
    'underscore',
    'backbone',

    'text!templates/info/infoBox.html',
], function($, _, Backbone, InfoBoxtTpl) {
    var InfoBox = Backbone.View.extend({
        el: 'body',
        params: {
        },
        templates: {
            InfoBox: _.template(InfoBoxtTpl),
        },
        initialize: function(data) {
            var that = this;
            that.params = $.extend(true,that.params, data);
            that.target = $(that.params.target);
            that.target.empty();
            that.target.html(that.templates.InfoBox({ProfileJSON: that.params.profileJSON}));
            // that.target.find('.scrollbar-inner').scrollbar();
        },
    });

    return InfoBox;
});