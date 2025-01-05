// 创建测试图片的代码
function createTestImage(id: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  
  // 清空画布
  ctx.clearRect(0, 0, 300, 300);
  
  switch(id) {
    case 1:
      // 样式1：红色边框
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, 290, 290);
      break;
      
    case 2:
      // 样式2：金色圆形边框
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(150, 150, 140, 0, Math.PI * 2);
      ctx.stroke();
      break;
      
    case 3:
      // 样式3：渐变边框
      const gradient = ctx.createLinearGradient(0, 0, 300, 300);
      gradient.addColorStop(0, '#FF0000');
      gradient.addColorStop(0.5, '#FFD700');
      gradient.addColorStop(1, '#FF0000');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, 290, 290);
      break;
  }
  
  return canvas.toDataURL('image/png');
} 