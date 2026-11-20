import { useRouter } from 'next/router';
import Home from '../../components/Home';

function HashtagPage() {
  const router = useRouter();
  const { hashtag } = router.query;

  if (!hashtag) return null;

  return <Home hashtag={hashtag} />;
}

export default HashtagPage;
