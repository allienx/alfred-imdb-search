const axios = require('axios')

main().catch(() => {
  process.exitCode = 1
})

async function main() {
  const inputQuery = process.argv[2]
  const query = inputQuery
    .trim()
    .match(/[a-zA-Z0-9\s]*/g)
    .filter((match) => !!match)
    .join('')
    .replace(/ /g, '_')
    .replace('\t', '')
  const firstLetter = query[0] || ''

  const items = []

  if (firstLetter) {
    const url = `https://v2.sg.media-imdb.com/suggestion/${firstLetter}/${query}.json`
    const headers = { Accept: 'application/json' }

    const res = await axios.get(url, { headers })
    const suggestions = res.data.d || []

    items.push(
      ...suggestions.map((suggestion) => {
        const { id, s: cast, yr: yearRange, y: year } = suggestion

        let title = suggestion.l

        if (year || yearRange) {
          title += ` (${year || yearRange})`
        }

        return {
          uid: id,
          title,
          subtitle: cast,
          arg: id,
        }
      }),
    )
  }

  console.log(JSON.stringify({ items }))
}
