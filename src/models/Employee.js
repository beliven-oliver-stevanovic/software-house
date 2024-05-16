import { v4 as uuidv4 } from 'uuid'

export default class Employee {
  constructor(name, seniority) {
    this.id = uuidv4()
    this.name = name
    this.seniority = seniority
    this.salary = this.seniority.getSalary()
    this.isOccupied = false
  }

  getSalary() {
    return this.salary
  }

  getName() {
    return this.name
  }

  getSeniorityType() {
    return this.seniority.type
  }
}
