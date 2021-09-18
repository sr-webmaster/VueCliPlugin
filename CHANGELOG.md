# 2.5.0
## MockAPI
- **ADD** routes can be structured as an array of objects such as the following which allows for regexp to be used for the path

```javascript
{
  path: '/path/which/can/be/regex'  // required
  GET: [status, response],          // optional verb
  DELETE: [status, response],       // optional verb
  POST: [status, response],         // optional verb
  PUT: [status, response]           // optional verb
}
```

`example`
```javascript
const routes = [
  {
    path: /^\/?api\/activity\/v1\/statuses\/?/,
    GET: [200, { data: { id: 1 } }]
  }
]
const apiMocked = mockApi({ routes })  
```

## Page Stories and Testing [BETA]
- **ADD** Layouts now render in Storybook with the `makePageStory` by leveraging the `Providers`
`story`
```javascript
import Vue from 'vue'
import providers from 'tests/providers'
import mockApi from 'vue-cli-plugin-freshinup-ui/utils/mockApi'
import axios from 'axios'
import makePageStory from 'vue-cli-plugin-freshinup-ui/utils/makePageStory'
import Page from './index.vue'
const apiMocked = mockApi({ axios })
export const PopulatedList = () => {
  const store = createStore({
    currentUser: FIXTURE_USER,
    page: {
      title: 'Opportunity Reports'
    },
    userNotifications: {
      fetchInterval: 0
    }
  })
  return makePageStory(Page, store, {
    providers, // <-- Will then setup the Layouts
    Vue, // <-- Controls the Vue instance
    apiMocked,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      },
      'api/deals/v1/deals': {
        GET: [200, FIXTURE_DEALS_RESPONSE]
      },
      'api/deals/v1/dealstatuses': {
        GET: [200, FIXTURE_OPPORTUNITY_STATUSES_RESPONSE]
      },
      'api/deals/v1/dealtypes': {
        GET: [200, FIXTURE_OPPORTUNITY_TYPES_RESPONSE]
      },
      'api/deals/v1/modifiers': {
        GET: [200, FIXTURE_OPPORTUNITY_MODIFIERS_RESPONSE]
      }
    },
    beforeMount () {
      Page.beforeRouteEnterOrUpdate(this)
    }
  })
}
```

# 2.4.0

## Page Stories and Testing [BETA]
Operations made against the default `wrapper.vm` will use the Story Vue instance instead of the actual wrapped Page, we have added a new property `pvm` which exposes the Page Vue instance.

- **ADD** Wrapper now exposes the Page component Vue instance in `wrapper.pvm`

`test`
```javascript
import * as Stories from './index.stories'
import Page from './index.vue'

describe('Visuals', () => {
  test('renders populated list', () => {
    const wrapper = mount(Stories.PopulatedList())
    
    wrapper.beforeEnterUpdate(null, null, async () => {
       // executes the story wrapper method
       await wrapper.vm.$nextTick()
       // Preferred is to find and do "mock" interact
       wrapper.find('f-component__action-btn').trigger('click')
       // assertion
       // However, you may need or want to do a method "integration" test of sorts
       // Execute against the actual Page component Vue instance, calling this on .vm would fail with method not found
       wrapper.pvm.sayName()
       // assertion
    })
    ...
  })
})

// If you just want to test a method, perhaps it is better to do a isolated test that limits rendering 
describe('Method', () => {
  describe('sayName()', => {
     const wrapper = shallowMount(Page, {
        store
      })
     wrapper.vm.sayName()
     expect(wrapper.vm.isDialogOpen).toEqual(true)
  })
})
```

# 2.3.1
## Page Stories and Testing [BETA]
- **FIX** `mount` doesn't try to run `beforeRouteEnterOrUpdate` twice and can be ran within the tests 

# 2.3.0

## Page Stories and Testing [BETA]
Continuing the beta work on Story and Testing for `pages`

- **ADD** `mount` now can accept 
  - `pluginValidation: true|false` (default: false)
  - `pluginRouter: true|false` (default: false)
  - `pluginVuex: true|false` (default: true)
  - `apiMocked` the instance of the API Mock Adapter assumed to be our wrapped version with `ready` etc.
  - `apiMockRoutes` Collection of HTTP API endpoints, verbs, and replies
  
- **ADD** `makePageStory` Can automatically reset and wire HTTP API routes

Putting this together

`test`
```javascript
const wrapper = mount(Stories.HeaderImageStory(), {
  pluginValidation: true,
  pluginRouter: true
})
```

`story`
```javascript
return makePageStory(Page, store, {
  apiMocked,
  apiMockRoutes: {
    'api/currentUser': {
      GET: [200, FIXTURE_USER]
    }
  },
  beforeMount () {
    Page.beforeRouteEnterOrUpdate(this, {}, null)
  }
})
``` 


