import React, { useEffect, useRef } from 'react';
import awsIcon from '../../assets/icons/aws.jpg';
import discordIcon from '../../assets/icons/discord.jpg';
import dockerIcon from '../../assets/icons/docker.png';
import githubIcon from '../../assets/icons/github.png';
import odooIcon from '../../assets/icons/email.png';
import n8nIcon from '../../assets/icons/n8n.jpg';
import mysqlIcon from '../../assets/icons/mysql.png';
import zapierIcon from '../../assets/icons/zapier.png';
import mongoIcon from '../../assets/icons/mongo.png';

const icons = [
  awsIcon,
  discordIcon,
  dockerIcon,
  githubIcon,
  odooIcon,
  n8nIcon,
  mysqlIcon,
  zapierIcon,
  mongoIcon,
];

const CanvasBackground = () => {
  const canvasRef = useRef(null);
  const images = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let dots = [];
    const dotCount = 30;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const loadImages = () => {
      const promises = icons.map(icon => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = icon;
          img.onload = () => {
            images.current.push(img);
            resolve();
          };
        });
      });
      return Promise.all(promises);
    };

    const createDots = () => {
      dots = [];
      for (let i = 0; i < dotCount; i++) {
        const dot = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 40,
          dx: (Math.random() - 0.5) * 2,
          dy: (Math.random() - 0.5) * 2,
          image: images.current[Math.floor(Math.random() * images.current.length)],
        };
        dots.push(dot);
      }
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot, i) => {
        ctx.drawImage(dot.image, dot.x - dot.radius / 2, dot.y - dot.radius / 2, dot.radius, dot.radius);

        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x < 0 || dot.x > canvas.width) dot.dx = -dot.dx;
        if (dot.y < 0 || dot.y > canvas.height) dot.dy = -dot.dy;

        for (let j = i + 1; j < dots.length; j++) {
          const distance = Math.sqrt(
            Math.pow(dot.x - dots[j].x, 2) + Math.pow(dot.y - dots[j].y, 2)
          );
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
    };

    const animate = () => {
      drawDots();
      requestAnimationFrame(animate);
    };

    loadImages().then(() => {
      resizeCanvas();
      createDots();
      animate();
    });

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default CanvasBackground;
