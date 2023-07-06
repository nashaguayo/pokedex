import Vue from 'vue';
import App from './App.vue';
import router from './router';

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

import VueObserveVisibility from 'vue-observe-visibility';

import titleMixin from '@lib/titleMixin';

library.add(faToggleOn);
library.add(faToggleOff);
library.add(faArrowUp);
library.add(faSpinner);
library.add(faChevronDown);
library.add(faChevronUp);
library.add(faChevronRight);
library.add(faChevronLeft);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.use(VueObserveVisibility);

Vue.mixin(titleMixin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
