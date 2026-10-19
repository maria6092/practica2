
export const RUTA = import.meta.env.BASE_URL + 'img/'
export const CHICAS = [
  { id: 'hippie',     nombre: 'Hippie', },
  { id: 'choni',      nombre: 'Choni', },
  { id: 'deportista', nombre: 'Deportista', }
]

export const COMPLEMENTOS = [
  { id: 'hippie_ac1', chica: 'hippie', nombre: 'Bordados' },
  { id: 'hippie_ac2', chica: 'hippie', nombre: 'Mariposa'},
  { id: 'hippie_ac3', chica: 'hippie', nombre: 'Flores'},

 
  { id: 'choni_ac1', chica: 'choni', nombre: 'Estampado de leopardo'},
  { id: 'choni_ac2', chica: 'choni', nombre: 'Gafas de sol'},
  { id: 'choni_ac3', chica: 'choni', nombre: 'Bolso' },

  { id: 'deportista_ac1', chica: 'deportista', nombre: 'Hula hoop'},
  { id: 'deportista_ac2', chica: 'deportista', nombre: 'Mazas de gimnasia'},
  { id: 'deportista_ac3', chica: 'deportista', nombre: 'Tutu'}
]
