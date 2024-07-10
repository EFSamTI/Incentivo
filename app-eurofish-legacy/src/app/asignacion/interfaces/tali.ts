export interface IResTali {
    ctrlRoc: number;
    producto: string;
    kgNtCrudo: number;
    kgNtRociado: number;
    kgMpCalculada: number;
    coches: number;
    kgLomos: number;
    percLomo: number;
    kgFlake: number;
    percFlake: number;
    kgBlanco: number;
    kgRechLo: number;
    relacionLF: number;
    piezas: number;
    pesoProm: number;
    rendCurva: number;
    percCurva: number;
    percMerma: number;
    tipoLimpieza: string;
    linea?: number;
    turno?: number;
  }


  export interface IDataWithTurnoAndFecha {
    turno: number;
    linea: number;
    fecha: string;
    data: IResTali[];
  }



  export const exampleDataTali: IDataWithTurnoAndFecha[] = [
    {
      turno: 1,
      linea: 1,
      fecha: '2024-07-03',
      data: [
        {
          ctrlRoc: 1,
          producto: 'YELLOW FIN 20-40',
          kgNtCrudo: 1913,
          kgNtRociado: 1648,
          kgMpCalculada: 2416.42,
          coches: 4,
          kgLomos: 1032.86,
          percLomo: 43.16,
          kgFlake: 295.07,
          percFlake: 12.21,
          kgBlanco: 65.52,
          kgRechLo: 10,
          relacionLF: 77.95,
          piezas: 161,
          pesoProm: 33.09,
          rendCurva: 54.92,
          percCurva: 100.05,
          percMerma: 13.85,
          tipoLimpieza: 'Double Clean'
        },
        {
          ctrlRoc: 8,
          producto: 'YELLOW FIN 3-4 MSC',
          kgNtCrudo: 3358.5,
          kgNtRociado: 2772.5,
          kgMpCalculada: 3495.00,
          coches: 7,
          kgLomos: 1278.82,
          percLomo: 36.88,
          kgFlake: 404.95,
          percFlake: 11.59,
          kgBlanco: 96.72,
          kgRechLo: 10,
          relacionLF: 76.09,
          piezas: 1928,
          pesoProm: 4.0,
          rendCurva: 47.37,
          percCurva: 101.69,
          percMerma: 17.45,
          tipoLimpieza: 'Double Clean'
        },
        {
          ctrlRoc: 29,
          producto: 'YELLOW FIN 20-40',
          kgNtCrudo: 2784.0,
          kgNtRociado: 2383.5,
          kgMpCalculada: 3445.09,
          coches: 8,
          kgLomos: 1436.25,
          percLomo: 42.39,
          kgFlake: 302.07,
          percFlake: 8.77,
          kgBlanco: 96.72,
          kgRechLo: 24,
          relacionLF: 82.86,
          piezas: 184,
          pesoProm: 41.28,
          rendCurva: 55.77,
          percCurva: 90.48,
          percMerma: 14.39,
          tipoLimpieza: 'Regular Clean'
        }
      ]
    },
    {
      turno: 2,
      linea: 2,
      fecha: '2024-07-02',
      data: [
        {
          ctrlRoc: 24,
          producto: 'YELLOW FIN 7.5-9',
          kgNtCrudo: 209.0,
          kgNtRociado: 181.0,
          kgMpCalculada: 221.64,
          coches: 3,
          kgLomos: 84.13,
          percLomo: 37.96,
          kgFlake: 27.29,
          percFlake: 12.31,
          kgBlanco: 6.24,
          kgRechLo: 0,
          relacionLF: 75.51,
          piezas: 0,
          pesoProm: 0,
          rendCurva: 0,
          percCurva: 0,
          percMerma: 13.4,
          tipoLimpieza: 'Double Clean'
        }
      ]
    },
    {
      turno: 3,
      linea: 3,
      fecha: '2024-07-03',
      data: [
        {
          ctrlRoc: 23,
          producto: 'YELLOW FIN 20-40',
          kgNtCrudo: 737.5,
          kgNtRociado: 659.0,
          kgMpCalculada: 925.51,
          coches: 11,
          kgLomos: 356.5,
          percLomo: 38.52,
          kgFlake: 103.78,
          percFlake: 11.21,
          kgBlanco: 24.96,
          kgRechLo: 0,
          relacionLF: 77.45,
          piezas: 0,
          pesoProm: 0,
          rendCurva: 0,
          percCurva: 0,
          percMerma: 10.64,
          tipoLimpieza: 'Double Clean'
        }
      ]
    },
    {
      turno: 1,
      linea: 1,
      fecha: '2024-07-01',
      data: [
        {
          ctrlRoc: 1,
          producto: 'YELLOW FIN 20-40',
          kgNtCrudo: 2000,
          kgNtRociado: 1700,
          kgMpCalculada: 2500.42,
          coches: 5,
          kgLomos: 1100.86,
          percLomo: 44.16,
          kgFlake: 300.07,
          percFlake: 12.01,
          kgBlanco: 70.52,
          kgRechLo: 12,
          relacionLF: 78.95,
          piezas: 170,
          pesoProm: 34.09,
          rendCurva: 55.92,
          percCurva: 101.05,
          percMerma: 14.85,
          tipoLimpieza: 'Double Clean'
        }
      ]
    },
    {
      turno: 2,
      linea: 2,
      fecha: '2024-07-02',
      data: [
        {
          ctrlRoc: 8,
          producto: 'YELLOW FIN 3-4 MSC',
          kgNtCrudo: 3400.5,
          kgNtRociado: 2800.5,
          kgMpCalculada: 3550.00,
          coches: 7,
          kgLomos: 1300.82,
          percLomo: 37.68,
          kgFlake: 410.95,
          percFlake: 11.89,
          kgBlanco: 100.72,
          kgRechLo: 12,
          relacionLF: 77.09,
          piezas: 1930,
          pesoProm: 4.1,
          rendCurva: 48.37,
          percCurva: 102.69,
          percMerma: 18.45,
          tipoLimpieza: 'Double Clean'
        }
      ]
    },
    {
      turno: 3,
      linea: 3,
      fecha: '2024-07-03',
      data: [
        {
          ctrlRoc: 29,
          producto: 'YELLOW FIN 20-40',
          kgNtCrudo: 2800.0,
          kgNtRociado: 2400.5,
          kgMpCalculada: 3500.09,
          coches: 8,
          kgLomos: 1450.25,
          percLomo: 43.39,
          kgFlake: 305.07,
          percFlake: 8.97,
          kgBlanco: 100.72,
          kgRechLo: 26,
          relacionLF: 83.86,
          piezas: 186,
          pesoProm: 42.28,
          rendCurva: 56.77,
          percCurva: 91.48,
          percMerma: 15.39,
          tipoLimpieza: 'Regular Clean'
        }
      ]
    }
  ];
