export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}/${month}/${day}`
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

// 在这里添加公共函数
export const request = (url: string, options: any) => {
  // 封装请求方法
}

export const formatDate = (date: Date) => {
  // 日期格式化
}
