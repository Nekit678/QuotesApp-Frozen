import { useRouter } from 'next/router';

export default function () {
  const router = useRouter()
  if (typeof window !== "undefined") {
    router.push('/posts/1')
  }
}

