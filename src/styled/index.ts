import styled from 'styled-components'

export const shadow = '5px 4px 0 0 var(--light-accent)'
export const shadowHover = '3px 2px 0 0 var(--light-accent)'
export const gap = 16
export const pageSize = 1200
export const screen = {
  md: 800,
}

export const buttonlike = `
  cursor: pointer;
  box-shadow: ${shadow};

  &:hover,
  &:focus {
    position: relative;
    top: 2px;
    left: 2px;
    box-shadow: ${shadowHover};
  }
`

export const Button = styled.button`
  background: var(--primary);
  border: none;
  color: white;
  padding: ${gap / 4}px ${gap / 2}px;
  ${buttonlike}

  &:hover,
  &:focus {
    background: var(--primary-darker);
  }
`

export const Card = styled.div<{ small?: boolean }>`
  ${buttonlike}
  background: var(--lighter-accent);
  padding: ${({ small }) => gap / (small ? 2 : 1)}px;
  border: 3px solid;
`

export const Container = styled.div`
  max-width: ${pageSize}px;
  margin: 0 auto;
  padding: 0 ${gap}px;
`

export const Grid = styled.div<{ cols?: number }>`
  list-style: none;
  padding: 0;

  display: grid;
  gap: ${gap}px;

  @media (min-width: ${screen.md}px) {
    grid-template-columns: repeat(${({cols}) => cols || 3}, 1fr);
  }
`

export default {}
