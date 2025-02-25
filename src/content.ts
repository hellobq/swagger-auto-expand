// 定义 Swagger 节点的类型接口
// 继承自 HTMLElement，确保有 DOM 元素的所有属性和方法
interface SwaggerSection extends HTMLElement {
  classList: DOMTokenList
}

// 全局配置常量
// 包含所有需要用到的选择器和类名
const CONFIG = {
  // Swagger API 分组的容器选择器
  targetSelector: '.opblock-tag-section',
  // 展开/折叠按钮的选择器
  expandButtonSelector: '.opblock-tag',
  // 展开状态的类名
  openClassName: 'is-open',
  // Swagger 内容包装器的类名
  wrapperClassName: 'wrapper'
} as const


/**
 * 检查 DOM 元素是否包含指定的类名
 * @param node - 要检查的 DOM 元素
 * @param className - 要检查的类名
 * @returns 是否包含该类名
 */
const hasClassName = (node: Element, className: string): boolean => 
  node.classList.contains(className)

/**
 * 安全地查询所有匹配的 DOM 元素
 * 使用泛型确保返回类型的类型安全
 * @param parent - 父节点
 * @param selector - CSS 选择器
 * @returns 匹配的元素集合
 */
const querySelectorAllSafe = <T extends Element>(
  parent: ParentNode,
  selector: string
): NodeListOf<T> => parent.querySelectorAll<T>(selector)


/**
 * 展开页面上所有的 Swagger 分组
 * 查找所有分组并逐个展开
 */
const expandAllSections = (): void => {
  const sections = querySelectorAllSafe<SwaggerSection>(
    document,
    CONFIG.targetSelector
  )
  sections.forEach((section: SwaggerSection): void => {
    if (!hasClassName(section, CONFIG.openClassName)) {
      const expandButton = section.querySelector(CONFIG.expandButtonSelector) as HTMLElement
      expandButton?.click()
    }
  })
}

// 初始化 MutationObserver
// 用于监听 DOM 变化，确保在动态加载的内容中也能正常工作
const observer = new MutationObserver((mutations: MutationRecord[]) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach((node: Node): void => {
        if (!(node instanceof HTMLElement)) return
      
        const tagSections = querySelectorAllSafe<SwaggerSection>(
          node,
          CONFIG.targetSelector
        )
      
        if (node.className === CONFIG.wrapperClassName && tagSections.length) {
          expandAllSections()
        }
    })
  })
})

// 开始监视 DOM 变化
// 监视整个 body 元素的子节点变化
observer.observe(document.body, {
  childList: true, // 监听子节点的增删
  subtree: true    // 监听所有后代节点的变化
})
