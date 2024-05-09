export default class Project {
  constructor(name, value, complexity) {
    this.name = name
    this.value = value
    this.complexity = complexity
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
