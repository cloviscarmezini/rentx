import styled from 'styled-components/native';

interface SpacerProps {
  mt?: number;
  mb?: number;
}

export const Container = styled.View<SpacerProps>`
  width: 100%;
  margin-top: ${({ mt })=> mt ? mt : 5}px;
  margin-bottom: ${({ mb })=> mb ? mb : 5}px;
`