/* eslint-disable no-inline-comments */
/* eslint-disable line-comment-position */
// Vérifie si le mouvement est linéaire, c'est-à-dire horizontal ou vertical.
const isStraightLineMove = (fromPosition, toPosition) =>
  // Vérifie si le mouvement change soit en x, soit en y, mais pas les deux.
  Math.abs(fromPosition.x - toPosition.x) > 0 &&
  Math.abs(fromPosition.y - toPosition.y) > 0
// Calcule la direction du déplacement (1 pour positif, -1 pour négatif, 0 pour aucun mouvement).
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

// Fonction principale pour vérifier si un mouvement de tour est légal.
export const isRookMoveLegal = ({ fromPosition, toPosition, board }) => {
  const piece = board[fromPosition.x][fromPosition.y]

  // Vérifie si la pièce existe et si le mouvement est linéaire.
  if (!piece || isStraightLineMove(fromPosition, toPosition)) {
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
