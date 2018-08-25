import {
    HOME,
    NOT_FOUND,
    ROUTE_404,
    SIGN_IN,
    SIGN_OUT,
    PHOTO_ADD,
    PHOTO_EDIT,
    PHOTO,
    PHOTOS_MAP,
    PHOTOS_SEARCH,
    PHOTOS_TAG,
    PHOTOS,
    CONTACT_ME,
    SUBSCRIPTIONS,
    SUBSCRIPTION,
    UNSUBSCRIPTION,
    _PAGE_SUFFIX
} from "./names";

const routes = [
    {
        path: "/",
        name: HOME,
        redirect: "/photos",
    },
    // Auth
    {
        path: "/sign-in",
        name: SIGN_IN,
        component: require("../components/auth/sign-in"),
    },
    {
        path: "/sign-out",
        name: SIGN_OUT,
        component: require("../components/auth/sign-out"),
        meta: {
            requiresAuth: true,
        },
    },
    // Photos
    {
        path: "/photo/add",
        name: PHOTO_ADD,
        component: require("../components/photos/photo-form"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/photo/:id/edit",
        name: PHOTO_EDIT,
        component: require("../components/photos/photo-form"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/photo/:id",
        name: PHOTO,
        component: require("../components/photos/photo-gallery-viewer"),
        meta: {
            transition: false,
        },
    },
    {
        path: "/photos/map",
        name: PHOTOS_MAP,
        component: require("../components/photos/photo-map"),
    },
    {
        path: "/photos/search/:search_phrase",
        name: PHOTOS_SEARCH,
        component: require("../components/photos/photo-gallery"),
    },
    {
        path: "/photos/search/:search_phrase/:page",
        name: PHOTOS_SEARCH + _PAGE_SUFFIX,
        component: require("../components/photos/photo-gallery"),
    },
    {
        path: "/photos/tag/:tag",
        name: PHOTOS_TAG,
        component: require("../components/photos/photo-gallery"),
    },
    {
        path: "/photos/tag/:tag/:page",
        name: PHOTOS_TAG + _PAGE_SUFFIX,
        component: require("../components/photos/photo-gallery"),
    },
    {
        path: "/photos",
        name: PHOTOS,
        component: require("../components/photos/photo-gallery"),
    },
    {
        path: "/photos/:page",
        name: PHOTOS + _PAGE_SUFFIX,
        component: require("../components/photos/photo-gallery"),
    },
    // Other
    {
        path: "/contact-me",
        name: CONTACT_ME,
        component: require("../components/other/contact-me"),
    },
    {
        path: "/subscriptions",
        name: SUBSCRIPTIONS,
        component: require("../components/subscriptions/subscriptions-table"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/subscriptions/:page",
        name: SUBSCRIPTIONS + _PAGE_SUFFIX,
        component: require("../components/subscriptions/subscriptions-table"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/subscription",
        name: SUBSCRIPTION,
        component: require("../components/other/subscription"),
    },
    {
        path: "/unsubscription/:token",
        name: UNSUBSCRIPTION,
        component: require("../components/other/unsubscription"),
    },
    {
        path: "*",
        name: NOT_FOUND,
        component: require("../components/layout/not-found"),
    },
    {
        path: "/404",
        name: ROUTE_404,
        component: require("../components/layout/not-found"),
    },
];

export default routes;
