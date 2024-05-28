import { baseAPIUrl } from './config'
import axios from 'axios'
import { useGameStore } from './stores/gameStore'
import { postOne } from './server'
import { useRouter } from 'vue-router'

export function useGame() {
  const gameStore = useGameStore()
  const router = useRouter()

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
      player_id: gameStore.playerId,
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
    const response = await axios.get(`${baseAPIUrl}/games/ranking/max_budget`)
    console.log(response.data)
    return response.data
  }

  const getRankingsByTime = async () => {
    const response = await axios.get(`${baseAPIUrl}/games/ranking/time_passed`)
    return response.data
  }

  const restartGame = async () => {
    gameStore.resetStats()
    await postOne('games', {
      time_passed: gameStore.timePassed,
      max_budget: gameStore.highestBudgetPeak,
      player_id: gameStore.playerId,
      budget: gameStore.budget,
      status: JSON.stringify(gameStore.gameStatus)
    }).then((data) => {
      gameStore.id = data.id
      gameStore.isGameStarted = true
      router.push({ name: 'production' }).catch((error) => {
        console.error(error)
      })
    })
  }

  const onHire = (candidate) => {
    let toHire = gameStore.candidates.find((c) => c.id === candidate.id)
    gameStore.hireCandidate(toHire)
    gameStore.candidates = gameStore.candidates.filter((c) => c.id !== candidate.id)
  }

  const getInProgressGames = async () => {
    const response = await axios.get(`${baseAPIUrl}/games/in_progress/${gameStore.playerId}`)
    return response.data
  }

  return {
    setupGame,
    newGame,
    getRankingsByBudget,
    getRankingsByTime,
    restartGame,
    onHire,
    getInProgressGames
  }
}
