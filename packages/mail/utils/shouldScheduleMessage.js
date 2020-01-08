const {
  NODE_ENV,
  SEND_MAILS,
  SEND_MAILS_SCHEDULE_REGEX
} = process.env

const DEV = NODE_ENV && NODE_ENV !== 'production'

module.exports = (mail, message) => {
  const { SEND_MAILS_LOG = true } = process.env
  const logger = SEND_MAILS_LOG && SEND_MAILS_LOG !== 'false'
    ? console.log
    : a => {}

  // don't send in dev, expect SEND_MAILS is true
  // don't send mails if SEND_MAILS is false
  if (SEND_MAILS === 'false' || (DEV && SEND_MAILS !== 'true')) {
    logger('\n\nSEND_MAILS prevented mail from being scheduled')
    return false
  }

  if (
    SEND_MAILS_SCHEDULE_REGEX &&
    new RegExp(SEND_MAILS_SCHEDULE_REGEX, 'ig').test(mail.templateName)
  ) {
    return true
  }

  return false
}
