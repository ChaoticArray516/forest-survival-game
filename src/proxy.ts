import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  // SOP §四 1.2 hreflang 一致性修复
  // 禁用 next-intl 自动注入的 HTTP Link Header(它用短代码 zh/en + x-default 指向 /)
  // 让 [locale]/layout.tsx 的 generateMetadata().alternates.languages 统一控制 hreflang
  // (使用完整 IETF 代码 zh-CN/en-US/x-default → /en)
  alternateLinks: false,
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
