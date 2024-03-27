export function convertType(type: string) {
  switch (type) {
    case 'web':
      return 'Aplicação web'
    case 'backend':
      return 'Aplicação back-end'
    case 'mobile':
      return 'Aplicação mobile'
    default:
      return type
  }
}
