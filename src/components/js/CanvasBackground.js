import React, { useEffect, useRef } from 'react';
import emailIcon from '../../assets/icons/email.png';
import awsIcon from '../../assets/icons/aws.png';
import discordIcon from '../../assets/icons/discord.png';
import mysqlIcon from '../../assets/icons/mysql.png';
import sapIcon from '../../assets/icons/sap.png';
import twitterIcon from '../../assets/icons/twitter.png';
import slackIcon from '../../assets/icons/slack.png';
import teamsIcon from '../../assets/icons/teams.png';
import teamsSalesforce from '../../assets/icons/salesforce.png';
import teamsPosIcon from '../../assets/icons/pos.png';
import notionIcon from '../../assets/icons/notion.png';
import rabbitIcon from '../../assets/icons/rabbit.png';
import dockerIcon from '../../assets/icons/docker.png';
import gitIcon from '../../assets/icons/git.png';
import dropboxIcon from '../../assets/icons/dropbox.png';
import webhookIcon from '../../assets/icons/webhook.png';
import kafkaIcon from '../../assets/icons/kafka.png';
import mongoIcon from '../../assets/icons/mongo.png';
import postgressIcon from '../../assets/icons/postgress.png';
import apiIcon from '../../assets/icons/api.png';
import grafanaIcon from '../../assets/icons/grafana.png';
import shopifyIcon from '../../assets/icons/shopify.png';
import stripeIcon from '../../assets/icons/stripe.png';
import paypalIcon from '../../assets/icons/paypal.png';
import azureIcon from '../../assets/icons/azure.png';
import swaggerIcon from '../../assets/icons/swagger.png';
import postmanIcon from '../../assets/icons/postman.png';
import gptIcon from '../../assets/icons/gpt.png';
import elasticsearchIcon from '../../assets/icons/elasticsearch.png';
import redisIcon from '../../assets/icons/redis.png';
import kuberIcon from '../../assets/icons/kuber.png';
import confluenceIcon from '../../assets/icons/confluence.png';
import whaIcon from '../../assets/icons/wha.png';
import telegramIcon from '../../assets/icons/telegram.png';
import wordpressIcon from '../../assets/icons/wordpress.png';

const icons = [
  emailIcon, elasticsearchIcon, wordpressIcon, confluenceIcon,
  kuberIcon, telegramIcon, redisIcon, awsIcon, whaIcon, gptIcon,
  postmanIcon, swaggerIcon, mysqlIcon, discordIcon, twitterIcon, sapIcon,
  slackIcon, teamsIcon, teamsSalesforce, teamsPosIcon, rabbitIcon, notionIcon,
  dockerIcon, gitIcon, dropboxIcon, webhookIcon, kafkaIcon, mongoIcon,
  postgressIcon, apiIcon, grafanaIcon, shopifyIcon, stripeIcon, paypalIcon, azureIcon
];

const CanvasBackground = () => {
  const canvasRef = useRef(null);
  const images = useRef([]);
  const dots = useRef([]);
  const connectionDistance = 150;
  const speed = 0.6; 
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
            radius: 40,
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
          ctx.strokeStyle = highlightedDots.current.has(index) ? 'rgba(0, 160, 255, 0.8)' : 'rgba(180, 180, 180, 0.6)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections(ctx, dots.current);

      dots.current.forEach((dot, index) => {
        const isConnected = highlightedDots.current.has(index);
        const isActive = activeDotIndex.current === index;
        const size = (isActive || isConnected) ? dot.radius * 1.2 : dot.radius;

        ctx.drawImage(dot.image, dot.x - size / 2, dot.y - size / 2, size, size);
        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x < 0 || dot.x > canvas.width) {
          dot.dx = -dot.dx;
        }
        if (dot.y < 0 || dot.y > canvas.height) {
          dot.dy = -dot.dy;
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
    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      activeDotIndex.current = null;
      highlightedDots.current.clear();

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
      window.removeEventListener('mousemove', handleMouseMove);
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
