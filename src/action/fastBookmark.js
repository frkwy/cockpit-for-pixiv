import Action from './interface'
import useCase, {type IllustUseCase} from '../useCase/illust'

export class FastBookmark extends Action {
  useCase: IllustUseCase;

  constructor(useCase: IllustUseCase) {
    super()
    this.useCase = useCase
  }

  category = 'illust'
  description = 'fast bookmark'
  key = 'h'
  type = 'keydown'
  repeat = false

  execute = () => {
    this.useCase.bookmark()
  };
}


export default new FastBookmark(useCase)
