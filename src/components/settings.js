import {Dom7 as $} from './dom7';
window.f7 = {
    version: '1.4.0',
    params: {
        cache: true,
        cacheIgnore: [],
        cacheIgnoreGetParameters: false,
        cacheDuration: 1000 * 60 * 10, // Ten minutes
        preloadPreviousPage: true,
        uniqueHistory: false,
        uniqueHistoryIgnoreGetParameters: false,
        dynamicPageUrl: 'content-{{index}}',
        allowDuplicateUrls: false,
        router: true,
        // Push State
        pushState: false,
        pushStateRoot: undefined,
        pushStateNoAnimation: false,
        pushStateSeparator: '#!/',
        pushStatePreventOnLoad: true,
        // Fast clicks
        fastClicks: true,
        fastClicksDistanceThreshold: 10,
        fastClicksDelayBetweenClicks: 50,
        // Tap Hold
        tapHold: false,
        tapHoldDelay: 750,
        tapHoldPreventClicks: true,
        // Active State
        activeState: true,
        activeStateElements: 'a, button, label, span',
        // Animate Nav Back Icon
        animateNavBackIcon: false,
        // Swipe Back
        swipeBackPage: true,
        swipeBackPageThreshold: 0,
        swipeBackPageActiveArea: 30,
        swipeBackPageAnimateShadow: true,
        swipeBackPageAnimateOpacity: true,
        // Ajax
        ajaxLinks: undefined, // or CSS selector
        // External Links
        externalLinks: '.external', // CSS selector
        // Sortable
        sortable: true,
        // Scroll toolbars
        hideNavbarOnPageScroll: false,
        hideToolbarOnPageScroll: false,
        hideTabbarOnPageScroll: false,
        showBarsOnPageScrollEnd: true,
        showBarsOnPageScrollTop: true,
        // Swipeout
        swipeout: true,
        swipeoutActionsNoFold: false,
        swipeoutNoFollow: false,
        // Smart Select Back link template
        smartSelectOpenIn: 'page', // or 'popup' or 'picker'
        smartSelectBackText: 'Back',
        smartSelectPopupCloseText: 'Close',
        smartSelectPickerCloseText: 'Done',
        smartSelectSearchbar: false,
        smartSelectBackOnSelect: false,
        // Tap Navbar or Statusbar to scroll to top
        scrollTopOnNavbarClick: false,
        scrollTopOnStatusbarClick: false,
        // Panels
        swipePanel: false, // or 'left' or 'right'
        swipePanelActiveArea: 0,
        swipePanelCloseOpposite: true,
        swipePanelOnlyClose: false,
        swipePanelNoFollow: false,
        swipePanelThreshold: 0,
        panelsCloseByOutside: true,
        // Modals
        modalButtonOk: 'OK',
        modalButtonCancel: 'Cancel',
        modalUsernamePlaceholder: 'Username',
        modalPasswordPlaceholder: 'Password',
        modalTitle: 'Framework7',
        modalCloseByOutside: false,
        actionsCloseByOutside: true,
        popupCloseByOutside: true,
        modalPreloaderTitle: 'Loading... ',
        modalStack: true,
        // Lazy Load
        imagesLazyLoadThreshold: 0,
        imagesLazyLoadSequential: true,
        // Name space
        viewClass: 'view',
        viewMainClass: 'view-main',
        viewsClass: 'views',
        // Notifications defaults
        notificationCloseOnClick: false,
        notificationCloseIcon: true,
        notificationCloseButtonText: 'Close',
        // Animate Pages
        animatePages: true,
        // Template7
        templates: {},
        template7Data: {},
        template7Pages: false,
        precompileTemplates: false,
        // Material
        material: false,
        materialPageLoadDelay: 0,
        materialPreloaderSvg: '<svg xmlns="http://www.w3.org/2000/svg" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg>',
        materialPreloaderHtml:
            '<span class="preloader-inner">' +
                '<span class="preloader-inner-gap"></span>' +
                '<span class="preloader-inner-left">' +
                    '<span class="preloader-inner-half-circle"></span>' +
                '</span>' +
                '<span class="preloader-inner-right">' +
                    '<span class="preloader-inner-half-circle"></span>' +
                '</span>' +
            '</span>',
        materialRipple: true,
        materialRippleElements: '.ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, a.floating-button, .floating-button > a, .speed-dial-buttons a',
        // Auto init
        init: true
    },
    rtl: ($('body').css('direction') === 'rtl'),
    ls: window.localStorage
};
window.f7.support = (function () {
    var support = {
        touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
    };

    // Export object
    return support;
})();

window.f7.touchEvents = {
    start: window.f7.support.touch ? 'touchstart' : 'mousedown',
    move: window.f7.support.touch ? 'touchmove' : 'mousemove',
    end: window.f7.support.touch ? 'touchend' : 'mouseup'
};

// RTL
if (window.f7.rtl) $('html').attr('dir', 'rtl');

// Overwrite statusbar overlay
if (typeof window.f7.params.statusbarOverlay !== 'undefined') {
    if (window.f7.params.statusbarOverlay) $('html').addClass('with-statusbar-overlay');
    else $('html').removeClass('with-statusbar-overlay');
}
