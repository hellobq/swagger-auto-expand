// dom 判断某个 node 节点是否包含某个 className
function hasClassName(node, className) {
  return node.classList.contains(className)
}

// 目标节点的选择器
const targetSelector = '.opblock-tag-section'

// 展开所有 Swagger sections
function expandAllSwaggerSections() {
  const expandSections = document.querySelectorAll(targetSelector)
  expandSections.forEach(expandSection => {
    if (!hasClassName(expandSection, 'is-open')) {
      expandSection.querySelector('.opblock-tag').click()
    }
  })
}

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach((node) => {
        let tagSection = node.querySelectorAll(targetSelector)
        if (node.className === 'wrapper' && tagSection.length) {
          expandAllSwaggerSections()
        }
      })
    }
  })
})

// 开始监视具有子节点、子孙节点变动的节点
observer.observe(document.body, { childList: true, subtree: true })
