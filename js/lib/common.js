//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: jsVars.baseResUrl+'js',
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        underscore_string: {
            deps: [
                'underscore',
            ],
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },

        jquery_scrollbar: {
            deps: [
                'jquery',
            ]
        },
        jquery_imgLiquid: {
            deps: [
                'jquery',
            ]
        },

        jquery_colorbox: {
            deps: [
                'jquery',
            ]
        },
        jquery_colorbox_zh_TW: {
            deps: [
                'jquery_colorbox',
            ]
        }
    },
    urlArgs: "ver="+jsVars.version,
    paths: {
        /* 絕對必要預載 */
        jquery: CDN.jquery,
        underscore: CDN.underscore,
        underscore_string: CDN.underscore_string,
        backbone: CDN.backbone,
        backbone_validation: CDN.backbone_validation,

        i18n: CDN.i18n,
        text: CDN.text,
        async: CDN.async,

        /* adminLTE 一定要用 */
        bootstrap: CDN.bootstrap,

        moment: CDN.moment,
        jquery_scrollbar: CDN.jquery_scrollbar,
        jquery_imgLiquid: CDN.jquery_imgLiquid,

        jquery_colorbox: CDN.jquery_colorbox,
        jquery_colorbox_zh_TW: CDN.jquery_colorbox_zh_TW,
    }
});

