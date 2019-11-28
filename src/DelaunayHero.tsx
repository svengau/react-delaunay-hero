import React from 'react';
import PropTypes from 'prop-types';
import Delaunator from 'delaunator';
import { lighten } from 'polished';

interface colorCalculationOptions {
  triangleCenter: { x: number; y: number };
  triangleIndex: string;
  triangle: any;
  color: string;
  colorCaching: { [key: string]: any };
  canvasWidth: number;
  canvasHeight: number;
}

enum PresetDistribution {
  quasirandom = 'quasirandom',
  pseudorandom = 'pseudorandom',
  vertical = 'vertical',
  horizontal = 'horizontal',
}
enum PresetFillColor {
  gradient = 'gradient',
  random = 'random',
}
enum PresetLineColor {
  gradient = 'gradient',
}

interface IProps {
  className?: string;
  width?: string;
  height?: string;
  /** Main color used to fill triangles and color lines if no specific functions is provided */
  color: string;
  lineColor?: (
    options: colorCalculationOptions,
  ) => string | PresetLineColor | string;
  fillColor?: (options: colorCalculationOptions) => string | PresetFillColor;
  backgroundColor?: string;
  borderColor?: string;
  maxPoints?: number;
  maxSpeed?: number;
  minSpeed?: number;
  lineWidth?: number;
  animate?: boolean;
  debug?: boolean;
  children?: any;
  distribute?: PresetDistribution;
}
interface Particle {
  index?: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}
interface IState {
  particles: Particle[];
}

function isNumeric(x) {
  return parseFloat(x).toString() === x.toString();
}

/**
 * DelaunayHero components
 */
class DelaunayHero extends React.Component<IProps, IState> {
  state = { particles: [] };
  count = 0;
  colorCaching = {};
  animationFrameId: number;

  static propTypes = {
    className: PropTypes.string,
    /** Hero's width  */
    width: PropTypes.string,
    /** Hero's Height  */
    height: PropTypes.string,
    color: PropTypes.string,
    lineColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    maxPoints: PropTypes.number,
    maxSpeed: PropTypes.number,
    minSpeed: PropTypes.number,
    lineWidth: PropTypes.number,
    animate: PropTypes.bool,
    debug: PropTypes.bool,
  };

  static defaultProps = {
    width: '100%',
    height: '400',
    color: 'orange',
    backgroundColor: 'white',
    borderColor: null,
    maxPoints: 50,
    maxSpeed: 0.6,
    minSpeed: 0.5,
    lineWidth: 0.1,
    lineColor: null,
    fillColor: 'random',
    animate: false,
    debug: false,
    distribute: 'quasirandom', // horizontal, vertical, quasirandom
  };

  componentDidMount() {
    //const { canvasWidth, canvasHeight } = this.getCanvasSize();

    const { distribute: distributeFn } = this.props;
    const particles = [];

    this[`distribute_${distributeFn}`](particles);

    this.setState({ particles });

    this.animationFrameId = requestAnimationFrame(this.renderCanvas);
  }

