/* This is a very basic "i18n" that only speaks one language.
 * I don’t need more now. */

const hu = {
  areYouSure: 'Biztos vagy benne?',
  back: 'vissza',
  cancel: 'mégsem',
  create: 'mentés',
  createOrModifyConnection: 'Új kapcsolat / módosítás',
  connections: 'Kapcsolatok',
  delete: 'Törlés',
  edit: 'Módosítás',
  error: 'Valami gond van',
  newContact: 'Új kontakt',
  pageTitle: 'Peoplegraph',
  personWillBeDeleted: 'Törlés után nincs visszaút!',
  search: 'Keresés…',
  signIn: 'Bejelentkezés',
  signOut: 'Kijelentkezés',
  success: 'Siker',
  YES: 'IGEN',
  update: 'mentés',
  'what do they do': 'pl. angol szakos, kertész, manager stb.',

  props: {
    'by day': 'nappal',
    'full name': 'teljes név',
    hobbies: 'hobbik',
    'last contact date': 'legutóbbi kontakt',
    location: 'lakóhely',
    name: 'név',
    notes: 'jegyzetek',
  },
}

export default function t(str: string) {
  try {
    const dict = hu
    const [scope, key] = str.split('.')

    const translation = scope && key ? dict[scope][key] : dict[str]

    return translation || str
  } catch (error) {
    return str
  }
}
