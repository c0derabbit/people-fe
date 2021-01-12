import styled from 'styled-components'

export const shadow = '5px 4px 0 0 var(--light-accent)'
export const shadowHover = '3px 2px 0 0 var(--light-accent)'
export const shadowLg = '0 2px 0 0 var(--light-grey)'
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

export const Button = styled.button<{ intent?: string }>`
  background: var(--${(props) => props.intent || 'primary'});
  border: none;
  color: white !important;
  height: 27px;
  padding: ${gap / 4}px ${gap}px;
  ${buttonlike}

  &:hover,
  &:focus {
    background: var(
      --${(props) => (props.intent ? props.intent + '-hover' : 'primary-darker')}
    );
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

export const Field = styled.input`
  margin: ${gap / 3}px 0 ${gap}px;
  padding: 0 4px;
  border: 3px solid var(--primary);
  height: 36px;
  color: var(--primary);
`

export const Flex = styled.div`
  display: flex;
  gap: ${gap}px;
`

export const Grid = styled.div<{ cols?: number }>`
  list-style: none;
  padding: 0;

  display: grid;
  gap: ${gap}px;

  @media (min-width: ${screen.md}px) {
    grid-template-columns: repeat(${({ cols }) => cols || 3}, 1fr);
  }
`

export const Popup = styled.div`
  position: absolute;
  top: calc(100% - 3px);
  left: -10px;
  border: 4px double var(--primary-darker);
  background: white;
  color: var(--primary);
  min-width: 300px;
  min-height: 100px;
  text-align: left;
  padding: ${gap / 2}px;
  box-shadow: 4px 4px 0 0 var(--primary-lighter);
`

export default {}
