/* eslint-disable no-inline-comments */
/* eslint-disable line-comment-position */
// Vérifie si le mouvement est légal pour un cavalier.
export const isKnightMoveLegal = ({ fromPosition, toPosition, board }) => {
  const piece = board[fromPosition.x][fromPosition.y]

  if (!piece) {
    return false
  }

  // Calcule la différence en x et en y entre la position de départ et d'arrivée.
  const dx = Math.abs(fromPosition.x - toPosition.x)
  const dy = Math.abs(fromPosition.y - toPosition.y)
  // Un mouvement de cavalier est valide s'il se déplace en L (2 cases dans une direction et 1 dans l'autre).
  const isValidMove = (dx === 2 && dy === 1) || (dx === 1 && dy === 2)
  // Vérifie également si la case d'arrivée est vide ou occupée par une pièce adverse.
  const targetPiece = board[toPosition.x][toPosition.y]
  const isCapture = targetPiece && targetPiece.color !== piece.color

  return isValidMove && (!targetPiece || isCapture)
}
