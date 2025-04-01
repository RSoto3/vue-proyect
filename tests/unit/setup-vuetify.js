import { config, createVue } from '@vue/test-utils';
import Vuetify from 'vuetify';

const vue = createVue();
config.plugins.Vue = vue;
vue.use(Vuetify);