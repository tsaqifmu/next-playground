

'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const page = () => {
  const [barData, setBarData] = useState([
    { name: 'john doe', age: 24 },
    { name: 'will smith', age: 50 },
    { name: 'jane doe', age: 15 },
    { name: 'alice doe', age: 90 },
  ]);

  // Calculate max age

  const maxAge = d3.max(barData, (d) => d.age);
  console.log(maxAge);

  const RECT_WIDTH = 50;
  const TOTAL_HEIGHT = 100;

  const margin = {
    top: 100,
    right: 90,
    bottom: 100,
    left: 40,
  };

  const myElementRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(myElementRef['current']);

    const allRectData = svg
      .selectAll('rect')
      .data(barData)
      .enter()
      .append('rect')
      // Calculate X-position based on it's index
      .attr('x', (d, i) => i * RECT_WIDTH + margin.left)
      // Calculate Y-position based on it's index
      .attr('y', (d) => {
        console.log(TOTAL_HEIGHT - d.age);
        return TOTAL_HEIGHT - d.age + margin.top;
      })
      // set height based on the bound datum
      .attr('height', (d) => {
        return d.age;
      })
      // rest of attribute are constant value
      .attr('width', RECT_WIDTH);

    // draw X-axis line
    svg
      .append('line')
      .attr('x1', margin.left)
      .attr('y1', TOTAL_HEIGHT + margin.top + 10)
      .attr('x2', RECT_WIDTH * barData.length)
      .attr('y2', TOTAL_HEIGHT + margin.top + 10)
      .attr('stroke', 'green')
      .attr('stroke-width', 2);

    allRectData.attr('stroke', 'red');
  }, []);

  return (
    <div className='flex justify-center items-center h-screen flex-col space-y-5'>
      <h3>Episode 01</h3>

      <svg
        ref={myElementRef}
        // width={RECT_WIDTH * barData.length}
        height={TOTAL_HEIGHT + margin.top + margin.bottom}
        style={{ border: '1px dashed' }}
      ></svg>
    </div>
  );
};

export default page;

