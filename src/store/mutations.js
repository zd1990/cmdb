import {
  RECODE_USER_NAME,
  RECODE_USER_ROLE
} from './mutation-types'

export default {
  [RECODE_USER_NAME] (state, name) {
    state.user_name = name
  },
  [RECODE_USER_ROLE] (state, role) {
    state.user_role = role
  }
}
