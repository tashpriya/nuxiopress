import { localize } from 'vee-validate';

export default function({ route }) {
  // change validation locale
  localize(route.name.split('___')[1]);
}
