export const nameRules = [(v: string) => !!v || 'Name is required']

export const sourceLanguageRules = [
  (v: string) => !!v || 'Source Language is required',
  (v: string) => v.length === 2 || 'Source Language must be a two-letter code'
]

export const targetLanguagesRules = [
  (v: string[]) => {
    for (const lang of v) {
      if (lang.length !== 2) {
        return 'Target Languages must be two-letter codes'
      }
    }
    return true
  }
]
