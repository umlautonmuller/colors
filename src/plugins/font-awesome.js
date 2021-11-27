import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faLockOpen, faCopy, faTimes, faArrowsAlt, faPlus, faRedo, faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faLock, faLockOpen, faCopy, faTimes, faArrowsAlt, faPlus, faRedo, faDice)

Vue.component('fa-icon', FontAwesomeIcon)