// Feature component: today's CROUS lunch menu display

import { LunchMenu as LunchMenuType } from '@/types/lunch';

interface LunchMenuProps {
  menu: LunchMenuType;
}

export default function LunchMenu({ menu }: LunchMenuProps) {
  return <section />;
}
