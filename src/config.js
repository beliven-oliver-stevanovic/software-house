export const config = {
  gameLoopInterval: 1000,
  hireTimer: 5,
  salariesTimer: 30,
  candidateFindingInterval: 20000,
  initialBudget: 5000,
  alertBudgetLimit: 1000,
  dailyCost: 10,
  juniorSalary: 100,
  midSalary: 200,
  seniorSalary: 300,
  juniorSearchTime: 15,
  midSearchTime: 10,
  seniorSearchTime: 5,
  juniorProjectDifficultyRate: 1,
  midProjectDifficultyRate: 2,
  seniorProjectDifficultyRate: 3,
  juniorGenerationRate: 0.5,
  midGenerationRate: 0.8,
  seniorGenerationRate: 1,
  devGenerationRate: 0.3,
  labels: {
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
}
