const TEST_SLACK_CHANNEL_NOTIFICATION = process.env.TEST_SLACK_CHANNEL_NOTIFICATION
const {
  INTEGRATION_SLACK_CHANNEL_NOTIFICATION = TEST_SLACK_CHANNEL_NOTIFICATION,
  SUPPORT_SLACK_CHANNEL_URL = TEST_SLACK_CHANNEL_NOTIFICATION,
  GAMES_NOTIFICATIONS = TEST_SLACK_CHANNEL_NOTIFICATION
} = process.env

export default class SlackNotificationService {
  static newProfessor ({ professorFullName, professorInstitution, distributorName }) {
    const message = `*Nuevo profesor registrado por distribuidor (\`sjg\`):*
  - *Nombre:* ${professorFullName}
  - *Institución:* ${professorInstitution || 'No proporcionada'}
  - *Distribuidor:* ${distributorName}`
    return this.sendSlackNotification({ body: message, url: INTEGRATION_SLACK_CHANNEL_NOTIFICATION })
  }

  static newCourse ({ courseName, professorId, professorFullName, distributorName }) {
    const message = `*Nuevo curso registrado por distribuidor (\`sjg\`):*
  - *Nombre:* ${courseName}
  - *Profesor:* ${professorFullName} (${professorId})
  - *Distribuidor:* ${distributorName}`
    return this.sendSlackNotification({ body: message, url: INTEGRATION_SLACK_CHANNEL_NOTIFICATION })
  }

  static basicSupportRequest ({ userFullName, email, body, origin, fileUrl }) {
    let message = `Requerimiento de soporte en Startup Journey (${origin}).
Usuario: ${userFullName}
Email: ${email}
Mensaje: ${body}`
    if (fileUrl) message += `\nArchivo adjunto: ${fileUrl}`
    return this.sendSlackNotification({ body: message, url: SUPPORT_SLACK_CHANNEL_URL })
  }

  static scheduleSupportMessage ({ userFullName, email, startDate, endDate, origin }) {
    const message = `Requerimiento de soporte en Startup Journey - Livesession (${origin}).
Usuario: ${userFullName}
Email: ${email}
Inicio: ${new Date(startDate).toUTCString()}
Fin: ${new Date(endDate).toUTCString()}`
    return this.sendSlackNotification({ body: message, url: SUPPORT_SLACK_CHANNEL_URL })
  }

  static sendStartedGameSlack ({ profName, profLastName, profEmail, game, gameName, host, playersCount, groupsCount }) {
    const message = `Se ha iniciado una nueva partida en *${game}*
  Profesor: ${profName} ${profLastName} - ${profEmail}
  Plataforma: ${game} - ${host}
  Partida: ${gameName} - ${new Date().toUTCString()} (UTC)
  Cantidad de jugadores: ${playersCount}
  Cantidad de grupos: ${groupsCount}
  `
    this.sendSlackNotification({ body: message, url: GAMES_NOTIFICATIONS })
  }

  static sendNewHWSlack ({ profName, profLastName, profEmail, game, homeWorkName, host }) {
    const message = `Se ha creado un nuevo HW en *${game}*
  Profesor: ${profName} ${profLastName} - ${profEmail}
  Plataforma: ${game} - ${host}
  HW: ${homeWorkName} - ${new Date().toUTCString()} (UTC)
  `
    this.sendSlackNotification({ body: message, url: GAMES_NOTIFICATIONS })
  }

  static sendSlackNotification ({ body, url }) {
    if (!url) throw new Error('Slack notification url not provided')
    return HTTP.post(url, { data: { text: body } })
  }
}
