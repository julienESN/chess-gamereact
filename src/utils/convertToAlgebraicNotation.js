export const convertToAlgebraicNotation = (fromPosition, toPosition) => {
  const files = "abcdefgh"
  // Transforme une position de votre tableau en notation algébrique
  const toNotation = (position) => {
    const file = files[position.y]
    const rank = 8 - position.x

    return `${file}${rank}`
  }
  const fromNotation = toNotation(fromPosition)
  const toNotationStr = toNotation(toPosition)

  return `${fromNotation}${toNotationStr}`
}
