export default async function useRequest(
  url: string,
  options: Record<string, any>
) {
  try {
    const res = await fetch(url, options)

    if (res.ok) {
      return { success: 'Success! 🎉`' }
    } else {
      return { error: res.statusText || 'Something went wrong. 🙊' }
    }
  } catch (error) {
    return { error: `Something went wrong: ${error} 🙊` }
  }
}
