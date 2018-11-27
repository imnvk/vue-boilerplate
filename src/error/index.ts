import Vue from "vue";

declare const newrelic: any;

const log = (error: Error) => {
    if (typeof newrelic !== "undefined") {
        newrelic.noticeError(error);
    } else {
        console.error(error);
    }
};

Vue.config.errorHandler = function (err, vm, info) {
    log(new Error("VueJS Error : " + JSON.stringify({ "err": err, "vm": vm, "info": info })));
};

Vue.config.warnHandler = function (err, vm, info) {
    log(new Error("VueJS Warning : " + JSON.stringify({ "err": err, "vm": vm, "info": info })));
};

window.addEventListener("unhandledrejection", (e: PromiseRejectionEvent) => {
    log(new Error("Unhandled promise rejection : " + JSON.stringify(e.reason)));
});

window.addEventListener("rejectionhandled", (e: PromiseRejectionEvent) => {
    log(new Error("Rejection handled : " + JSON.stringify(e.reason)));
});