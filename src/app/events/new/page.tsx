import { redirect } from 'next/navigation';

// La création d'événements se fait uniquement depuis le panel admin.
export default function NewEventPage() {
  redirect('/admin');
}
