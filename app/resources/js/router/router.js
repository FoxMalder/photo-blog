import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from "vue-meta"
import * as services from "../services/factory";

Vue.use(VueRouter);
Vue.use(VueMeta);

import routes from "./routes";

const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior(to, from, savedPosition) {
        // Scroll to top.
        return {x: 0, y: 0};
    },
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((route) => route.meta.requiresAuth) && !services.getAuth().authenticated()) {
        next({
            name: "sign-in",
            query: {redirect_uri: to.fullPath},
        });
    } else {
        next();
    }
});

export default router;
