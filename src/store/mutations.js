import {
  RECODE_USER_NAME,
  RECODE_USER_ROLE,
  RECODE_HEADER_HEIGHT,
  RECODE_TOTAL_HEIGHT,
  RECODE_BODY_HEIGHT
} from './mutation-types'

export default {
  [RECODE_USER_NAME] (state, uname) {
    state.uname = uname
  },
  [RECODE_USER_ROLE] (state, urole) {
    state.urole = urole
  },
  [RECODE_HEADER_HEIGHT] (state, headerHeight) {
    state.headerHeight = headerHeight
  },
  [RECODE_TOTAL_HEIGHT] (state, totalHeight) {
    state.totalHeight = totalHeight
  },
  [RECODE_BODY_HEIGHT] (state, bodyHeight) {
    state.bodyHeight = bodyHeight
  }
}
