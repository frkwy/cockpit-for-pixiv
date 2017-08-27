// @flow
import Action from './interface'
import route, {type Route} from '../store/route'
import viewer, {type Viewer} from '../store/viewer'
import useCase, {type IllustUseCase} from '../useCase/illust'

export class PrevImage extends Action {
  route: Route;
  viewer: Viewer;

  constructor(route: Route, useCase: IllustUseCase, viewer: Viewer) {
    super()
    this.route = route
    this.viewer = viewer
  }

  category = 'illust'
  description = 'next image'
  key = 'G'
  type = 'keydown'
  repeat = false

  execute = () => {
	if (this.route.illust) {
		this.viewer.currentImage.prev(this.route.illust)
	}
  };
}

export default new PrevImage(route, useCase, viewer)
