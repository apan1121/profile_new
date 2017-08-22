define([
    'jquery',
    'underscore',
    'backbone',

    'text!templates/profile/profileBox.html',

], function($, _, Backbone, ProfileBoxTpl) {
    var ProfileBox = Backbone.View.extend({
        el: 'body',
        params: {
            name: "個人資料",
            icon: "profile",
        },
        templates: {
            ProfileBox: _.template(ProfileBoxTpl),
        },
        initialize: function(data) {
            var that = this;
            this.params = $.extend(this.params, data);
            that.target = $(that.params.target);
        },
        render: function() {
            var that = this;

            that.target.append(that.templates.ProfileBox({
                key: that.params.key,
                icon: that.params.icon,
                name: that.params.name,
                profileJSON: that.params.profileJSON,
                lang: that.params.lang,
            }));
        }
    });

    return ProfileBox;
});