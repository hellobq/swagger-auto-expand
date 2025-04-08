import { SwaggerSection, CONFIG } from './types'

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

/**
 * 从 URL hash 中获取目标 controller 名称
 * @returns controller 名称或 null
 */
const getTargetControllerFromHash = (): string | null => {
  const hash = decodeURIComponent(window.location.hash)
  if (!hash) return null
  
  const match = hash.match(/\/([^\/$]+)/)
  return match ? match[1] : null
}

/**
 * 展开指定的 controller 分组
 * @param targetController - 要展开的 controller 名称
 * @returns 是否找到并展开了目标 controller
 */
const expandTargetSection = (targetController: string): HTMLElement | null => {
  const sections = querySelectorAllSafe<SwaggerSection>(
    document,
    CONFIG.targetSelector
  )
  
  let targetSection: HTMLElement | null = null
  sections.forEach((section: SwaggerSection): void => {
    if (!targetSection) {
      const expandButton = section.querySelector(CONFIG.expandButtonSelector) as HTMLElement
      if (expandButton.innerText.toLowerCase().includes(targetController)) {
        targetSection = expandButton
      }
    }
  })
  
  return targetSection
}

/**
 * 处理展开逻辑
 * 优先展开 URL hash 中指定的 controller  eg http://192.168.0.1:12345/swagger-ui.html#/缓存配置接口/clearUsingPOST 优先展开 “缓存配置接口”
 * 如果没有则展开所有分组
 */
const handleExpand = (): void => {
  const targetController = getTargetControllerFromHash()
  if (targetController) {
    const targetSection: HTMLElement | null = expandTargetSection(targetController)
    if (targetSection) {
      targetSection.click()
      return
    }
  }

  expandAllSections()
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
        handleExpand()
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
