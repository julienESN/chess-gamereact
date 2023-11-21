// Vérifie si le mouvement est légal pour une reine.
const calculateDirection = (from, to) => {
  // Retourne 0 si aucune différence (pas de mouvement).
  if (to - from === 0) {
    return 0
  }

  // Utilise un opérateur ternaire pour déterminer la direction.
  return to - from > 0 ? 1 : -1
}
// Vérifie si le chemin entre deux positions est libre de toute pièce.
const isPathClear = ({ fromPosition, toPosition, board, delta }) => {
  let checkX = fromPosition.x + delta.deltaX
  let checkY = fromPosition.y + delta.deltaY

  // Parcours chaque case entre la position de départ et d'arrivée.
  while (checkX !== toPosition.x || checkY !== toPosition.y) {
    // Si une case est occupée, retourne faux.
    if (board[checkX][checkY]) {
      return false
    }

    // Avance d'une case dans la direction déterminée.
    checkX += delta.deltaX
    checkY += delta.deltaY
  }

  // Si toutes les cases sont libres, retourne vrai.
  return true
}
// Vérifie si le mouvement est légal pour une reine.
export const isQueenMoveLegal = ({ fromPosition, toPosition, board }) => {
  const piece = board[fromPosition.x][fromPosition.y]

  if (!piece) {
    return false
  }

  const dx = Math.abs(fromPosition.x - toPosition.x)
  const dy = Math.abs(fromPosition.y - toPosition.y)
  // Un mouvement de reine est valide s'il est linéaire ou diagonal.
  const isStraightLine = dx === 0 || dy === 0
  const isDiagonal = dx === dy

  if (!isStraightLine && !isDiagonal) {
    return false
  }

  // Calcule la direction du mouvement en x et en y.
  const delta = {
    deltaX: calculateDirection(fromPosition.x, toPosition.x),
    deltaY: calculateDirection(fromPosition.y, toPosition.y)
  }

  // Vérifie si le chemin est libre.
  if (!isPathClear({ fromPosition, toPosition, board, delta })) {
    return false
  }

  // Vérifie si la pièce à la position de destination est de la même couleur.
  const targetPiece = board[toPosition.x][toPosition.y]

  return !(targetPiece && targetPiece.color === piece.color)
}
