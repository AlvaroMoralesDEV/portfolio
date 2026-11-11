import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from './hooks';
import awsIcon from '../../assets/icons/aws.png';
import mysqlIcon from '../../assets/icons/mysql.png';
import slackIcon from '../../assets/icons/slack.png';
import teamsIcon from '../../assets/icons/teams.png';
import dockerIcon from '../../assets/icons/docker.png';
import gitIcon from '../../assets/icons/git.png';
import webhookIcon from '../../assets/icons/webhook.png';
import kafkaIcon from '../../assets/icons/kafka.png';
import mongoIcon from '../../assets/icons/mongo.png';
import postgressIcon from '../../assets/icons/postgress.png';
import apiIcon from '../../assets/icons/api.png';
import grafanaIcon from '../../assets/icons/grafana.png';
import stripeIcon from '../../assets/icons/stripe.png';
import azureIcon from '../../assets/icons/azure.png';
import n8nIcon from '../../assets/icons/n8n.svg';
import pythonIcon from '../../assets/icons/python.svg';
import airflowIcon from '../../assets/icons/airflow.svg';
import openshiftIcon from '../../assets/icons/openshift.svg';
import odooIcon from '../../assets/icons/odoo.svg';
import rabbitmqIcon from '../../assets/icons/rabbitmq.svg';
import swaggerIcon from '../../assets/icons/swagger.png';
import postmanIcon from '../../assets/icons/postman.png';
import gptIcon from '../../assets/icons/gpt.png';
import redisIcon from '../../assets/icons/redis.png';
import kuberIcon from '../../assets/icons/kuber.png';
import confluenceIcon from '../../assets/icons/confluence.png';


// Only tools that relate to the work shown on the site.
const icons = [
  // first twelve are the ones the calm project page shows
  n8nIcon, gptIcon, pythonIcon, dockerIcon, openshiftIcon, azureIcon,
  mysqlIcon, postgressIcon, apiIcon, webhookIcon, gitIcon, teamsIcon,
  airflowIcon, odooIcon, rabbitmqIcon, redisIcon, kuberIcon, awsIcon,
  slackIcon, mongoIcon, stripeIcon, kafkaIcon, postmanIcon, swaggerIcon,
  grafanaIcon, confluenceIcon
];

// Anything with text on it. Icons hidden behind these do not react to the mouse.
const PANEL_SELECTOR = '.pf-section, .hero-panel, .cs-section, .nav-bar, .cs-back, .pf-footer p';

// Calm mode (project page): fewer icons, slower, more transparent.
const CALM_ICON_COUNT = 12;
const CALM_SPEED_FACTOR = 0.4;
const CALM_OPACITY = 0.6;
// Icons are drawn slightly see-through and a touch smaller so they frame the page instead of leading it.
const ICON_ALPHA = 0.65;
const ICON_SIZE = 34;

