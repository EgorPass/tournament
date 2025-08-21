export function filterForPlayer<T extends { tournament_player_id: string, level_id: string }>( arr: T[], tournament_player_id: string, level_id: string, notLevel = false ) {
  return arr.filter( it => {
    const playerState = it.tournament_player_id === tournament_player_id
    const levelState = !notLevel 
                          ? it.level_id === level_id 
                          : it.level_id !== level_id
    return levelState && playerState 
  })
}