  componentWillUnmount() {
    const { animate } = this.props;
    if (animate) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  getCanvasEdges = () => {
    const { canvasWidth, canvasHeight } = this.getCanvasSize();
    return [
      {
        x: 0,
        y: 0,
        velocityX: 0,
        velocityY: 0,
      },
      {
        x: 0,
        y: canvasHeight,
        velocityX: 0,
        velocityY: 0,
      },
      {
        x: canvasWidth,
        y: 0,
        velocityX: 0,
        velocityY: 0,
      },
      {
        x: canvasWidth,
        y: canvasHeight,
        velocityX: 0,
        velocityY: 0,
      },
    ];
  };

  distribute_vertical(particles: Particle[]) {
    const { maxPoints } = this.props;
    const { canvasWidth, canvasHeight } = this.getCanvasSize();
    const meanHeight = canvasHeight / maxPoints;

    for (var i = 0; i < maxPoints; i++) {
      let x = canvasWidth / 2;
      let y = meanHeight * (i + Math.random());

      x = x > 25 ? (x < canvasWidth - 20 ? x : canvasWidth) : 0;
      y = y > 25 ? (y < canvasHeight - 20 ? y : canvasHeight) : 0;
      this.addParticle(x, y, particles);
    }
  }

  distribute_horizontal(particles) {
    const { maxPoints } = this.props;
    const { canvasWidth, canvasHeight } = this.getCanvasSize();
    const meanWidth = Math.round(canvasWidth / maxPoints);

    for (var i = 0; i < maxPoints; i++) {
      let x = meanWidth * (i + Math.random());
      let y = canvasHeight / 2;

      x = x > 25 ? (x < canvasWidth - 20 ? x : canvasWidth) : 0;
      y = y > 25 ? (y < canvasHeight - 20 ? y : canvasHeight) : 0;
      this.addParticle(x, y, particles);
    }
  }

  distribute_diagonal(particles) {
    const { maxPoints } = this.props;
    const { canvasWidth, canvasHeight } = this.getCanvasSize();
    const meanWidth = Math.round(canvasWidth / maxPoints);
    const meanHeight = Math.round(canvasHeight / maxPoints);

    for (var i = 0; i < maxPoints; i++) {
      let x = meanWidth * i + Math.random() * meanWidth;
      let y = meanHeight * i + Math.random() * meanHeight;

      x = x > 25 ? (x < canvasWidth - 20 ? x : canvasWidth) : 0;
      y = y > 25 ? (y < canvasHeight - 20 ? y : canvasHeight) : 0;
      this.addParticle(x, y, particles);
    }
  }

  distribute_pseudorandom(particles) {
    const { maxPoints } = this.props;
    const { canvasWidth, canvasHeight } = this.getCanvasSize();

    particles.push(...this.getCanvasEdges());

    for (var i = 0; i < maxPoints; i++) {
      let x = canvasWidth * Math.random();
      let y = canvasHeight * Math.random();

      x = x > 25 ? (x < canvasWidth - 25 ? x : canvasWidth) : 0;
      y = y > 25 ? (y < canvasHeight - 25 ? y : canvasHeight) : 0;
      this.addParticle(x, y, particles);
    }
  }

  distribute_square(particles) {
    const { maxPoints } = this.props;
    const { canvasWidth, canvasHeight } = this.getCanvasSize();
    const totalArea = canvasWidth * canvasHeight;
    const pointArea = totalArea / maxPoints;
    const length = Math.sqrt(pointArea);

    for (var i = 0; i <= canvasWidth + length; i += length) {
      for (var j = 0; j <= canvasHeight + length; j += length) {
        this.addParticle(i, j, particles);
      }
    }
  }

  distribute_quasirandom(particles) {
    const { maxPoints } = this.props;
    const { canvasWidth, canvasHeight } = this.getCanvasSize();
    const totalArea = canvasWidth * canvasHeight;
    const pointArea = totalArea / maxPoints;
    const length = Math.sqrt(pointArea);
    particles.push(...this.getCanvasEdges());

    for (var i = 0; i <= canvasWidth + length; i += length) {
      for (var j = 0; j <= canvasHeight + length; j += length) {
        this.addParticle(
          i + ((Math.random() - 0.5) * length) / 10,
          j + (Math.random() - 0.5) * length,
          particles,
        );
      }
    }
  }

  fill_gradient = ({
    triangleIndex,
    triangleCenter,
    triangle,
    color,
    colorCaching,
    canvasWidth,
    canvasHeight,
  }) => {
    return lighten(0.9 - triangleCenter.y / canvasHeight, color);
  };

  fill_random = ({ triangleIndex, color, colorCaching }) => {
    if (!colorCaching[triangleIndex]) {
      colorCaching[triangleIndex] = lighten(0.1 * Math.random(), color);
    }
    return colorCaching[triangleIndex];
  };

  line_gradient = ({
    triangle,
    color,
    colorCaching,
    canvasWidth,
    canvasHeight,
  }) => {
    const index = `${triangle[0][4]}_${triangle[1][4]}_${triangle[2][4]}`;
    const maxHeight = canvasHeight / 2;
    if (
      triangle[0][1] < maxHeight ||
      triangle[1][1] < maxHeight ||
      triangle[1][1] < maxHeight
    ) {
      return lighten(0.1 * Math.random(), color);
    }
    if (!colorCaching[index]) {
      colorCaching[index] = lighten(0.1 * Math.random(), color);
    }
    return colorCaching[index];
  };

  getCanvasSize = () => {
    const { width, height } = this.props;
    if (this.refs.canvas) {
      const canvas = this.refs.canvas as HTMLCanvasElement;
      //let ctx = canvas.getContext('2d');
      const canvasWidth = canvas.parentElement.clientWidth;
      const canvasHeight = canvas.parentElement.clientHeight;
      return { canvasWidth, canvasHeight };
    } else {
      const canvasWidth = isNumeric(width)
        ? parseFloat(width)
        : window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
      const canvasHeight = isNumeric(height)
        ? parseFloat(height)
        : window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
      return { canvasWidth, canvasHeight };
    }
  };

  addParticle = (x: number, y: number, particles: any) => {
    const { maxSpeed, minSpeed } = this.props;
    var l = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    var a = Math.random() * Math.PI * 2;
    particles.push({
      x,
      y,
      velocityX: x === 0 ? 0 : l * Math.cos(a),
      velocityY: y === 0 ? 0 : l * Math.sin(a),
    });
  };

  edgesOfTriangle = t => [3 * t, 3 * t + 1, 3 * t + 2];

  pointsOfTriangle = (delaunay, t) => {
    return this.edgesOfTriangle(t).map(e => delaunay.triangles[e]);
  };

  renderCanvas = (): number => {
    if (!this.refs.canvas) {
      return;
    }
    const {
      animate,
      color,
      backgroundColor,
      debug,
      lineWidth,
      fillColor,
      lineColor,
    } = this.props;
    const { canvasWidth, canvasHeight } = this.getCanvasSize();
    const canvas = this.refs.canvas as HTMLCanvasElement;
    const hero = this.refs.hero as HTMLElement;

    let width = canvasWidth;
    let height = canvasHeight;
    hero.style.background = 'url(' + canvas.toDataURL() + ')';

    // Paint the background context
    let ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // Update particles position
    /*let particlesUpdated: Particle[] = */ this.state.particles.map(
      (particle: Particle, i) => {
        let x = particle.x,
          y = particle.y,
          velocityX = particle.velocityX,
          velocityY = particle.velocityY;

        x += velocityX;
        y += velocityY;

        // particles must not leave the canvas
        if (x < 0) {
          x = 0;
          if (velocityX < 0) velocityX *= -1;
        } else if (x > width) {
          x = width;
          if (velocityX > 0) velocityX *= -1;
        }

        if (y < 0) {
          y = 0;
          if (velocityY < 0) velocityY *= -1;
        } else if (y > height) {
          y = height;
          if (velocityY > 0) velocityY *= -1;
        }
        // Update particle
        particle.index = i;
        particle.x = x;
        particle.y = y;
        particle.velocityX = velocityX;
        particle.velocityY = velocityY;
        return particle;
      },
    );

    // Transform particles array structure so the Delaunator can handle it
    let particlesForDelaunator = this.state.particles.map(Object.values);

    // Get Delaunay triangles
    const delaunator = Delaunator.from(particlesForDelaunator);

    // triangle is an array with 3 points, each point having [x, y, velocityX, velocityY, index];
    let drawTriangle = (i, triangle) => {
      const triangleIndex = `${triangle[0][4]}_${triangle[1][4]}_${triangle[2][4]}`;
      const triangleCenter = {
        x: (triangle[0][0] + triangle[1][0] + triangle[2][0]) / 3,
        y: (triangle[0][1] + triangle[1][1] + triangle[2][1]) / 3,
      };
      const colorArgs = {
        triangleIndex,
        triangleCenter,
        triangle,
        color,
        canvasWidth,
        canvasHeight,
        colorCaching: this.colorCaching,
      };

      ctx.beginPath();
      ctx.moveTo(triangle[0][0], triangle[0][1]);
      ctx.lineTo(triangle[1][0], triangle[1][1]);
      ctx.lineTo(triangle[2][0], triangle[2][1]);
      ctx.closePath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = this.props[`line_${lineColor}`]
        ? this.props[`line_${lineColor}`](colorArgs)
        : typeof lineColor === 'function'
        ? lineColor(colorArgs)
        : lineColor;

      ctx.fillStyle = this[`fill_${fillColor}`]
        ? this[`fill_${fillColor}`](colorArgs)
        : typeof fillColor === 'function'
        ? fillColor(colorArgs)
        : this.fill_random(colorArgs);

      ctx.fill();
      ctx.save();
      ctx.stroke();
      ctx.restore();
    };

    // triangle is an array with 3 points, each point having [x, y, velocityX, velocityY, index];
    let drawDebug = (i, triangle) => {
      const triangleIndex = `${triangle[0][4]}_${triangle[1][4]}_${triangle[2][4]}`;
      const triangleCenter = {
        x: (triangle[0][0] + triangle[1][0] + triangle[2][0]) / 3,
        y: (triangle[0][1] + triangle[1][1] + triangle[2][1]) / 3,
      };
      ctx.strokeText(triangleIndex, triangleCenter.x, triangleCenter.y);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'black';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      ctx.save();
    };

    for (let t = 0; t < delaunator.triangles.length / 3; t++) {
      let triangle = this.pointsOfTriangle(delaunator, t).map(
        p => particlesForDelaunator[p],
      );
      drawTriangle(t, triangle);
    }
    if (debug) {
      for (let t = 0; t < delaunator.triangles.length / 3; t++) {
        let triangle = this.pointsOfTriangle(delaunator, t).map(
          p => particlesForDelaunator[p],
        );
        drawDebug(t, triangle);
      }
    }

    this.count++;
    if (animate || this.count < 2) {
      requestAnimationFrame(this.renderCanvas);
    }
    return 1;
  };

  render() {
    const { className, debug, width, height, borderColor } = this.props;
    const { canvasWidth, canvasHeight } = this.getCanvasSize();
    return (
      <div
        ref="hero"
        className={className}
        style={{
          position: 'relative',
          width,
          height,
          border: borderColor ? `1px solid ${borderColor}` : null,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <canvas
          style={{ display: 'none' }}
          ref="canvas"
          width={canvasWidth}
          height={canvasHeight}
        />
        {debug && (
          <div
            style={{
              fontSize: '8px',
              position: 'absolute',
              bottom: 0,
              color: 'black',
            }}
          >
            hero: {width}x{height}, canvas: {canvasWidth}x{canvasHeight}
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}

export default DelaunayHero;
