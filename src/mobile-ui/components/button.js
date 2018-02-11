import styled from 'styled-components';

import TouchableHighlight from './touchableHighlight';

export const ButtonContent = styled(TouchableHighlight)`
  margin: 0 ${props => props.theme.buttonPadding};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
