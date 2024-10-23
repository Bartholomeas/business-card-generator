'use client';

import { Stage, Layer, Rect, Circle } from 'react-konva';


export const CardCreator = () => {
  return <Stage
    width={window.innerWidth}
    height={window.innerHeight}
  >
    <Layer>
      <Rect width={50} height={50} fill="red" />
      <Circle x={200} y={200} radius={50} fill="blue" />
    </Layer>
  </Stage>;
};
