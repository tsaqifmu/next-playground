'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Page = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rectCreated, setRectCreated] = useState(false); // State tambahan untuk melacak apakah `rect` sudah dibuat

  const boardDimension = 300;
  const boxDimension = 100;

  const myElementRef = useRef(null);

  useEffect(() => {
    const svgBox = d3.select(myElementRef.current);

    svgBox.select('rect').attr('transform', `translate(${x}, ${y})`);
  }, [x, y]);

  useEffect(() => {
    const svgBox = d3.select(myElementRef.current);

    // SVG moving box
    svgBox.select('rect').attr('fill', '#63BBF2');

    // Draw border
    svgBox
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', boardDimension)
      .attr('height', boardDimension)
      .attr('fill', 'none')
      .attr('stroke-width', 4)
      .attr('stroke', 'black');

    // Draw vertical line
    svgBox
      .append('line')
      .attr('x1', 100)
      .attr('y1', 0)
      .attr('x2', 100)
      .attr('y2', 300)
      .attr('stroke-width', 1)
      .attr('stroke', 'black');

    svgBox
      .append('line')
      .attr('x1', 200)
      .attr('y1', 0)
      .attr('x2', 200)
      .attr('y2', 300)
      .attr('stroke-width', 1)
      .attr('stroke', 'black');

    // Draw horizontal line
    svgBox
      .append('line')
      .attr('x1', 0)
      .attr('y1', 100)
      .attr('x2', 300)
      .attr('y2', 100)
      .attr('stroke-width', 1)
      .attr('stroke', 'black');

    svgBox
      .append('line')
      .attr('x1', 0)
      .attr('y1', 200)
      .attr('x2', 300)
      .attr('y2', 200)
      .attr('stroke-width', 1)
      .attr('stroke', 'black');
  }, []);

  return (
    <div className='flex justify-center items-center h-screen flex-col space-y-5'>
      <h3>Episode 01</h3>
      <p>X value</p>
      <input
        type='range'
        value={x}
        min={0}
        max={200}
        onChange={(event) => {
          const xValue = Number(event.target.value);
          setX(xValue);
        }}
      />
      <div className='flex items-center'>
        <div>
          <p>X value</p>
          <input
            className='rotate-90'
            type='range'
            value={y}
            min={0}
            max={200}
            onChange={(event) => {
              const yValue = Number(event.target.value);
              setY(yValue);
            }}
          />
        </div>
        <svg
          ref={myElementRef}
          width={boardDimension}
          height={boardDimension}
          className='bg-slate-200'
        >
          <rect x={0} y={0} width={boxDimension} height={boxDimension} />
        </svg>
      </div>
    </div>
  );
};

export default Page;
