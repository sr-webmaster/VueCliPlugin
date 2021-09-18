---
name: Component
about: Typically used for new components
title: ''
labels: ''
assignees: ''

---

[Breeze Deliverable]() <-- add it inside

# Blocked by 
- `{?:ticket number}` which will first introduce the `{?:something}` component

# Scope
As an administrator, I need to `{?:some description of the action}`

### Inputs / Outputs
Inputs 

| Property | Description | Notes |
| --- | --- | --- |
| `items` | `{?:description}` |  |

Outputs

| Events | Description | Notes |
| --- | --- | --- |
| `items` | `{?:description}` |  |

### Components
| Field | Component | Notes |
| --- | --- | --- |
| **Name**  |  Vuetify Input Field ([`v-text-field`](https://v15.vuetifyjs.com/en/components/text-fields)) |  | 
| **List** | [Core Button Menu](https://fps.freshinup.com/styleguide/?path=/story/core-2-16-0-button-menu--with-items-knobs) | |

| Buttons | Component| Color | When clicked |
| --- | --- | --- | --- |
| Save | [FBtn](https://fps.freshinup.com/styleguide/?path=/story/core-2-16-0-button--color) | `color="primary"` | dispatches a `save` event |  

## Out of Scope
HTTP API and Page UI

# Technical
Make sure to use 
- [ ] [Pull Request Standards](https://github.com/FreshinUp/fresh-platform/wiki/Pull-Request-Standards)
- [ ] [UI Testing](https://github.com/FreshinUp/fresh-platform/wiki/UI-Testing)
- [ ] Colors should use [Fresh Platform Theming](https://github.com/FreshinUp/core-ui/blob/master/src/theme.js) and [Vuetify Theming](https://v15.vuetifyjs.com/en/framework/theme)
