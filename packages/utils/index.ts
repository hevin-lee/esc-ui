import bem from '../bem'
import { VNode, Component } from 'vue/types'

/* deprecate */
export function use (name: string, app?: string) {
  return [
    bem(name, app || 'esc', true)
  ]
}

export function isVNode (node: VNode | string | void): boolean {
  return node !== null &&
    typeof node === 'object' &&
    Object.prototype.hasOwnProperty.call(node, 'componentOptions')
}

export function isDef<T> (val: T): boolean {
  return val !== undefined && val !== null
}

export function formatNumber (val: number, fixed: number): string {
  const pow = Math.pow(10, fixed)
  return (Math.round(pow * val) / pow).toFixed(fixed)
}

export function vw (px: number): string {
  return (px / 3.75).toFixed(2) + 'vw'
}

export const isMobile = /Mobile/i.test(navigator.userAgent)

export const isIOS = /iPhone/i.test(navigator.userAgent)

export const online = /\.com/.test(location.origin)

export const cookieGet = (name: string): string => {
  let cookieValue = ''
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

// 纯函数组件使用其他组件时 ts 会抛出属性类型不匹配
// 原因在于为定义该组件的类型
// 使用别名可以避免
export const aliasComponent = (...args: Array<Component>) => args

export function noop () {}
