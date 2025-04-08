// 定义 Swagger 节点的类型接口
// 继承自 HTMLElement，确保有 DOM 元素的所有属性和方法
export interface SwaggerSection extends HTMLElement {
  classList: DOMTokenList
}

// 全局配置常量
// 包含所有需要用到的选择器和类名
export const CONFIG = {
  // Swagger API 分组的容器选择器
  targetSelector: '.opblock-tag-section',
  // 展开/折叠按钮的选择器
  expandButtonSelector: '.opblock-tag',
  // 展开状态的类名
  openClassName: 'is-open',
  // Swagger 内容包装器的类名
  wrapperClassName: 'wrapper'
} as const
