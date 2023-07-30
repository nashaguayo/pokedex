import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import VueI18n from 'vue-i18n';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import VueObserveVisibility from 'vue-observe-visibility';

import titleMixin from '@/lib/titleMixin';

library.add(faToggleOn);
library.add(faToggleOff);
library.add(faArrowUp);
library.add(faSpinner);
library.add(faChevronDown);
library.add(faChevronUp);
library.add(faChevronRight);
library.add(faChevronLeft);
library.add(faMagnifyingGlass);
library.add(faStar);
library.add(faBookOpen);
library.add(faTrashCan);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.use(VueObserveVisibility);

Vue.use(VueI18n);
const messages = {
  en,
  es,
};
const i18n = new VueI18n({
  locale: 'en',
  messages,
});

Vue.mixin(titleMixin);

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
