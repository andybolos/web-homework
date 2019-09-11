import styled from '@emotion/styled'

export const Button = styled.button`
  padding: 4px 10px;
  background-color: #ffffff;
  border: none;
  border-radius: 50px;
  border-color: ${props => props.delete ? '#DB4939' : '#0ADB92'};
  border: 2px solid;
  color: ${props => props.delete ? '#DB4939' : '#0ADB92'};
  font-size: 12px;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s ease 0s;

  &:hover {
    border-color: ${props => props.delete ? '#C14032' : '#0ADB92'};
    color: #FFFFFF;
    background-color: ${props => props.delete ? '#C14032' : '#0ADB92'};
    transition: all 0.2s ease 0s;
  }

  &:focus {
    outline: none;
  }
`
