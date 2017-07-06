import { eventChannel } from 'redux-saga'
import { call, put, select, all, takeEvery } from 'redux-saga/effects'
import * as scroll from '../utils/scroll'
import { set, slide, reset } from '../reducers/current'

const WORK = '._work'
const BADGE = '.latest-illust-series-content-badge'
const THUMBNAIL = 'a[href*="member_illust.php?mode=medium"] img[src*="/img/"]'

const ensureElement = (element) => {
  let $target = jQuery(element)

  if ($target.is(BADGE)) {
    $target = $target.parents('a')
  }
  if ($target.is(WORK)) {
    $target = $target.find('img')
  }
  if ($target.is(THUMBNAIL)) {
    return $target[0]
  }
}

const ensureNextElement = (element, direction) => {
  const list = Array.from(document.querySelectorAll(THUMBNAIL))
  const index = list.indexOf(element)

  if (index === -1) {
    return false
  }

  const nextElement = list[index + direction]

  return nextElement
}

const toId = (url) => {
  const result = /(\d{2,})_[mps]/.exec(decodeURI(url))

  return result && result[1]
}

const getPos = (element) => ~~(element.y - (innerHeight / 3))

function pageClick() {
  return eventChannel((emit) => {
    const listener = (event) => {
      if (event.button === 0) {
        const element = ensureElement(event.target)

        if (element) {
          event.preventDefault()
          emit(element)
        }
      }
    }

    document.body.addEventListener('click', listener)
    return () => {
      document.body.removeEventListener('click', listener)
    }
  })
}

function* handleThumbnailClick(element) {
  const id = yield call(toId, element.src)
  yield put(set(element, id))
}

function* handleSet({ payload }) {
  yield call(scroll.hide, document.documentElement)
  const destination = yield call(getPos, payload.element)
  yield call(scroll.to, document.body, destination)
}

function* handleReset() {
  yield call(scroll.show, document.documentElement)
}

function* handleSlide({ payload }) {
  const { current } = yield select()
  const nextElement = ensureNextElement(current.element, payload)

  if (nextElement) {
    yield call(handleThumbnailClick, nextElement)
  }
}

export default function* currentSaga() {
  const channel = yield call(pageClick)

  yield all([
    takeEvery(channel, handleThumbnailClick),
    takeEvery(set.getType(), handleSet),
    takeEvery(reset.getType(), handleReset),
    takeEvery(slide.getType(), handleSlide)
  ])
}
