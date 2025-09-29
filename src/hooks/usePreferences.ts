import { usePreferencesStore } from '@/stores/modules/usePreferencesStore'

export function usePreferences() {
  const { preferences, initialPreferences } = toRefs(usePreferencesStore())

  /** 计算偏好设置的变化 */
  const isDiffPreference = computed(() => {
    return JSON.stringify(preferences.value) !== JSON.stringify(initialPreferences.value)
  })

  const appPreferences = computed(() => preferences.value?.app)

  const shortcutKeysPreferences = computed(() => preferences.value?.shortcutKeys)

  /**
   * @zh_CN 判断是否为暗黑模式
   * @param  preferences - 当前偏好设置对象，它的主题值将被用来判断是否为暗黑模式。
   * @returns 如果主题为暗黑模式，返回 true，否则返回 false。
   */
  const isDark = computed(() => {
    return preferences.value?.theme.mode === 'dark'
  })

  const locale = computed(() => {
    return preferences.value?.app.locale
  })

  const isMobile = computed(() => {
    return appPreferences.value?.isMobile
  })

  const theme = computed(() => {
    return isDark.value ? 'dark' : 'light'
  })

  /** 布局方式 */
  const layout = computed(() =>
    isMobile.value ? 'sidebar-nav' : appPreferences.value?.layout,
  )

  /** 是否显示顶栏 */
  const isShowHeaderNav = computed(() => {
    return preferences.value?.header.enable
  })

  /** 是否全屏显示content，不需要侧边、底部、顶部、tab区域 */
  const isFullContent = computed(
    () => appPreferences.value?.layout === 'full-content',
  )

  /** 是否侧边导航模式 */
  const isSideNav = computed(
    () => appPreferences.value?.layout === 'sidebar-nav',
  )

  /** 是否侧边混合模式 */
  const isSideMixedNav = computed(
    () => appPreferences.value?.layout === 'sidebar-mixed-nav',
  )

  /** 是否为头部导航模式 */
  const isHeaderNav = computed(
    () => appPreferences.value?.layout === 'header-nav',
  )

  /** 是否为头部混合导航模式 */
  const isHeaderMixedNav = computed(
    () => appPreferences.value?.layout === 'header-mixed-nav',
  )

  /** 是否为顶部通栏+侧边导航模式 */
  const isHeaderSidebarNav = computed(
    () => appPreferences.value?.layout === 'header-sidebar-nav',
  )

  /** 是否为混合导航模式 */
  const isMixedNav = computed(
    () => appPreferences.value?.layout === 'mixed-nav',
  )

  /** 是否包含侧边导航模式 */
  const isSideMode = computed(() => {
    return (
      isMixedNav.value
      || isSideMixedNav.value
      || isSideNav.value
      || isHeaderMixedNav.value
      || isHeaderSidebarNav.value
    )
  })

  const sidebarCollapsed = computed(() => {
    return preferences.value?.sidebar.collapsed
  })

  /**
   * # 是否开启keep-alive
   * 在tabs可见以及开启keep-alive的情况下才开启
   */
  const keepAlive = computed(
    () => preferences.value?.tabbar.enable && preferences.value?.tabbar.keepAlive,
  )

  /** 登录注册页面布局是否为左侧 */
  const authPanelLeft = computed(() => {
    return appPreferences.value?.authPageLayout === 'panel-left'
  })

  /** 登录注册页面布局是否为右侧 */
  const authPanelRight = computed(() => {
    return appPreferences.value?.authPageLayout === 'panel-right'
  })

  /** 登录注册页面布局是否为中间 */
  const authPanelCenter = computed(() => {
    return appPreferences.value?.authPageLayout === 'panel-center'
  })

  /**
   * # 内容是否已经最大化
   * 排除 full-content模式
   */
  const contentIsMaximize = computed(() => {
    const headerIsHidden = preferences.value?.header.hidden
    const sidebarIsHidden = preferences.value?.sidebar.hidden
    return headerIsHidden && sidebarIsHidden && !isFullContent.value
  })

  /** 是否启用全局搜索快捷键 */
  const globalSearchShortcutKey = computed(() => {
    const { enable, globalSearch } = shortcutKeysPreferences.value || {}
    return enable && globalSearch
  })

  /** 是否启用全局注销快捷键 */
  const globalLogoutShortcutKey = computed(() => {
    const { enable, globalLogout } = shortcutKeysPreferences.value || {}
    return enable && globalLogout
  })

  /** 是否启用全局锁屏快捷键 */
  const globalLockScreenShortcutKey = computed(() => {
    const { enable, globalLockScreen } = shortcutKeysPreferences.value || {}
    return enable && globalLockScreen
  })

  /** 偏好设置按钮位置 */
  const preferencesButtonPosition = computed(() => {
    const { enablePreferences, preferencesButtonPosition } = appPreferences.value || {}

    // 如果没有启用偏好设置按钮
    if (!enablePreferences) {
      return {
        fixed: false,
        header: false,
      }
    }

    const { header, sidebar } = preferences.value || {}
    const headerHidden = header?.hidden
    const sidebarHidden = sidebar?.hidden

    const contentIsMaximize = headerHidden && sidebarHidden

    const isHeaderPosition = preferencesButtonPosition === 'header'

    // 如果设置了固定位置
    if (preferencesButtonPosition !== 'auto') {
      return {
        fixed: preferencesButtonPosition === 'fixed',
        header: isHeaderPosition,
      }
    }

    // 如果是全屏模式或者没有固定在顶部，
    const fixed
      = contentIsMaximize
        || isFullContent.value
        || isMobile.value
        || !isShowHeaderNav.value

    return {
      fixed,
      header: !fixed,
    }
  })

  return {
    authPanelCenter,
    authPanelLeft,
    authPanelRight,
    contentIsMaximize,
    isDiffPreference,
    globalLockScreenShortcutKey,
    globalLogoutShortcutKey,
    globalSearchShortcutKey,
    isDark,
    isFullContent,
    isHeaderMixedNav,
    isHeaderNav,
    isHeaderSidebarNav,
    isMixedNav,
    isMobile,
    isSideMixedNav,
    isSideMode,
    isSideNav,
    keepAlive,
    layout,
    locale,
    preferencesButtonPosition,
    sidebarCollapsed,
    theme,
  }
}
