import { Translations } from './types';

export const es: Translations = {
  common: {
    settings: "AJUSTES",
    return: "VOLVER",
    reboot: "REINICIAR SISTEMA",
  },
  home: {
    appTitle: "K R O N O",
    protocol: "PROTOCOLO",
    configure: "Configurar",
    selectProtocol: "SELECCIONA PROTOCOLO DE ENTRENAMIENTO",
    modes: {
      tabata: "TABATA",
      emom: "EMOM",
      amrap: "AMRAP",
      fortime: "POR TIEMPO",
      custom: "PERSONALIZADO",
      pacer: "RITMO",
    },
  },
  nav: {
    timer: "PROTOCOLO",
    history: "HISTORIAL",
    settings:"AJUSTES",
  },
  config: {
    listIndexLabel: "MOV",
    configuration: "CONFIGURACIÓN",
    minutes: "MINUTOS",
    seconds: "SEGUNDOS",
    sequence: "SECUENCIA DE EJERCICIOS",
    addMinute: "AÑADIR MINUTO",
    startWorkout: "INICIAR ENTRENAMIENTO",
    min: "MIN",
    restPlaceholder: "DESCANSO",
    workTime: "TIEMPO DE TRABAJO",
    restTime: "DESCANSO",
    rounds: "RONDAS",
    timeCap: "TIEMPO LÍMITE",
    exercisesSequence: "EJERCICIOS (ROTATIVOS)",
    addExercise: "AÑADIR EJERCICIO",
    activeRest: "DESCANSO ACTIVO (OPCIONAL)",
    activeRestPlaceholder: "EJ: PLANCHA ISOMÉTRICA",
    preparationTime: "TIEMPO DE PREPARACIÓN",
    cycles: "CICLOS (TABATAS)",
    cycleRest: "DESCANSO ENTRE CICLOS",
    unilateralMode: "MODO UNILATERAL (ALTERNAR LADOS)",
    every: "CADA (VENTANA)",
    roundsTotal: "RONDAS TOTALES",
    alternatingExercises: "SECUENCIA (ALTERNADA POR RONDA)",
    RowActionGroup: "I/D",
    reps: "REPETICIONES",
    pace: "RITMO (SEG/REP)",
    addInterval: "AÑADIR INTERVALO",
    work: "TRABAJO",
    rest: "DESCANSO",
    back: "VOLVER",
    edit: "EDITAR WOD",
    cancel: "CANCELAR"
  },
  workout: {
    finished: "ENTRENAMIENTO COMPLETADO",
    timeElapsed: "TIEMPO TOTAL",
    side: "LADO",
    left: "IZQUIERDO",
    right: "DERECHO",
    currentExercise: "EJERCICIO ACTUAL",
    next: "SIGUIENTE",
    resume: "REANUDAR",
    pause: "PAUSAR",
    skip: "SALTAR",
    prep: "PREPARACIÓN",
    work: "TRABAJO",
    rest: "DESCANSO"
  },
  
  footer: {
    brandName: "KRONO",
    copyright: "Todos los derechos reservados",
    version: "Version"
  },
  protocols: {
    tabataDesc: "Entrenamiento por intervalos de alta intensidad. 20 segundos de trabajo, 10 de descanso. 8 rondas de precisión técnica.",
    emomDesc: "Every Minute on the Minute. Dominio basado en volumen de trabajo.",
    amrapDesc: "As Many Rounds As Possible. Llevando el límite al máximo.",
    fortimeDesc: "Completa el trabajo designado lo más rápido posible.",
    pacerDesc: "Supera la cadencia objetivo. Rendimiento y salida sostenida.",
    customDesc: "Construye secuencias de intervalos complejas desde cero.",
    stats: {
      totalTime: "Tiempo total",
      intensity: "Intensidad",
      max: "MAX",
    }
  }
  
};