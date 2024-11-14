'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { dataPP } from './data';

const VerticalLineChart = () => {
  const svgRef = useRef(null);

  const [points, setPoints] = useState([]);
  const [realValues, setRealValues] = useState([]);

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, left: 50, bottom: 30 };
    const width = 600 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    // Gawe SVG container
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Gawe scales
    const xScale = d3.scaleLinear().domain([0, 3]).range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataPP, (d) => d['Depth (m)']) + 100])
      .range([0, height]);

    // Gawe garis nggo nang path
    const line = d3
      .line()
      .x((d) => xScale(d['Synthetic Pore Pressure']))
      .y((d) => yScale(d['Depth (m)']));

    //  X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    //  Y axis
    svg.append('g').call(d3.axisLeft(yScale));

    // Nggo gawe grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(''));

    svg
      .append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(''));

    //! Gawe garis log data PP
    svg
      .append('path')
      .datum(dataPP)
      .attr('fill', 'none')
      .attr('stroke', 'purple')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    //! Gawe point bulet2
    svg
      .selectAll('.point')
      .data(points)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', (d) => d[0])
      .attr('cy', (d) => d[1])
      .attr('r', 5)
      .attr('transform', `translate(-${margin.left},-${margin.top})`)
      .attr('fill', 'red');

    //! Gawe garis PP sintetik
    if (points.length >= 2) {
      const lineConnectingPoints = d3
        .line()
        .x((d) => d[0] - margin.left)
        .y((d) => d[1] - margin.top);

      svg
        .append('path')
        .datum(points)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('d', lineConnectingPoints);
    }
  }, [dataPP, points]);

  const handleClick = (event) => {
    const margin = { top: 20, right: 30, left: 50, bottom: 30 };
    const width = 600 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    // Gawe skala sek podo tanpa margin
    const xScale = d3.scaleLinear().domain([0, 3]).range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataPP, (d) => d['Depth (m)']) + 100])
      .range([0, height]);

    const [x, y] = d3.pointer(event);

    // Konversi koordinat SVG balik nang nilai asli
    // Tanpo ono tambahan margin
    const adjustedX = x - margin.left;
    const adjustedY = y - margin.top;
    console.log("xScale",adjustedX)

    const syntheticPorePressure = xScale.invert(adjustedX);
    const depth = yScale.invert(adjustedY);

    setPoints((prevPoints) => [...prevPoints, [x, y]]);

    console.log("point", {
      'Depth (m)': depth,
      'Synthetic Pore Pressure': syntheticPorePressure,
    },)

    setRealValues((prevValues) => [
      ...prevValues,
      {
        'Depth (m)': depth,
        'Synthetic Pore Pressure': syntheticPorePressure,
      },
    ]);
  };

  return (
    <div className='flex justify-center items-center h-screen flex-row '>
      <svg ref={svgRef} onClick={handleClick}></svg>
      {/* Tampilkan nilai sebenarnya */}
      <div className='text-sm'>
        <h3>PP sek dipencet:</h3>
        {realValues.map((value, index) => (
          <div key={index}>
            Point {index + 1} ==> Iki jero = {value['Depth (m)'].toFixed(2)}m, <br/> <span className='pl-[70px]'>
              Iki PP ={value['Synthetic Pore Pressure'].toFixed(2)}
              </span> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalLineChart;
