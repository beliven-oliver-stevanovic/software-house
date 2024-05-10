import { v4 as uuidv4 } from 'uuid'

export default class Project {
  constructor(name, value, complexity) {
    this.id = uuidv4()
    this.name = name
    this.value = value
    this.complexity = complexity
    this.isAssigned = false
  }

  getName() {
    return this.name
  }

  getValue() {
    return this.value
  }

  getComplexity() {
    return this.complexity
  }
}
