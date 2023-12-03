export const convertToAlgebraicNotation = (fromPosition, toPosition) => {
  const files = "abcdefgh"
  const toNotation = (position) => {
    const file = files[position.y]
    const rank = 8 - position.x

    return `${file}${rank}`
  }
  const fromNotation = toNotation(fromPosition)
  const toNotationStr = toNotation(toPosition)

  return `${fromNotation}${toNotationStr}`
}
