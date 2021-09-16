import React from 'react';

import {
  Container
} from './styles';

interface BulletProps {
    active?: boolean;
}

export function Bullet({ active }: BulletProps) {
  return <Container active={active} />
}