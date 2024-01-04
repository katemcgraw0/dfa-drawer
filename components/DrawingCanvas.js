// components/KonvaCanvas.js
import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Circle, Text } from 'react-konva';
import { Button, ButtonGroup } from '@nextui-org/react';

const DrawingCanvas = () => {
  const stageRef = useRef(null);
  const [circles, setCircles] = useState([]);
  const [circleMode, setCircleMode] = useState(true);
  const [arrowMode, setArrowMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    stage.container().style.cursor = 'pointer';
  }, []);

  const handleStageClick = (e) => {
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();

    // Check the active mode and perform corresponding actions
    if (circleMode) {
      const newCircle = {
        id: circles.length + 1,
        x: pointerPos.x,
        y: pointerPos.y,
        radius: 30,
        stroke: 'black',
        strokeWidth: 2,
        label: 'q' + circles.length,
      };

      setCircles((prevCircles) => [...prevCircles, newCircle]);
    } else if (arrowMode) {
      // Implement arrow mode logic
    } else if (deleteMode) {
      // Implement delete mode logic
    }
  };

  const handleCircleClick = (circleId) => {
    console.log(`Clicked circle with ID ${circleId}`);
    // Implement your logic for circle click
  };

  const setMode = (mode) => {
    // Set the corresponding mode and reset others
    setCircleMode(mode === 'circle');
    setArrowMode(mode === 'arrow');
    setDeleteMode(mode === 'delete');
  };

  return (
    <div className="flex flex-col">
      <div className="border-4 border-black flex flex-row items-center justify-center">
        <ButtonGroup>
          <Button
            className={`px-2 ${circleMode ? 'bg-gray-700 text-white' : ''}`}
            onClick={() => setMode('circle')}
          >
            Circle
          </Button>
          <Button
            className={`px-2 ${arrowMode ? 'bg-gray-700 text-white' : ''}`}
            onClick={() => setMode('arrow')}
          >
            Arrow
          </Button>
          <Button
            className={`px-2 ${deleteMode ? 'bg-gray-700 text-white' : ''}`}
            onClick={() => setMode('delete')}
          >
            Delete
          </Button>
        </ButtonGroup>
      </div>
      <div className="border-4 border-black">
        <Stage width={600} height={400} ref={stageRef} onClick={handleStageClick}>
          <Layer>
            {circles.map((circle) => (
              <React.Fragment key={circle.id}>
                <Circle
                  x={circle.x}
                  y={circle.y}
                  radius={circle.radius}
                  fill={circle.fill}
                  onClick={() => handleCircleClick(circle.id)}
                  draggable
                />
                <Text x={circle.x - 5} y={circle.y - 5} text={circle.label} />
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default DrawingCanvas;
