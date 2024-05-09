export default class Personale {
  constructor(name, cost) {
    this.name = name
    this.cost = cost
  }

  getCost() {
    return this.cost
  }

  getName() {
    return this.name
  }
}
