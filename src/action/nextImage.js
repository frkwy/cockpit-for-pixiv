// @flow
import Action from './interface'
import route, {type Route} from '../store/route'
import viewer, {type Viewer} from '../store/viewer'
import useCase, {type IllustUseCase} from '../useCase/illust'

export class NextImage extends Action {
  count: Integer
  route: Route;
  viewer: Viewer;
  illust_id: String;

  constructor(route: Route, useCase: IllustUseCase, viewer: Viewer) {
    super()
    this.route = route
    this.viewer = viewer
    this.route2 = route
    this.count = 1
    this.illust_id = ""
  }

  category = 'illust'
  description = 'next image'
  key = 'g'
  type = 'keydown'
  repeat = false

  execute = () => {
	if (this.route.illust) {
		window.viewer = this.viewer
		this.viewer.currentImage.next()
	//	if (this.route.illust.id !== this.illust_id) {
	//		this.count = 1
	//	}
	//	if (this.route.illust.images.length > this.count) {
	//		document.getElementsByClassName("Canvas")[0].children[this.count].scrollIntoView()
	//		this.count = this.count + 1
	//	}
	//	this.illust_id = this.route.illust.id
	}
  };
}

export default new NextImage(route, useCase, viewer)
