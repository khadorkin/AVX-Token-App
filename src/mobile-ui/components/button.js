import styled from 'styled-components';
import theme from 'theme';

import TouchableHighlight from './touchableHighlight';

export const ButtonContent = styled(TouchableHighlight)`
  margin: 0 ${theme.buttonPadding};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
