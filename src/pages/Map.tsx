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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    document.title = 'Bathymetric Map';
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}bathymetry.json`)
      .then((res) => res.json())
      .then((data) => {
        const zLand: number[][] = data.z.map((row: number[]) =>
          row.map((z: number) => (z > 0 ? z : NaN))
        );
        setBathy({ ...data, zLand });
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}samples.json`)
      .then((res) => res.json())
      .then((data) => setSamples(data));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        title: { text: 'Chlorophyll-a (mg/m³)<br>04.07.2011-04.08.2011' },
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
    const getImagePath = (rawPath: string | undefined): string | null => {
      if (!rawPath) return null;
      const trimmed = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath;
      const normalized = trimmed.includes('/') ? trimmed : `ba_images/${trimmed}`;
      return `${import.meta.env.BASE_URL}${normalized}`;
    };

    graphDiv.on('plotly_hover', (event: any) => {
      const rawImage = event.points?.[0]?.customdata?.[0];
      const image = getImagePath(rawImage);
      if (!lockedImage) setImageSrc(image);
    });

    graphDiv.on('plotly_unhover', () => {
      if (!lockedImage) setImageSrc(null);
    });

    graphDiv.on('plotly_click', (event: any) => {
      const rawImage = event.points?.[0]?.customdata?.[0];
      const image = getImagePath(rawImage);
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
        {/* Top block */}
        <div
        style={{
            padding: '1rem',
            backgroundColor: '#f8f8f8',
            borderBottom: '1px solid #ccc',
            flexShrink: 0,
        }}
        >
        <h2>Bathymetric Map</h2>
        <p>
            {isMobile
            ? 'Tap on samples to view their position on the plot below. Unfortunately, scrolling is not available on mobile.'
            : 'Hover over samples to view their position on the plot. Scroll to zoom, left click to rotate, right click to pan.'}
        </p>
        </div>

        {/* Middle section - Grows to fill space */}
        <div
        style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flex: 1,
            overflow: 'hidden',
        }}
        >
        <div
            style={{
            flex: '1 1 60%',
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
                config={{
                scrollZoom: true,
                doubleClick: 'reset+autosize',
                responsive: true,
                displayModeBar: false,
                touchmode: 'rotate',
                }}
            />
            ) : (
            <p>Loading bathymetry...</p>
            )}
        </div>

        <div
            style={{
            flex: '1 1 40%',
            padding: '10px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            order: isMobile ? 1 : 0,
            }}
        >
            <img
            src={lockedImage || imageSrc || `${import.meta.env.BASE_URL}ba_images/ba_base.png`}
            alt="Sample Preview"
            style={{
                width: isMobile ? '100%' : '100%',
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

        {/* Bottom block */}
        <div
        style={{
            padding: '1rem',
            backgroundColor: '#f0f0f0',
            borderTop: '1px solid #ccc',
            flexShrink: 0,
        }}
        >
        <p>Chlorophyll data: {' '}
        <a href="https://doi.org/10.5067/AQUA/MODIS/L3M/CHL/2022" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            NASA MODIS-Aqua (2022);
        </a>
        <br></br>
        Bathymetry data: 
        <a href="https://www.ncei.noaa.gov/access/metadata/landing-page/bin/iso?id=gov.noaa.ngdc.mgg.dem:11516" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit'}}>
            NOAA Tsunami DEM for the Galápagos region
        </a>



        </p>
        </div>
    </div>
    );

};

export default Map;
