import styled from 'styled-components/native';

export const ButtonContent = styled.View`
  margin: 0 ${props => props.theme.buttonPadding};
  display: flex;
  flex-direction: row;
  align-items: center;
`;
