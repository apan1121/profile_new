//Load common code that includes config, then load the app logic for this page.
require([jsVars.baseResUrl + 'js/lib/common.js'], function(common) {
    require([
        'jquery',
        'underscore',
        'backbone',

        'views/main',


        'jquery_scrollbar',
        'jquery_imgLiquid',
    ], function($, _, Backbone, Main) {
        var index_app = Backbone.View.extend({
            el: 'body',
            params: {

            },
            templates: {},
            initialize: function(data) {
                var that = this;
                var main = new Main();

                that.$el.find(".imgLiquidFill").imgLiquid();

            }
        });

        new index_app();
    });
});