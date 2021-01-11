import t from '../../i18n'

export default async function useRequest(
  url: string,
  options: Record<string, any>
) {
  try {
    const res = await fetch(url, options)
    const data = await res.json()

    if (res.ok) {
      return { success: `${t('success')}! 🎉`, data }
    } else {
      return { error: res.statusText || `${t('error')}. 🙊` }
    }
  } catch (error) {
    return { error: `${t('error')}: ${error} 🙊` }
  }
}
