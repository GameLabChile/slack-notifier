export default class SlackNotificationService {
  static defaultTestUrl = process.env.TEST_SLACK_CHANNEL_NOTIFICATION

  static get INTEGRATION_SLACK_CHANNEL_NOTIFICATION () {
    const url = process.env.INTEGRATION_SLACK_CHANNEL_NOTIFICATION || this.defaultTestUrl
    if (!url) throw new Error('INTEGRATION_SLACK_CHANNEL_NOTIFICATION env not setted')
    return url
  }

  static get SUPPORT_SLACK_CHANNEL_URL () {
    const url = process.env.SUPPORT_SLACK_CHANNEL_URL || this.defaultTestUrl
    if (!url) throw new Error('SUPPORT_SLACK_CHANNEL_URL env not setted')
    return url
  }

  static get GAMES_NOTIFICATIONS () {
    const url = process.env.GAMES_NOTIFICATIONS || this.defaultTestUrl
    if (!url) throw new Error('GAMES_NOTIFICATIONS env not setted')
    return url
  }

  static newProfessor ({ professorFullName, professorInstitution, distributorName }) {
    const message = `*Nuevo profesor registrado por distribuidor (\`sjg\`):*
  - *Nombre:* ${professorFullName}
  - *Institución:* ${professorInstitution || 'No proporcionada'}
  - *Distribuidor:* ${distributorName}`
    return this.sendSlackNotification({ body: message, url: this.INTEGRATION_SLACK_CHANNEL_NOTIFICATION })
  }

  static newCourse ({ courseName, professorId, professorFullName, distributorName }) {
    const message = `*Nuevo curso registrado por distribuidor (\`sjg\`):*
  - *Nombre:* ${courseName}
  - *Profesor:* ${professorFullName} (${professorId})
  - *Distribuidor:* ${distributorName}`
    return this.sendSlackNotification({ body: message, url: this.INTEGRATION_SLACK_CHANNEL_NOTIFICATION })
  }

  static basicSupportRequest ({ userFullName, email, body, origin }) {
    const message = `Requerimiento de soporte en Startup Journey (${origin}).
Usuario: ${userFullName}
Email: ${email}
Mensaje: ${body}`
    return this.sendSlackNotification({ body: message, url: this.SUPPORT_SLACK_CHANNEL_URL })
  }

  static scheduleSupportMessage ({ userFullName, email, startDate, endDate, origin }) {
    const message = `Requerimiento de soporte en Startup Journey - Livesession (${origin}).
Usuario: ${userFullName}
Email: ${email}
Inicio: ${new Date(startDate).toUTCString()}
Fin: ${new Date(endDate).toUTCString()}`
    return this.sendSlackNotification({ body: message, url: this.SUPPORT_SLACK_CHANNEL_URL })
  }

  static sendStartedGameSlack ({ profName, profLastName, profEmail, game, gameName, host, playersCount, groupsCount }) {
    const message = `Se ha iniciado una nueva partida en *${game}*
  Profesor: ${profName} ${profLastName} - ${profEmail}
  Plataforma: ${game} - ${host}
  Partida: ${gameName} - ${new Date().toUTCString()} (UTC)
  Cantidad de jugadores: ${playersCount}
  Cantidad de grupos: ${groupsCount}
  `
    this.sendSlackNotification({ body: message, url: this.GAMES_NOTIFICATIONS })
  }

  static sendNewHWSlack ({ profName, profLastName, profEmail, game, homeWorkName, host }) {
    const message = `Se ha creado un nuevo HW en *${game}*
  Profesor: ${profName} ${profLastName} - ${profEmail}
  Plataforma: ${game} - ${host}
  HW: ${homeWorkName} - ${new Date().toUTCString()} (UTC)
  `
    this.sendSlackNotification({ body: message, url: this.GAMES_NOTIFICATIONS })
  }

  static sendSlackNotification ({ body, url }) {
    return HTTP.post(url, { data: { text: body } })
  }
}
