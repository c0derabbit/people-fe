import styled from 'styled-components'

export const gap = 16
export const pageSize = 1200
export const screen = {
  md: 800,
}

export const Button = styled.button`
  background: var(--primary);
  border: none;
  color: white;
  box-shadow: 5px 4px 0 0 var(--light-accent);
  padding: ${gap / 4}px ${gap / 2}px;
  cursor: pointer;

  &:hover,
  &:focus {
    background: var(--primary-darker);
    position: relative;
    top: 2px;
    left: 2px;
    box-shadow: 3px 2px 0 0 var(--light-accent);
  }
`

export const Container = styled.div`
  max-width: ${pageSize}px;
  margin: 0 auto;
  padding: 0 ${gap}px;
`

export const Grid = styled.div`
  list-style: none;
  padding: 0;

  display: grid;
  gap: ${gap}px;

  @media (min-width: ${screen.md}px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export default {}