# 2.2.0

## Test Utils
- **ADD** Introducing `mockApi`. This can be used in tests and in stories!

`example.stories.js`
```javascript
import mockAPI from 'vue-cli-plugin-freshinup-ui/utils/mockApi'
import axios from 'axios'
export const MyMessage = () => {
  mockApi({
    axios,
    routes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      },
      'api/users': {
        POST: [201, { data: { id: 2 } }]
      },
      'api/users/1': {
        PUT: [200, {}],
        GET: [200, { data: FIXTURE_USER }]
      }
    }
  })
    .ready()
}
```

- **ADD** As a part of the `mockApi`, you can use `addRoutes`. This can be critical for Page Stories         

```javascript
import mockApi from 'vue-cli-plugin-freshinup-ui/utils/mockApi'
const apiMocked = mockApi()
apiMocked.reset()
apiMocked.addRoutes({
  'api/currentUser': {
    GET: [200, FIXTURE_CURRENT_USER]
  },
  'api/users': {
    GET: [200, { data: FIXTURE_USERS }]
  }
}).ready()
```


### BETA
- **ADD** Technically, there is a new `mount` being introduced but this is experimental (see the below section)


## Page Stories and Testing [BETA]
Introducing an _experimental_ way of creating Page Stories and enabling a way to test them too.

If you use these methods, please be aware that the contract may change without `major` version change.

The purpose is to enable stories for `Vue-Route` Smart Components in which the stories can be used in Visual Tests as well.

**EXAMPLE**

`pages/admin/users/index.stories.js`
```javascript
export const WithUsersAndLevels = () => {
  apiMocked.reset()
  apiMocked.addRoutes({
    'api/currentUser': {
      GET: [200, FIXTURE_CURRENT_USER]
    },
    'api/users': {
      GET: [200, { data: FIXTURE_USERS }]
    },
    'api/userlevels': {
      GET: [200, { data: FIXTURE_USER_LEVELS }]
    }
  }).ready()
  const store = createStore({
    currentUser: FIXTURE_CURRENT_USER,
    page: {
      title: 'Admin'
    },
    userNotifications: {
      fetchInterval: 0
    }
  })
  return makePageStory(Page, store, {
    beforeMount () {
      Page.beforeRouteEnterOrUpdate(this, {}, null)
    }
  })
}
```

`pages/admin/users/index.test.js`

```javascript
import { mount } from 'vue-cli-plugin-freshinup-ui/utils/testing'
import * as Stories from './index.stories'

describe('Users List Page', () => {
  describe('Visuals', () => {
    test('user levels configured', (done) => {
      const wrapper = mount(Stories.WithUsersAndLevels())
      expect(wrapper.isVueInstance()).toBe(true)
      wrapper.beforeRouteEnterOrUpdate({}, null, async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('Billy')
        expect(wrapper.element).toMatchSnapshot()
        done()
      })
    })
  })
})
```

## CLI
- **ADD** Prompt for creating Components in Client projects.
  - **note** `import` paths in the components need to be adjusted after creation.


# 2.1.0

## Test Utils
- **ADD** now you can use `createLocalVue` to quickly mock out your HTTP API responses

```
const vue = createLocalVue({
      apiMockRoutes: {
        'api/currentUser': {
          GET: [200, FIXTURE_USER]
        },
        'api/users': {
          POST: [201, { data: { id: 2 } }]
        },
        'api/users/1': {
          PUT: [200, {}],
          GET: [200, { data: FIXTURE_USER }]
        }
      }
    })
    mock = vue.mock.ready()
```

- **ADD** `createLocalVue` returns `mock` that now has `ready()` which when called automatically does the `onAny` with reasonable defaults

## Generator
- **FIX** `Component.test.js` correctly references `localVue` from the `createLocalVue` util method
- **FIX** Build failures due to `vue-cli-plugin-vuetify` being set to the wrong version. Since we are using Vuetify v1.5 we need to use version `0.6` of the plugin
- **ADD** `.gitignore` now comes with the Project new
- **MOD** Updates to the Github Issue Templates for the Project new
  

# 2.0.0
Version `1.x.x` only prompted for new project creation and sort of updating existing ones.

With version `2.0.0` we ask what type of thing are you trying to do?

- Make a Component
- Make a new Project
- Update an existing Project

# Version 1.2.0
- **MOD** Jest Configuration Core _removed_ module mapping for `fresh-bus` package

# Version 1.1.0
- **ADD** Jest Configuration Core has module mapping for `@freshinup` packages
- **ADD** Jest Configuration Core has module path set to `node_modules`
- **ADD** Jest Configuration Core has module mapping for `fresh-bus` package