const CanvasBackground = ({ calm = false }) => {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();
  // Read inside the animation loop, so changing them never restarts it.
  const settings = useRef({ calm, reducedMotion });
  settings.current = { calm, reducedMotion };
  const images = useRef([]);
  const dots = useRef([]);
  const connectionDistance = 150;
  const speed = 0.7;
  const activeDotIndex = useRef(null);
  const highlightedDots = useRef(new Set());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const loadImages = () => {
      images.current = [];
      const promises = icons.map((icon, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = icon;
          img.onerror = resolve; // one broken icon must not stop the whole background
          img.onload = () => {
            images.current[index] = img;
            resolve();
          };
        });
      });
      return Promise.all(promises);
    };

    const normalizeSpeed = (dx, dy, speed) => {
      const magnitude = Math.sqrt(dx * dx + dy * dy);
      return {
        dx: (dx / magnitude) * speed,
        dy: (dy / magnitude) * speed
      };
    };

    const createDots = () => {
      dots.current = [];
      icons.forEach((icon, index) => {
        if (images.current[index]) {
          let dx = (Math.random() - 0.5);
          let dy = (Math.random() - 0.5);
          const normalized = normalizeSpeed(dx, dy, speed);

          const dot = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: ICON_SIZE,
            dx: normalized.dx,
            dy: normalized.dy,
            image: images.current[index]
          };
          dots.current.push(dot);
        }
      });
    };

    const findConnections = (index, visited) => {
      if (visited.has(index)) return;
      visited.add(index);

      for (let j = 0; j < dots.current.length; j++) {
        if (j !== index) {
          const distance = Math.sqrt(
            Math.pow(dots.current[index].x - dots.current[j].x, 2) +
            Math.pow(dots.current[index].y - dots.current[j].y, 2)
          );
          if (distance < connectionDistance) {
            highlightedDots.current.add(j);
            findConnections(j, visited);
          }
        }
      }
    };

    const drawConnections = (ctx, dots) => {
      for (let i = 0; i < dots.length; i++) {
        const distances = [];
        for (let j = 0; j < dots.length; j++) {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(dots[i].x - dots[j].x, 2) + Math.pow(dots[i].y - dots[j].y, 2)
            );
            if (distance < connectionDistance) {
              distances.push({ index: j, distance });
            }
          }
        }

        distances.sort((a, b) => a.distance - b.distance);
        const closestDots = distances.slice(0, 3);

        closestDots.forEach(({ index }) => {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[index].x, dots[index].y);
          ctx.strokeStyle = highlightedDots.current.has(index) ? 'rgba(228, 163, 78, 0.9)' : 'rgba(180, 180, 180, 0.6)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }
    };

    const drawDots = () => {
      const { calm: isCalm, reducedMotion: isStill } = settings.current;
      // Calm mode draws only the first few icons; the rest keep their place for later.
      const visibleDots = isCalm ? dots.current.slice(0, CALM_ICON_COUNT) : dots.current;
      const step = isStill ? 0 : isCalm ? CALM_SPEED_FACTOR : 1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections(ctx, visibleDots);

      // Use a fixed position for drawing dots
      visibleDots.forEach((dot, index) => {
        const isConnected = highlightedDots.current.has(index);
        const isActive = activeDotIndex.current === index;
        const size = (isActive || isConnected) ? dot.radius * 1.2 : dot.radius;

        // Draw the dot at its current position
        ctx.globalAlpha = isActive || isConnected ? 1 : ICON_ALPHA;
        ctx.drawImage(dot.image, dot.x - size / 2, dot.y - size / 2, size, size);
        ctx.globalAlpha = 1;
        
        // Update dot positions based on speed and direction
        // (step is 0 under prefers-reduced-motion: the icons are drawn but stay still)
        dot.x += dot.dx * step;
        dot.y += dot.dy * step;

        // Reverse direction on hitting canvas boundaries
        if (dot.x < 0 || dot.x > canvas.width) {
          dot.dx = -dot.dx;
        }
        if (dot.y < 0 || dot.y > canvas.height) {
          dot.dy = -dot.dy;
        }
      });
    };

    let animationFrameId;
    let cancelled = false;

    const animate = () => {
      drawDots();
      animationFrameId = requestAnimationFrame(animate);
    };

    loadImages().then(() => {
      if (cancelled) return;
      resizeCanvas();
      createDots();
      animate();
    });

    window.addEventListener('resize', resizeCanvas);
    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      activeDotIndex.current = null;
      highlightedDots.current.clear();

      // Over a panel the pointer belongs to the content, not to the icons behind it.
      if (event.target instanceof Element && event.target.closest(PANEL_SELECTOR)) return;

      dots.current.forEach((dot, index) => {
        const distance = Math.sqrt(
          (dot.x - mouseX) ** 2 + (dot.y - mouseY) ** 2
        );
        if (distance < dot.radius) {
          activeDotIndex.current = index;
          findConnections(index, new Set());
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas on unmount
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        opacity: calm ? CALM_OPACITY : 1,
        transition: reducedMotion ? 'none' : 'opacity 0.4s ease',
        position: 'fixed', // Fixed position to cover the entire viewport
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

export default CanvasBackground;
