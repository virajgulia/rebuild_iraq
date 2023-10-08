export const GA_TRACKING_ID = 'G-X9635JB0CD'

export const pageview = (url) => {
  return window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }) => {
  return window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}