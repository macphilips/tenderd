import ExampleRepository from "./example.repository"

class Controller {
  private repository: ExampleRepository
  /**
   * @constructor
   *
   * @param {ExampleRepository} repository
   */
  constructor(repository: ExampleRepository) {
    this.repository = repository
  }
}

export default Controller
