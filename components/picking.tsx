'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { dataPP } from './data';

const page = () => {
  const svgRef = useRef(null);

  const [points, setPoints] = useState([]);

  console.log('point', points);

  const width = 300;
  const height = 600;

  const xScale = d3.scaleLinear().domain([0, 2]).range([0, width]); // convert data kedalam ukuran pixel (sesuai width)

  const yScale = d3.scaleLinear().domain([3000, 0]).range([0, height]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Clear SVG before rendering
    svg.selectAll('*').remove();

    // Draw the initial line chart
    const line = d3
      .line()
      .x((d) => {
        return xScale(d['Synthetic Pore Pressure']);
      })
      .y((d) => yScale(d['Depth (m)']));

    svg
      .append('path')
      .datum(dataPP)
      .attr('y', 20)
      .attr('fill', 'none')
      .attr('stroke', 'purple')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Draw axes
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(3));

    svg.append('g').call(d3.axisLeft(yScale).ticks(10));

    // Draw points
    svg
      .selectAll('.point')
      .data(points)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', (d) => d[0])
      .attr('cy', (d) => d[1])
      .attr('r', 5)
      .attr('fill', 'red');

    // Draw line connecting all points
    if (points.length >= 2) {
      const lineConnectingPoints = d3
        .line()
        .x((d) => d[0])
        .y((d) => d[1]);

      svg
        .append('path')
        .datum(points)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('d', lineConnectingPoints);
    }
  }, [dataPP, points]);

  const handleClick = (event: any) => {
    const [x, y] = d3.pointer(event);
    setPoints((prevPoints) => [...prevPoints, [x, y]]);
  };

  return (
    <div className='flex justify-center items-center h-screen flex-col space-y-5'>
      <svg
        ref={svgRef}
        width={width + 50}
        height={height + 40}
        className='bg-blue-50 border border-slate-900 '
        onClick={handleClick}
      >
        {/* <text
          x={width / 2}
          y={15}
          textAnchor='middle'
          style={{ fontSize: '12px', fill: 'purple' }}
        >
          H-W-250_PP_RT_phmn1
        </text> */}
        <text
          transform={`rotate(-90)`}
          x={-(height / 2)}
          y={-30}
          textAnchor='middle'
          style={{ fontSize: '12px' }}
        >
          TDepth (m)
        </text>
      </svg>
    </div>
  );
};

export default page;
