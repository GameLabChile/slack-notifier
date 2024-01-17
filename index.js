import { startedGamesWebhookUrl, testWebhookUrl } from './webHooksUrls.js'

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
