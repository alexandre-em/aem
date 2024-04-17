import { redirect } from '@/navigation';

export default function notFound() {
  return redirect('/en/not-found');
}
