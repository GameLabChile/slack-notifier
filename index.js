const startedGamesWebhookUrl = 'https://hooks.slack.com/services/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'
const testWebhookUrl = 'https://hooks.slack.com/services/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'

/**
 * @param {Object} params
 * @param {string} params.profName
 * @param {string} params.profLastName
 * @param {string} params.profEmail
 * @param {string} params.game
 * @param {string} params.gameName
 * @param {string} params.host
 * @param {Date} params.date
 * @param {boolean} params.isProduction
 */
export function sendStartedGameSlack ({ profName, profLastName, profEmail, game, gameName, host, date, isProduction }) {
  const message = `Se ha iniciado una nueva partida en *${game}*
Profesor: ${profName} ${profLastName} - ${profEmail}
Plataforma: ${game} - ${host}
Partida: ${gameName} - ${date.toUTCString()} (UTC)
`
  sendSlackMessage({ message, isProduction })
}

/**
 * @param {Object} params
 * @param {string} params.profName
 * @param {string} params.profLastName
 * @param {string} params.profEmail
 * @param {string} params.game
 * @param {string} params.homeWorkName
 * @param {string} params.host
 * @param {Date} params.date
 * @param {boolean} params.isProduction
 */
export function sendNewHWSlack ({ profName, profLastName, profEmail, game, homeWorkName, host, date, isProduction }) {
  const message = `Se ha creado un nuevo HW en *${game}*
Profesor: ${profName} ${profLastName} - ${profEmail}
Plataforma: ${game} - ${host}
HW: ${homeWorkName} - ${date.toUTCString()} (UTC)
`
  sendSlackMessage({ message, isProduction })
}

/**
 * @param {Object} param
 * @param {string} param.message
 * @param {boolean} param.isProduction
 */
function sendSlackMessage ({ message, isProduction }) {
  const fetchBody = JSON.stringify({ text: message })
  const fetchUrl = isProduction ? startedGamesWebhookUrl : testWebhookUrl
  fetch(fetchUrl, { method: 'POST', body: fetchBody })
    .catch(console.error)
}
