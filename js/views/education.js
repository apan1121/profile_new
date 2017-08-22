define([
    'jquery',
    'underscore',
    'backbone',

    'text!templates/education/educationBox.html',

], function($, _, Backbone, EducationBoxTpl) {
    var EducationBox = Backbone.View.extend({
        el: 'body',
        params: {
            name: "學歷",
            icon: "education",
        },
        templates: {
            EducationBox: _.template(EducationBoxTpl),
        },
        initialize: function(data) {
            var that = this;
            this.params = $.extend(this.params, data);
            that.target = $(that.params.target);
        },
        render: function() {
            var that = this;

            that.target.append(that.templates.EducationBox({
                key: that.params.key,
                icon: that.params.icon,
                name: that.params.name,
                educationJSON: that.params.educationJSON,
                lang: that.params.lang,
            }));
        }
    });

    return EducationBox;
});