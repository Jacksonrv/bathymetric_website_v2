import React, { useEffect, useMemo, useState } from 'react';
import Plot from 'react-plotly.js';

interface BathyData {
  x: number[][];
  y: number[][];
  z: number[][];
  c: number[][];
  zLand: number[][];
  colorbar?: {
    tickvals: number[];
    ticktext: string[];
    title: string;
  };
}

const Map: React.FC = () => {
  const [bathy, setBathy] = useState<BathyData | null>(null);
  const [samples, setSamples] = useState<any[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [lockedImage, setLockedImage] = useState<string | null>(null);
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/bathymetry.json')
      .then((res) => res.json())
      .then((data) => {
        const zLand: number[][] = data.z.map((row: number[]) =>
          row.map((z: number) => (z > 0 ? z : NaN))
        );
        setBathy({ ...data, zLand });
      });
  }, []);

  useEffect(() => {
    fetch('/samples.json')
      .then((res) => res.json())
      .then((data) => setSamples(data));
  }, []);

  const data = useMemo(() => {
    if (!bathy) return [];

    const bathySurface = {
      type: 'surface',
      x: bathy.x,
      y: bathy.y,
      z: bathy.z,
      surfacecolor: bathy.c,
      colorscale: 'Viridis',
      cmin: Math.min(...bathy.c.flat().filter((v) => !isNaN(v))),
      cmax: Math.max(...bathy.c.flat().filter((v) => !isNaN(v))),
      colorbar: {
        title: {text: 'Chlorophyll'},
        x: -0.15,
        len: 0.75,
        tickvals: bathy.colorbar?.tickvals,
        ticktext: bathy.colorbar?.ticktext,
      },
      opacity: 0.7,
      name: 'Bathymetry',
      showscale: true,
    };

    const landOverlay = {
      type: 'surface',
      x: bathy.x,
      y: bathy.y,
      z: bathy.zLand,
      surfacecolor: bathy.zLand.map((row) => row.map(() => 1)),
      colorscale: [[0, 'black'], [1, 'black']],
      showscale: false,
      opacity: 1,
      name: 'Land',
    };

    const interactiveLayer = {
      type: 'scatter3d',
      mode: 'markers',
      x: samples.map((d) => d.Longitude),
      y: samples.map((d) => d.Latitude),
      z: samples.map((d) => d.Depth),
      marker: {
        size: 20,
        color: samples.map((_, idx) =>
          idx === selectedPointIndex ? 'hotpink' : 'rgba(0,0,0,0)'
        ),
      },
      name: '',
      customdata: samples.map((d) => [d.img_src]),
      hoverinfo: 'text',
      text: samples.map(() => 'Sample'),
    };

    const visibleLayer = {
      type: 'scatter3d',
      mode: 'markers',
      x: samples.map((d) => d.Longitude),
      y: samples.map((d) => d.Latitude),
      z: samples.map((d) => d.Depth),
      marker: {
        size: 4,
        color: 'purple',
      },
      name: 'Samples',
      hoverinfo: 'none',
    };

    return [bathySurface, landOverlay, interactiveLayer, visibleLayer];
  }, [bathy, samples, selectedPointIndex]);

  const layout = useMemo(() => ({
    autosize: true,
    title: 'Bathymetric Surface with Land Overlay',
    scene: {
      xaxis: { title: 'Longitude' },
      yaxis: { title: 'Latitude' },
      zaxis: { title: 'Depth (m)' },
      aspectratio: { x: 1, y: 1, z: 0.2 },
    },
    margin: { l: 0, r: 0, t: 40, b: 0 },
    showlegend: false,
  }), []);

  const handleInitialized = (_figure: any, graphDiv: any) => {
    graphDiv.on('plotly_hover', (event: any) => {
      const image = event.points?.[0]?.customdata?.[0];
      if (!lockedImage) setImageSrc(image);
    });

    graphDiv.on('plotly_unhover', () => {
      if (!lockedImage) setImageSrc(null);
    });

    graphDiv.on('plotly_click', (event: any) => {
      const image = event.points?.[0]?.customdata?.[0];
      const pointIndex = event.points?.[0]?.pointIndex;

      if (typeof pointIndex === 'number') {
        setSelectedPointIndex(pointIndex);
      }

      if (image) {
        setLockedImage(image);
      } else {
        setLockedImage(null);
        setImageSrc(null);
        setSelectedPointIndex(null);
      }
    });
  };

return (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
    }}
  >
    {/* Top text section */}
    <div
      style={{
        padding: '1rem',
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #ccc',
      }}
    >
      <h2>Bathymetric Map</h2>
      <p>Hover over the map to preview sample images on the right.</p>
    </div>

    {/* Main content: map + image side-by-side */}
    <div
      style={{
        display: 'flex',
        flex: 1, // fill available space
        overflow: 'hidden',
      }}
    >
      {/* Plot (50%) */}
      <div
        style={{
          flexBasis: '60%',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {bathy ? (
          <Plot
            data={data}
            layout={layout}
            useResizeHandler
            style={{ width: '100%', height: '100%' }}
            onInitialized={handleInitialized}
            config={{ scrollZoom: true }}
          />
        ) : (
          <p>Loading bathymetry...</p>
        )}
      </div>

      {/* Image Preview (30%) */}
      <div
        style={{
          flexBasis: '40%',
          flexShrink: 0,
          padding: '10px',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={lockedImage || imageSrc || '/ba_images/ba_base.png'}
          alt="Sample Preview"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            border: '2px solid black',
            boxSizing: 'border-box',
          }}
        />
      </div>
    </div>

    {/* Bottom box (footer/info/controls/etc.) */}
    <div
      style={{
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        borderTop: '1px solid #ccc',
      }}
    >
      <p>This is additional information, controls, or status output.</p>
    </div>
  </div>
);



};

export default Map;