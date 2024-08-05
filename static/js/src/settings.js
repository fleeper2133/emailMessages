import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

Vue.use(VueAxios, axios);
Vue.options.delimiters = ['[[', ']]'];

Vue.directive('tooltip', {
    mounted(el, binding) {
        el.setAttribute('data-bs-toggle', 'tooltip');

        new bootstrap.Tooltip(el,{
            title: binding.value,
            placement: binding.arg,
            trigger: 'hover'
        })
    }
});

export const EventBus = new Vue();
