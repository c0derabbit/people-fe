import t from '../../i18n'

export default async function useRequest(
  url: string,
  options: Record<string, any>
) {
  try {
    const res = await fetch(url, options)

    if (res.ok) {
      let data: null | Record<string, any>

      try {
        data = await res.json()
      } catch (error) {
        // no body, just continue
      }

      return { success: `${t('success')}! 🎉`, data }
    } else {
      return { error: res.statusText || `${t('error')}. 🙊` }
    }
  } catch (error) {
    return { error: `${t('error')}: ${error} 🙊` }
  }
}
