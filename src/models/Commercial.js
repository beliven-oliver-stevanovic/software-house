import { Personale } from './Personale'

export class Commercial extends Personale {
  constructor(name, seniority, cost) {
    super()
    this.name = name
    this.seniority = seniority
    this.cost = cost
    this.isOccupied = false
  }

  getSeniority() {
    return this.seniority
  }

  getCost() {
    return this.cost
  }

  getIsOccupied() {
    return this.isOccupied
  }
}
