// 这段代码用于生成装饰框图片
function createFrame(id: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = 600;  // 使用更大尺寸以获得更好的质量
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  
  switch(id) {
    case 1:
      // 样式1：新年红色圆形边框配福字
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 20;
      // 绘制外圆
      ctx.beginPath();
      ctx.arc(300, 300, 290, 0, Math.PI * 2);
      ctx.stroke();
      
      // 绘制内圆
      ctx.beginPath();
      ctx.arc(300, 300, 280, 0, Math.PI * 2);
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 5;
      ctx.stroke();
      
      // 添加2025文字
      ctx.font = 'bold 60px Arial';
      ctx.fillStyle = '#FF0000';
      ctx.textAlign = 'center';
      ctx.fillText('2025', 300, 550);
      break;
      
    case 2:
      // 样式2：金色方框配龙纹
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 15;
      // 绘制方框
      ctx.strokeRect(20, 20, 560, 560);
      
      // 绘制角花
      function drawCorner(x: number, y: number, rotate: number) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotate * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(40, 0);
        ctx.lineTo(40, 40);
        ctx.stroke();
        ctx.restore();
      }
      
      // 绘制四个角
      drawCorner(20, 20, 0);
      drawCorner(580, 20, 90);
      drawCorner(580, 580, 180);
      drawCorner(20, 580, 270);
      break;
      
    case 3:
      // 样式3：新年喜庆边框
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 15;
      
      // 绘制主边框
      ctx.beginPath();
      ctx.moveTo(50, 50);
      ctx.lineTo(550, 50);
      ctx.lineTo(550, 550);
      ctx.lineTo(50, 550);
      ctx.closePath();
      ctx.stroke();
      
      // 添加装饰性圆圈
      function drawCircle(x: number, y: number) {
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD700';
        ctx.fill();
      }
      
      // 在四角添加金色圆圈
      drawCircle(50, 50);
      drawCircle(550, 50);
      drawCircle(550, 550);
      drawCircle(50, 550);
      
      // 添加新年快乐文字
      ctx.font = 'bold 48px Arial';
      ctx.fillStyle = '#FF0000';
      ctx.textAlign = 'center';
      ctx.fillText('新年快乐', 300, 540);
      break;
  }
  
  return canvas.toDataURL('image/png');
}

// 生成缩略图
function createThumbnail(id: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = 150;
  canvas.height = 150;
  const ctx = canvas.getContext('2d');
  
  const img = new Image();
  img.src = createFrame(id);
  ctx.drawImage(img, 0, 0, 150, 150);
  
  return canvas.toDataURL('image/png');
} 