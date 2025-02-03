// Simplified interfaces converted to JavaScript prop types
const PropTypes = {
  DashboardMetric: {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    change: PropTypes.number.isRequired,
    period: PropTypes.string.isRequired,
    trend: PropTypes.oneOf(['up', 'down', 'neutral']).isRequired
  },
  ChatMessage: {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    sender: PropTypes.oneOf(['user', 'bot']).isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired
  },
  BotResponse: {
    text: PropTypes.string.isRequired,
    action: PropTypes.string
  },
  DisasterMarker: {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['flood', 'earthquake', 'fire', 'hurricane']).isRequired,
    direction: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    severity: PropTypes.oneOf(['low', 'medium', 'high']).isRequired
  }
};

export default PropTypes;