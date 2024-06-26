export const apiURL = 'http://localhost:8000/api'
export const backendURL = 'http://localhost:8000'
export const csfrURL = 'http://localhost:8000/sanctum/csrf-cookie'
export const gameLoopInterval = 1000
export const hireTimer = 5
export const salariesTimer = 30
export const initialBudget = 5000
export const alertBudgetLimit = 1000
export const dailyCost = 5
export const juniorSalary = 100
export const midSalary = 200
export const seniorSalary = 300
export const juniorSearchTime = 15
export const midSearchTime = 10
export const seniorSearchTime = 5
export const juniorProjectDifficultyRate = 1
export const midProjectDifficultyRate = 2
export const seniorProjectDifficultyRate = 3
export const juniorGenerationRate = 0.5
export const midGenerationRate = 0.8
export const seniorGenerationRate = 1
export const devGenerationRate = 0.3
export const labels = {
  workStatus: {
    working: 'Working',
    notWorking: 'Free',
    occupied: 'Occupied'
  },
  roles: {
    commercial: 'Commercial',
    developer: 'Developer'
  },
  seniority: {
    junior: 'Junior',
    mid: 'Mid',
    senior: 'Senior'
  }
}

export default {
  apiURL,
  gameLoopInterval,
  hireTimer,
  salariesTimer,
  initialBudget,
  alertBudgetLimit,
  dailyCost,
  juniorSalary,
  midSalary,
  seniorSalary,
  juniorSearchTime,
  midSearchTime,
  seniorSearchTime,
  juniorProjectDifficultyRate,
  midProjectDifficultyRate,
  seniorProjectDifficultyRate,
  juniorGenerationRate,
  midGenerationRate,
  seniorGenerationRate,
  devGenerationRate,
  labels
}
