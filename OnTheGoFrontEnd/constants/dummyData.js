import images from './images';

const data = [
  {
    id: 0,
    plate: '34ADY2039',
    s_date: '22.09.2021',
    cost: 22.5,
    ent_station: 'KURNAKÖY-2',
    ext_station: 'MERMERCİLER',
    class: 1,
    p_date: '17.12.2021',
  },
  {
    id: 1,
    plate: '34ADY2039',
    s_date: '22.09.2021',
    cost: 22.5,
    ent_station: 'KURNAKÖY-2',
    ext_station: 'MERMERCİLER',
    class: 1,
    p_date: '17.12.2021',
  },
  {
    id: 2,
    plate: '34ADY2039',
    s_date: '22.09.2021',
    cost: 22.5,
    ent_station: 'KURNAKÖY-2',
    ext_station: 'MERMERCİLER',
    class: 1,
    p_date: '17.12.2021',
  },
  {
    id: 3,
    plate: '34JKL4533',
    s_date: '09.09.2021',
    cost: 5.5,
    ent_station: 'GATE-D',
    ext_station: 'MERMERCİLER',
    class: 4,
    p_date: '12.11.2021',
  },
  {
    id: 4,
    plate: '34ADY2039',
    s_date: '22.09.2021',
    cost: 22.5,
    ent_station: 'KURNAKÖY-2',
    ext_station: 'MERMERCİLER',
    class: 1,
    p_date: '17.12.2021',
  },
  {
    id: 5,
    plate: '34JKL4533',
    s_date: '02.10.2021',
    cost: 11.45,
    ent_station: 'GATE-A',
    ext_station: 'GATE-B',
    class: 4,
    p_date: '01.01.2022',
  },
  {
    id: 6,
    plate: '34EFT2222',
    s_date: '04.01.2022',
    cost: 16.25,
    ent_station: 'MERMERCİLER',
    ext_station: 'GATE-D',
    class: 2,
    p_date: '05.02.2022',
  },
];

const sliderData = [
  {
    id: 1,
    title: 'Paying your tolls!',
    description: 'Our app has just launched, go and check it out',
  },
  {
    id: 2,
    title: 'No more checking out!',
    description: 'Get notification about your illegal passes',
  },
  {
    id: 3,
    title: 'Monthly activity summaries !',
    description: 'Check out summary of monthly pass activity',
  },
];

const news = [
  {
    id: '1',
    title: 'Smart Way of Doing It That Way',
    description:
      'It is a long established fact that a reader will be distracted by the readable',
    image: images.greenBackground,
    created_at: '01.01.2022',
  },
  {
    id: '2',
    title: 'Smart Way ',
    description:
      'It is a long established fact that a reader will be distracted by the readable',
    image: images.greenBackground,
    created_at: '20.12.2021',
  },
  {
    id: '3',
    title: 'Smart Way of Doing It',
    description:
      'It is a long established fact that a reader will be distracted by the readable',
    image: images.greenBackground,
    created_at: '29.11.2021',
  },
];
const alldata = {data, sliderData, news};

export default alldata;
