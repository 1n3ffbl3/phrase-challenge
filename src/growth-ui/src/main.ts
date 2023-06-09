import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createI18n } from 'vue-i18n'
import enUS from '../i18n/locale/en-US.json'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'

// Own components
import OverviewTile from '@/components/OverviewTile/OverviewTile.vue'
import TotalOverview from '@/components/TotalOverview/TotalOverview.vue'

type MessageSchema = typeof enUS
const i18n = createI18n<[MessageSchema], 'en-US'>({
  locale: 'en-US',
  messages: {
    'en-US': enUS
  }
})

const vuetify = createVuetify({
  components: { ...components, ...labsComponents },
  directives
})

const app = createApp(App)

app.component('OverviewTile', OverviewTile).component('TotalOverview', TotalOverview)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
