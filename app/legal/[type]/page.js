// app/legal/[type]/page.js
import Impressum from '../../components/assets/Impressum'

import Risikohinweis from '../../components/assets/Risikohinweis';
import Datenschutz from '../../components/assets/Datenschutz';

export default function LegalPage({ params }) {
  const { type } = params;

  return (
    <div>
      {type === 'impressum' && <Impressum />}
      {type === 'risikohinweis' && <Risikohinweis />}
      {type === 'datenschutz' && <Datenschutz />}
      {!['impressum', 'agb', 'datenschutz'].includes(type) && (
        <div></div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return ['impressum', 'Risikohinweis', 'datenschutz'].map(type => ({ type }));
}