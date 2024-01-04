// components/KonvaCanvas.js
import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Circle, Text, Group } from 'react-konva';
import { Button, ButtonGroup } from '@nextui-org/react';

const DrawingCanvas = () => {
  const stageRef = useRef(null);
  const [circles, setCircles] = useState([]);
  const [circleMode, setCircleMode] = useState(true);
  const [arrowMode, setArrowMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const selectedCircleRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current;
    stage.container().style.cursor = 'pointer';
  }, []);

  const handleStageClick = (e) => {
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();
    const clickedShape = e.target;
    // Check the active mode and perform corresponding actions
    if (circleMode) {
        const newCircle = {
            id: circles.length + 1,
            x: pointerPos.x,
            y: pointerPos.y,
            radius: 30,
            stroke: 'black', // Set the border color
            strokeWidth: '2', // Set the border thickness
            fill: 'rgba(0, 0, 0, 0)', // Set transparent fill
            label: 'q' + circles.length,
          };

      setCircles((prevCircles) => [...prevCircles, newCircle]);
    } else if (arrowMode) {
      // Implement arrow mode logic
    } else if (deleteMode) {
        if (clickedShape instanceof window.Konva.Circle) {
            const newCircles = circles.filter((circle) => circle.id !== clickedShape.attrs.id);
            setCircles(newCircles);
          }
    }
  };

  const handleCircleClick = (circleId) => {
    if (deleteMode) {
        // Do nothing here, handling delete in handleStageClick
        return;
      }
    console.log(`Clicked circle with ID ${circleId}`);
    // Implement your logic for circle click
  };
  const handleCircleDragMove = (index, e) => {
    const { x, y } = e.target.position();
    const updatedCircles = [...circles];
    updatedCircles[index] = { ...updatedCircles[index], x, y };
    setCircles(updatedCircles);
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
          {circles.map((circle, index) => (
              <React.Fragment key={circle.id}>
                <Circle
                  x={circle.x}
                  y={circle.y}
                  id={circle.id}
                  radius={circle.radius}
                  fill={circle.fill}
                  stroke={circle.stroke}
                  strokeWidth={circle.srokeWidth}
                  onClick={() => handleCircleClick(circle.id)}
                  draggable={circleMode}
                  onDragMove={(e) => handleCircleDragMove(index, e)}
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
