// components/KonvaCanvas.js
import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Circle, Text, Group, Arrow } from 'react-konva';
import { Button, ButtonGroup } from '@nextui-org/react';

const DrawingCanvas = () => {
  const stageRef = useRef(null);
  const [circles, setCircles] = useState([]);
  const [circleMode, setCircleMode] = useState(true);
  const [arrowMode, setArrowMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [arrowStartCircle, setArrowStartCircle] = useState(null);

  useEffect(() => {
    const stage = stageRef.current;
    stage.container().style.cursor = 'pointer';
  }, []);


  const handleArrowMode = (pointerPos, clickedShape) => {
    if (clickedShape instanceof window.Konva.Circle) {
      if (!arrowStartCircle) {
        // First click to select the starting circle
        setArrowStartCircle(clickedShape);
        console.log(arrowStartCircle);
      } else {
        // Second click to select the ending circle and draw the arrow
        const startCircle = arrowStartCircle;
        const endCircle = clickedShape;
  
        const newArrow = {
          id: `arrow-${circles.length + 1}`,
          points: [startCircle.x(), startCircle.y(), endCircle.x(), endCircle.y()],
          pointerLength: 10,
          pointerWidth: 10,
          stroke: 'black',
          strokeWidth: 2,
        };
  
        setCircles((prevCircles) => [...prevCircles, newArrow]);
        setArrowStartCircle(null); // Reset starting circle after drawing arrow
      }
    }
  };

  
  const handleStageClick = (e) => {
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();
    const clickedShape = e.target;
    // Check the active mode and perform corresponding actions
    if (circleMode) {
        const newCircle = {
            id: (circles.length).toString(),
            x: pointerPos.x,
            y: pointerPos.y,
            radius: 30,
            stroke: 'black', // Set the border color
            strokeWidth: 2, // Set the border thickness
            fill: 'rgba(0, 0, 0, 0)', // Set transparent fill
            label: 'q' + circles.length,
          };

      setCircles((prevCircles) => [...prevCircles, newCircle]);
    } else if (arrowMode) {
        handleArrowMode(pointerPos, clickedShape);
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
                  stroke={circle.id === arrowStartCircle?.id ? 'red' : circle.stroke}
                  strokeWidth={circle.strokeWidth}
                  onClick={() => handleCircleClick(circle.id)}
                  draggable={circleMode}
                  onDragMove={(e) => handleCircleDragMove(index, e)}
                />
                <Text x={circle.x - 5} y={circle.y - 5} text={circle.label} />
              </React.Fragment>
            ))}

            {circles
    .filter(circle => circle.hasOwnProperty('points')) // Filter out circles without points (arrows)
    .map((arrow) => (
      <Arrow
        key={arrow.id}
        points={arrow.points}
        pointerLength={arrow.pointerLength}
        pointerWidth={arrow.pointerWidth}
        stroke={arrow.stroke}
        strokeWidth={arrow.strokeWidth}
      />
    ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default DrawingCanvas;
