import { apiURL, backendURL } from '@/config'
import axios from '@/axios'
import { useGameStore } from '@/stores/gameStore'
import { postOne, patchOne } from '@/server'
import { useRouter } from 'vue-router'

export function useGame() {
  const gameStore = useGameStore()
  const router = useRouter()

  axios.defaults.withCredentials = true
  axios.defaults.withXSRFToken = true

  const setupGame = (game) => {
    gameStore.id = game.id
    const gameStatus = gameStore.playedGames.find((g) => g.id === game.id).status
    gameStore.restoreGame(gameStatus)
    router.push({
      path: '/production'
    })
  }

  const newGame = async () => {
    gameStore.resetStats()
    const game = await postOne('games', {
      time_passed: gameStore.timePassed,
      max_budget: gameStore.highestBudgetPeak,
      user_id: gameStore.userId,
      budget: gameStore.budget,
      status: JSON.stringify(gameStore.gameStatus)
    })
    gameStore.id = game.id
    gameStore.isGameStarted = true
    router.push({
      name: 'production'
    })
  }

  const getRankingsByBudget = async () => {
    const response = await axios.get(`${apiURL}/games/ranking/max_budget`)
    return response.data
  }

  const getRankingsByTime = async () => {
    const response = await axios.get(`${apiURL}/games/ranking/time_passed`)
    return response.data
  }

  const restartGame = async () => {
    gameStore.resetStats()
    await postOne('games', {
      time_passed: gameStore.timePassed,
      max_budget: gameStore.highestBudgetPeak,
      user_id: gameStore.userId,
      budget: gameStore.budget,
      status: JSON.stringify(gameStore.gameStatus)
    }).then((data) => {
      gameStore.id = data.id
      gameStore.isGameStarted = true
      router.push({ name: 'production' })
    })
  }

  const onHire = (candidate) => {
    let toHire = gameStore.candidates.find((c) => c.id === candidate.id)
    gameStore.hireCandidate(toHire)
    gameStore.candidates = gameStore.candidates.filter((c) => c.id !== candidate.id)
  }

  const getInProgressGames = async () => {
    const response = await axios.get(`${apiURL}/games/in_progress/${gameStore.userId}`)
    return response.data
  }

  const exitGame = async () => {
    let gameObj = {
      time_passed: gameStore.timePassed,
      max_budget: gameStore.highestBudgetPeak,
      user_id: gameStore.userId,
      budget: gameStore.budget,
      status: JSON.stringify(gameStore.gameStatus)
    }
    const patchedGame = await patchOne('games', gameStore.id, gameObj)
    gameStore.isGameStarted = false
    let index = gameStore.playedGames.findIndex((game) => game.id === patchedGame.id)
    if (index === -1) {
      gameStore.playedGames.push(patchedGame)
    } else {
      gameStore.playedGames[index] = patchedGame
    }
    router.push('/main-menu')
  }

  const logout = async () => {
    await axios.post(`${backendURL}/logout`)
    gameStore.resetStats()
    gameStore.userRegistered = false
    gameStore.isGameStarted = false
    router.push('/')
  }

  return {
    setupGame,
    newGame,
    getRankingsByBudget,
    getRankingsByTime,
    restartGame,
    onHire,
    getInProgressGames,
    exitGame,
    logout
  }
}
