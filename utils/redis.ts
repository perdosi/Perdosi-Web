import Redis from 'ioredis'

function fixUrl(url) {
  if (!url) {
    return ''
  }
  if (url.startsWith('redis://') && !url.startsWith('redis://:')) {
    return url.replace('redis://', 'redis://:')
  }
  if (url.startsWith('rediss://') && !url.startsWith('rediss://:')) {
    return url.replace('rediss://', 'rediss://:')
  }
  return url
}

const redisClient = new Redis(fixUrl(process.env.NEXT_PUBLIC_REDIS_URL))

export default redisClient