import { Feature } from '../../src/types';

const titles = [
  'Galtonia tectorum',
  'Aster profunda',
  'Picea mono',
  'Anethum macrophylla',
  'Sequoia floribunda',
  'Bergenia betonicifolia',
  'Rumex australis',
  'Stellaria mugo',
  'Acorus atlantica',
  'Bergenia hyoseroides',
  'Momordica hexagona',
  'Aruncus bulbosa',
  'Monarda lyrata',
  'Skimmia kobus',
  'Cercic bilireana',
  'Cunninghamia calleryana',
  'Aucuba sachalinense',
  'Antigonon sellowiana',
  'Ixia laevigata',
  'Scutellaria michauxii',
  'Asimina grandiflora',
  'Carya arenarius',
  'Loropetalum persica',
  'Origanum canadensis',
  'Conopholis pandorana',
  'Polemonium verna',
  'Spiraea fraseri',
  'Dilochos canadensis',
  'Sporobolis odoratum',
  'Habranthus halimifolia',
];

const lorem = [
  'Zombies reversus ab inferno, nam malum cerebro.',
  'De carne animata corpora quaeritis.',
  'Summus sit​​, morbo vel maleficia?',
  'De Apocalypsi undead dictum mauris.',
  'Hi mortuis soulless creaturas, imo monstra adventus vultus comedat cerebella viventium.',
  'Qui offenderit rapto, terribilem incessu.',
  'The voodoo sacerdos suscitat mortuos comedere carnem.',
  'Search for solum oculi eorum defunctis cerebro.',
  'Nescio an Undead zombies.',
  'Sicut malus movie horror.',
  'Tremor est vivos magna.',
  'Expansis ulnis video missing carnem armis caeruleum in locis.',
  'A morbo amarus in auras.',
  'Nihil horum sagittis tincidunt, gelida portenta.',
  'The unleashed virus est, et iam mortui ambulabunt super terram.',
  'Souless mortuum oculos attonitos back zombies.',
  'An hoc incipere Clairvius Narcisse, an ante?',
  'Is bello mundi z?',
];

export const getFeatures = (count: number, startIdx: number = 0): Feature[] =>
  Array.from({ length: count }, (_, idx) => {
    const i = idx + startIdx;
    return {
      id: `feature_id_${i}`,
      date: Date.now(),
      title: titles[Math.floor(Math.random() * titles.length)],
      description: lorem[Math.floor(Math.random() * lorem.length)],
      link: 'https://google.com/',
    };
  });
