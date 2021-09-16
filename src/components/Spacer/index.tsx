import React from 'react';

import {
  Container
} from './styles';

interface SpacerProps {
    mt?: number;
    mb?: number;
}

export function Spacer({ mt, mb }: SpacerProps){
  return (
    <Container mt={mt} mb={mb} />
  );
}