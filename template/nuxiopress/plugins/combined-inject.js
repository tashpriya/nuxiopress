import { crypto } from '../utils/crypto';

// eslint-disable-next-line no-unused-vars
export default ({ app }, inject) => {
  inject('crypto', (action, string) => {
    return crypto(action, string);
  });

  inject(
    'seoFriendlyMeta',
    ({ title, description, keywords, locale, image, card }) => {
      let meta = [];

      if (typeof locale === 'string' && locale.length > 1) {
        meta.push({
          hid: 'language',
          name: 'language',
          content: locale
        });
      }

      if (typeof title === 'string' && title.length > 2) {
        meta.push(
          {
            hid: 'og:title',
            name: 'og:title',
            property: 'og:title',
            content: title
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            property: 'twitter:title',
            content: title
          }
        );
      }

      if (typeof description === 'string' && description.length > 2) {
        meta.push(
          {
            hid: 'description',
            name: 'description',
            content: description
          },
          {
            hid: 'og:description',
            name: 'og:description',
            property: 'og:description',
            content: description
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: description
          }
        );
      }

      if (typeof image === 'string' && image.length > 2) {
        meta.push(
          {
            hid: 'og:image',
            name: 'og:image',
            content: image
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            content: image
          }
        );
      }

      if (typeof card === 'string' && card.length > 1) {
        meta.push({
          hid: 'twitter:card',
          name: 'twitter:card',
          content: card
        });
      }

      if (typeof keywords === 'string' && keywords.length > 2) {
        meta.push({
          hid: 'keywords',
          name: 'keywords',
          content: keywords
        });
      }

      return meta;
    }
  );
};
