import React, { useState } from 'react';
import { useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage
} from './styles';

interface ImageSliderProps {
  imagesUrls: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrls }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
        <ImageIndexes>
          {
            imagesUrls.map((_, index) => 
              <ImageIndex key={index} active={index === imageIndex}/>
            )
          }
        </ImageIndexes>

        <FlatList 
          data={imagesUrls}
          keyExtractor={key => key}
          renderItem={({ item })=>
            <CarImageWrapper>
              <CarImage
                source={{ uri: item }}
                resizeMode="cover"
              />
            </CarImageWrapper>
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
        />
    </Container>
  );
}