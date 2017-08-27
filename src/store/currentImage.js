// @flow
import {observable} from 'mobx'
export class CurrentImage {
  @observable number: number;
  @observable max_number: number;

  constructor() {
  }

  reset(illust) {
	if (illust.images) {
		this.max_number = illust.images.length
	}
    this.number = 0
  }

  increment() {
	if (this.number < this.max_number - 1) {
		this.number += 1
	}
  }
  
  decrement() {
	if (this.number < -1) {
		this.number -= 1
	}
  }

  next() {
	this.increment()
	document.getElementsByClassName("Canvas")[0].children[this.number].scrollIntoView()
  }

  prev() {
	this.decrement()
	document.getElementsByClassName("Canvas")[0].children[this.number].scrollIntoView()
  }
}

export default new CurrentImage()

