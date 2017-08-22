define([
    'jquery',
    'underscore',
    'backbone',

    'text!templates/jobs/jobBox.html',

], function($, _, Backbone, JobBoxTpl) {
    var JobsBox = Backbone.View.extend({
        el: 'body',
        params: {
            name: "工作經歷",
            icon: "job",
        },
        templates: {
            JobBox: _.template(JobBoxTpl),
        },
        initialize: function(data) {
            var that = this;
            this.params = $.extend(this.params, data);
            that.target = $(that.params.target);
        },
        render: function() {
            var that = this;

            that.target.append(that.templates.JobBox({
                key: that.params.key,
                icon: that.params.icon,
                name: that.params.name,
                jobJSON: that.params.jobJSON,
                lang: that.params.lang,
            }));
        }
    });

    return JobsBox;
});